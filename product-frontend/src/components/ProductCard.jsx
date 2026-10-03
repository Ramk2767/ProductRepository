import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="details-card animate-fade-in">
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Product ID</span>
          <span className="detail-value">#{product.id}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Name</span>
          <span className="detail-value">{product.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Category</span>
          <span className="detail-value">{product.category}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Price</span>
          <span className="detail-value">${product.price ? Number(product.price).toFixed(2) : '0.00'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quantity in Stock</span>
          <span className="detail-value">{product.quantity}</span>
        </div>
      </div>
      
      <div className="detail-item" style={{ marginBottom: '2rem' }}>
        <span className="detail-label">Description</span>
        <span className="detail-value" style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
          {product.description}
        </span>
      </div>

      <div className="form-actions" style={{ marginTop: '0' }}>
        <Link to="/products" className="btn btn-secondary">
          <ArrowLeft size={16} />
          Back to List
        </Link>
        <Link to={`/products/${product.id}/edit`} className="btn btn-primary">
          <Edit size={16} />
          Edit Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
