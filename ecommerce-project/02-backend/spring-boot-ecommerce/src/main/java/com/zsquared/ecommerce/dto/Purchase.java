package com.zsquared.ecommerce.dto;

import com.zsquared.ecommerce.entity.Address;
import com.zsquared.ecommerce.entity.Customer;
import com.zsquared.ecommerce.entity.Order;
import com.zsquared.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
