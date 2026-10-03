import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import Loading from '../components/Loading';
import { productService } from '../services/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData) => {
    setSubmitError(null);
    try {
      await productService.updateProduct(id, productData);
      navigate('/products', { state: { message: 'Product updated successfully!' } });
    } catch (err) {
      setSubmitError(err.message);
      throw err;
    }
  };

  if (isLoading) return <Loading message="Loading product details..." />;

  if (error) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Edit Product</h1>
        </div>
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate('/products')}>Back to List</button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit Product #{id}</h1>
      </div>

      {submitError && (
        <div className="alert alert-error">
          {submitError}
        </div>
      )}

      {product && (
        <ProductForm 
          initialData={product} 
          onSubmit={handleSubmit} 
          isEditing={true} 
        />
      )}
    </div>
  );
};

export default EditProduct;
