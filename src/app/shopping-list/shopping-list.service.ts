import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const ingredientsData: Ingredient[] = [
  new Ingredient('Apple', 1),
  new Ingredient('Potato', 5),
  new Ingredient('Tomato', 2),
];

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}
  ingredients = new BehaviorSubject<Ingredient[]>([]);
  editedIngredient = new Subject<Ingredient>();
  private url = 'https://celestial-2e5ca-default-rtdb.europe-west1.firebasedatabase.app/shopping-list';
  getIngredients() {
    this.http
      .get<Ingredient[]>(`${this.url}.json`)
      .pipe(
        map((ingredients) => {
          const ingredientsArr: Ingredient[] = [];
          for (const key in ingredients) {
            ingredientsArr.push({ ...ingredients[key], id: key });
          }
          return ingredientsArr;
        })
      )
      .subscribe((ingredients) => {
        this.ingredients.next(ingredients);
      });
  }
  getIngredientById(id: string) {
    return this.ingredients.value.find((ingredient) => ingredient.id === id);
  }
  addIngredient(ingredient: Partial<Ingredient>) {
    const newIngredient = { ...ingredient };
    this.http.post(`${this.url}.json`, ingredient).subscribe((response: any) => {
      newIngredient.id = response.name;
    });
    this.ingredients.next([...this.ingredients.value, newIngredient as Ingredient]);
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    const newIngredients = this.ingredients.value.concat(ingredients);
    this.ingredients.next(newIngredients);
  }
  setEditedIngredient(ingredient: Ingredient) {
    this.editedIngredient.next(ingredient);
  }
  editIngredient(editedIngredient: Ingredient) {
    const editedIngredients = this.ingredients.value.map((ingredient) => {
      if (ingredient.id === editedIngredient.id) {
        return editedIngredient;
      } else {
        return ingredient;
      }
    });
    this.ingredients.next(editedIngredients);
  }
  deleteIngredient(id: string) {
    const editedIngredients = this.ingredients.value.filter((ingredient) => ingredient.id !== id);
    this.ingredients.next(editedIngredients);
  }
}
