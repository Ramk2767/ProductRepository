package com.product.service.service;





import com.product.service.dto.ProductDTO;
import com.product.service.entity.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(ProductDTO productDTO);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    Product updateProduct(Long id, ProductDTO productDTO);
}