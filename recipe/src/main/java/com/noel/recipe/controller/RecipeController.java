package com.noel.recipe.controller;

import com.noel.recipe.entity.Recipe;
import com.noel.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable(value = "id") Long id) {
        Recipe recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok().body(recipe);
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable(value = "id") Long id, @RequestBody Recipe updatedRecipe) {
        Recipe recipe = recipeService.updateRecipe(id, updatedRecipe);
        return ResponseEntity.ok().body(recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable(value = "id") Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recipe>> getRecipesByUserId(@PathVariable(value = "userId") Long userId) {
        List<Recipe> recipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.ok().body(recipes);
    }
}
