package com.noel.shoppi.service;

import com.noel.shoppi.model.ShoppingCart;
import com.noel.shoppi.model.User;
import com.noel.shoppi.model.Product;
import com.noel.shoppi.repository.ShoppingCartRepository;
import com.noel.shoppi.repository.UserRepository;
import com.noel.shoppi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository,
                               UserRepository userRepository,
                               ProductRepository productRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<ShoppingCart> getCartByUserId(Long userId) {
        List<ShoppingCart> cartItems = shoppingCartRepository.findByUserId(userId);
        cartItems.forEach(cart -> {
            cart.setUser(userRepository.findById(cart.getUser().getId()).orElse(null));
            cart.setProduct(productRepository.findById(cart.getProduct().getId()).orElse(null));
        });
        return cartItems;
    }

    public ShoppingCart addProductToCart(ShoppingCart cart) {
        cart.setUser(userRepository.findById(cart.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found")));
        cart.setProduct(productRepository.findById(cart.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found")));
        return shoppingCartRepository.save(cart);
    }

    public ShoppingCart updateCart(Long id, ShoppingCart updatedCart) {
        return shoppingCartRepository.findById(id)
                .map(cart -> {
                    cart.setQuantity(updatedCart.getQuantity());
                    cart.setProduct(productRepository.findById(updatedCart.getProduct().getId()).orElse(null));
                    return shoppingCartRepository.save(cart);
                })
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));
    }

    public void removeProductFromCart(Long id) {
        ShoppingCart cart = shoppingCartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found with id: " + id));
        shoppingCartRepository.delete(cart);
    }
}
