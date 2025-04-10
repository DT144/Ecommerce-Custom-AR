import React from "react";
import "./ProductDetails.css";

function ProductDetails({ product, onViewAR }) {
  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <h3>Features</h3>
        <ul>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <h3>Specifications</h3>
        <table>
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="view-buttons">
          <button onClick={onViewAR}>View in your space (AR)</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
