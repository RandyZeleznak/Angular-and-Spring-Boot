package com.zsquared.ecommerce.service;

import com.zsquared.ecommerce.dto.Purchase;
import com.zsquared.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
