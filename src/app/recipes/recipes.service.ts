import { Injectable } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject } from 'rxjs';

const recipesData: Recipe[] = [
  new Recipe(
    'first',
    'First recipe',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg/1200px-Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg',
    [new Ingredient('Minted Pineapple', 6), new Ingredient('Quick Tomato Mold', 4), new Ingredient('Lamb Meat', 2)]
  ),
  new Recipe(
    'second',
    'Second recipe',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg/1200px-Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg',
    [new Ingredient('Minted Pineapple', 6), new Ingredient('Quick Tomato Mold', 4), new Ingredient('Lamb Meat', 2)]
  ),
  new Recipe(
    'third',
    'Third recipe',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg/1200px-Illustrated_recipes%3B_%27Minted_Pineapple%27%2C_%27Quick_Tomato_Mold%27_Wellcome_L0072307.jpg',
    [new Ingredient('Minted Pineapple', 6), new Ingredient('Quick Tomato Mold', 4), new Ingredient('Lamb Meat', 2)]
  ),
];

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes = new BehaviorSubject<Recipe[]>(recipesData);
  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes;
  }
  getRecipeById(id: string | null) {
    return this.recipes.value.find((recipe) => recipe.id === id);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
  deleteRecipe(id: string) {
    const updatedRecipes = this.recipes.value.filter((recipe) => recipe.id !== id);
    this.recipes.next(updatedRecipes);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.next([...this.recipes.value, recipe]);
  }
  updateRecipe(updatedRecipe: Recipe) {
    const updatedRecipes = this.recipes.value.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    this.recipes.next(updatedRecipes);
  }
  deleteRecipeIngredient(id: string) {
    const updatedRecipes = this.recipes.value.filter((recipe) => recipe.id !== id);
    this.recipes.next(updatedRecipes);
  }
}
