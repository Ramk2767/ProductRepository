import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, PackageX } from 'lucide-react';
import { productService } from '../services/productService';
import ProductTable from '../components/ProductTable';
import Loading from '../components/Loading';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <Link to="/products/add" className="btn btn-primary">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {isLoading ? (
        <Loading message="Loading products..." />
      ) : products.length === 0 && !error ? (
        <div className="empty-state">
          <PackageX className="empty-state-icon" />
          <h2>No products found</h2>
          <p>Get started by adding a new product to your inventory.</p>
          <Link to="/products/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default ProductList;
