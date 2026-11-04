import React, { useState } from 'react';
import { HeroStage, FlavorId } from '../components/home/HeroStage';
import { Highlights } from '../components/home/Highlights';
import { HowToEnjoy } from '../components/home/HowToEnjoy';
import { RoyalJellyFeature } from '../components/home/RoyalJellyFeature';
import { Comparison } from '../components/home/Comparison';
import { OurStory } from '../components/home/OurStory';
import { HomeFaq } from '../components/home/HomeFaq';
import { usePageTitle } from '../hooks/usePageTitle';

export const Home = () => {
  usePageTitle();
  const [flavor, setFlavor] = useState<FlavorId>('red');

  return (
    <div className="bg-[#1A1714] text-[#F5F1E8]">
      <HeroStage flavor={flavor} onFlavorChange={setFlavor} />
      <Highlights />
      <HowToEnjoy />
      <RoyalJellyFeature />
      <Comparison />
      <OurStory />
      <HomeFaq />
    </div>
  );
};
