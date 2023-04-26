import { Component, OnInit } from '@angular/core';
import { Ingredient } from '@/app/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.shoppingListService.getIngredients();
    this.shoppingListService.ingredients.subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }
  editIngredient(ingredient: Ingredient): void {
    this.shoppingListService.editedIngredient.next(ingredient);
  }
}
