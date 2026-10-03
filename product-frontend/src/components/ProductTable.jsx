import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit } from 'lucide-react';

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return null; // Handled by empty state in parent
  }

  return (
    <div className="table-card animate-fade-in">
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td><strong>{product.name}</strong></td>
                <td>{product.category}</td>
                <td>${product.price ? Number(product.price).toFixed(2) : '0.00'}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => navigate(`/products/${product.id}`)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
