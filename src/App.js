import React, { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ARViewer from "./components/ARViewer";
import products from "./products";
import "./App.css";

function App() {
  const [showAR, setShowAR] = useState(false);

  const handleViewAR = () => {
    setShowAR(true);
  };

  return (
    <div className="App">
      <header>
        <h1>AR E-commerce</h1>
      </header>
      <main>
        {!showAR ? (
          <ProductDetails product={products.tvs[0]} onViewAR={handleViewAR} />
        ) : (
          <ARViewer modelPath={products.tvs[0].model} />
        )}
      </main>
    </div>
  );
}

export default App;
