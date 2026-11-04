import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartProvider } from "./components/cart/CartContext";
import { CartDrawer } from "./components/cart/CartDrawer";
import { Home } from "./pages/Home";
import { WhoWeAre } from "./pages/WhoWeAre";
import { LearnMore } from "./pages/LearnMore";
import { Contact } from "./pages/Contact";

// Old /bars/:id links land on that bar's section of Learn More.
function BarRedirect() {
  const { barId } = useParams();
  return <Navigate to={`/learn-more#${barId}`} replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-mission" element={<WhoWeAre />} />
            <Route path="/who-we-are" element={<Navigate to="/our-mission" replace />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<Navigate to="/our-mission" replace />} />
            <Route path="/ingredients" element={<Navigate to="/learn-more" replace />} />
            <Route path="/learn" element={<Navigate to="/learn-more" replace />} />
            <Route path="/bars/:barId" element={<BarRedirect />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
