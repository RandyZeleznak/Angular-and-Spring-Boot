package com.zsquared.ecommerce.config;

import com.zsquared.ecommerce.entity.Product;
import com.zsquared.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager= theEntityManager;
    }



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


        // Call to the internal helper method
        exposeIds(config);

    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity Ids

        // get list of entity  classes from the EntityManager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //Create Array of entitytypes
        List<Class> entityClasses = new ArrayList<>();

        // Load Entity Types into entities
        for(EntityType tempEntityType : entities){
            entityClasses.add((tempEntityType.getJavaType()));
        }
        
        // Expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);




    }
}
