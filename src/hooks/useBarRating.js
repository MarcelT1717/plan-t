import { useCallback, useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { db, firebaseReady } from '../lib/firebase';

const ratedKey = (barId) => `planT_rated_${barId}`;

export function useBarRating(barId) {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);
  const [myRating, setMyRating] = useState(() => {
    const stored = localStorage.getItem(ratedKey(barId));
    return stored ? Number(stored) : null;
  });
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (!firebaseReady) return;
    const ref = doc(db, 'ratings', barId);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data();
        setSum(data?.sum ?? 0);
        setCount(data?.count ?? 0);
      },
      () => {}
    );
    return unsubscribe;
  }, [barId]);

  const submitRating = useCallback(
    async (stars) => {
      if (!firebaseReady || myRating != null || submittingRef.current) return;
      submittingRef.current = true;
      setSubmitting(true);
      try {
        const ref = doc(db, 'ratings', barId);
        await setDoc(ref, { sum: increment(stars), count: increment(1) }, { merge: true });
        localStorage.setItem(ratedKey(barId), String(stars));
        setMyRating(stars);
      } finally {
        submittingRef.current = false;
        setSubmitting(false);
      }
    },
    [barId, myRating]
  );

  return {
    average: count > 0 ? sum / count : 0,
    count,
    myRating,
    submitRating,
    submitting,
    ready: firebaseReady,
  };
}
