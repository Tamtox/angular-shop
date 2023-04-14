import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // constructor() {}
  ingredientChange = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [new Ingredient('Apple', 1), new Ingredient('Potato', 5), new Ingredient('Tomato', 2)];
  getIngredients() {
    return this.ingredients;
  }
  getIngredientById(id: string) {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    const newIngredients = this.ingredients.concat(ingredients);
    this.ingredients = newIngredients;
    this.ingredientChange.next(this.ingredients);
  }
}
