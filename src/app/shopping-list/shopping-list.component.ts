import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '@/app/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsSubscription!: Subscription;
  ingredients!: Ingredient[];
  private ingredientSubscription!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }
  editIngredient(ingredient: Ingredient): void {
    this.shoppingListService.editedIngredient.next(ingredient);
  }
}
