import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // constructor() {}
  ingredientChange = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [new Ingredient('Apple', 1), new Ingredient('Potato', 5), new Ingredient('Tomato', 2)];
  getIngredients() {
    return this.ingredients;
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.emit(this.ingredients);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    const newIngredients = this.ingredients.concat(ingredients);
    this.ingredients = newIngredients;
    this.ingredientChange.emit(this.ingredients);
  }
}
