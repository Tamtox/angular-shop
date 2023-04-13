import { Component } from '@angular/core';
import { Ingredient } from '@/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients = <Ingredient[]>[new Ingredient('Apple', 5), new Ingredient('Potato', 5), new Ingredient('Tomato', 5)];
}