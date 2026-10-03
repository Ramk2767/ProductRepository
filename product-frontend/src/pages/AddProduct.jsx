import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { productService } from '../services/productService';

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (productData) => {
    setError(null);
    try {
      await productService.createProduct(productData);
      // We could use a toast notification here in a real app
      // For now, redirecting is sufficient
      navigate('/products', { state: { message: 'Product created successfully!' } });
    } catch (err) {
      setError(err.message);
      // Rethrow to keep the form in submitting state if we want, or just handle here
      throw err;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Add New Product</h1>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
