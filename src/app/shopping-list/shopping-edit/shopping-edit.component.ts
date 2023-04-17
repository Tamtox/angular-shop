import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '@/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') form!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedIngredient!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.shoppingListService.editedIngredient.subscribe((ingredient: Ingredient) => {
      this.editMode = true;
      this.editedIngredient = ingredient;
      this.form.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.quantity,
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit(form: NgForm): void {
    const value = form.value;
    if (this.editMode) {
      const newEditedIngredient = { name: value.name, quantity: value.amount, id: this.editedIngredient.id };
      this.shoppingListService.editIngredient(newEditedIngredient);
    } else {
      const newIngredient = new Ingredient(value.name, value.amount);
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(): void {
    this.editMode = false;
    this.form.reset();
  }
  onDelete(): void {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedIngredient.id);
      this.onClear();
    }
  }
}
