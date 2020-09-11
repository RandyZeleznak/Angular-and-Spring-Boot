package main.java.com.zsquared.ecommerce.dao;

import main.java.com.zsquared.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRespository<Product, Long> {
}
