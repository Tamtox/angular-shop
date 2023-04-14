import { Component, Input } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  @Input() selectedRecipe!: Recipe;
  constructor(private recipesService: RecipesService) {}
  addIngredientsToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }
}
