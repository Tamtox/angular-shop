import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
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
  ];
  selectedRecipe = new EventEmitter<Recipe>();
  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }
}
