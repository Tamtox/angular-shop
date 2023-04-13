import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  name!: string;
  amount!: number;
  @Input() addIngredient!: (name: string, amount: number) => void;
  onSubmit(): void {
    this.addIngredient(this.name, this.amount);
  }
}
