import { Component, Input } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  constructor(private recipeService: RecipesService) {}
  onDelete() {
    this.recipeService.deleteRecipe(this.recipe.id);
  }
}
