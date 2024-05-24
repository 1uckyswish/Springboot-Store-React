package com.noel.shoppi.controllers;

import com.noel.shoppi.model.ShoppingCart;
import com.noel.shoppi.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ShoppingCart>> getCartByUserId(@PathVariable Long userId) {
        List<ShoppingCart> cartItems = shoppingCartService.getCartByUserId(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ShoppingCart> addProductToCart(@RequestBody ShoppingCart cart) {
        ShoppingCart newCart = shoppingCartService.addProductToCart(cart);
        return new ResponseEntity<>(newCart, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShoppingCart> updateCart(@PathVariable Long id, @RequestBody ShoppingCart updatedCart) {
        try {
            ShoppingCart cart = shoppingCartService.updateCart(id, updatedCart);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Long id) {
        try {
            shoppingCartService.removeProductFromCart(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
