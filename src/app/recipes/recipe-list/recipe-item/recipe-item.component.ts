import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  onSelect(recipe: Recipe): void {
    this.selectedRecipe.emit(recipe);
  }
}
