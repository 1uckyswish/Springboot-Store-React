package com.noel.recipe.service;

import com.noel.recipe.entity.Recipe;
import com.noel.recipe.exception.ResourceNotFoundException;
import com.noel.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", id));
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", "id", id));

        recipe.setImageUrl(updatedRecipe.getImageUrl());
        recipe.setCalories(updatedRecipe.getCalories());
        recipe.setNutrition(updatedRecipe.getNutrition());
        recipe.setDescription(updatedRecipe.getDescription());
        recipe.setInstructions(updatedRecipe.getInstructions());
        recipe.setUserId(updatedRecipe.getUserId());
        recipe.setName(updatedRecipe.getName()); // Update name

        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recipe", "id", id);
        }
        recipeRepository.deleteById(id);
    }

    public List<Recipe> getRecipesByUserId(Long userId) {
        return recipeRepository.findByUserId(userId);
    }
}
