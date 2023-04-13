import { Component } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  selectedRecipe!: Recipe;
  selectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
