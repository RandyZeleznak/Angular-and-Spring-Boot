package com.zsquared.ecommerce.dao;

import com.zsquared.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "Product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}

