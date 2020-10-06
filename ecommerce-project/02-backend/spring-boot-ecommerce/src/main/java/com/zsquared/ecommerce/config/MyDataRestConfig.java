package com.zsquared.ecommerce.config;

import com.zsquared.ecommerce.entity.Product;
import com.zsquared.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Below disable HTTP methods for Product: PUT, POST, DELETE

        config.getExposureConfiguration()
            .forDomainType(Product.class)
            .withItemExposure((metadata,httpMethods) -> httpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metadata,httpMethods) -> httpMethods.disable(theUnsupportedActions));


        // Below disable HTTP methods for ProductCategory: PUT, POST, DELETE

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata,httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata,httpMethods) -> httpMethods.disable(theUnsupportedActions));





    }
}
