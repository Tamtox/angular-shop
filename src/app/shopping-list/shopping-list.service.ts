import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // constructor() {}
  ingredients: Ingredient[] = [new Ingredient('Apple', 1), new Ingredient('Potato', 5), new Ingredient('Tomato', 2)];
  ingredientsChanged = new Subject<Ingredient[]>();
  editedIngredient = new Subject<Ingredient>();
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredientById(id: string) {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    const newIngredients = this.ingredients.concat(ingredients);
    this.ingredients = newIngredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  setEditedIngredient(ingredient: Ingredient) {
    this.editedIngredient.next(ingredient);
  }
  editIngredient(editedIngredient: Ingredient) {
    const editedIngredients = this.ingredients.map((ingredient) => {
      if (ingredient.id === editedIngredient.id) {
        return editedIngredient;
      } else {
        return ingredient;
      }
    });
    this.ingredients = editedIngredients;
    this.ingredientsChanged.next(editedIngredients);
  }
  deleteIngredient(id: string) {
    const editedIngredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
    this.ingredients = editedIngredients;
    this.ingredientsChanged.next(editedIngredients);
  }
}
