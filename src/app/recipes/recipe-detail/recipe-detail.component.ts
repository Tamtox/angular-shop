import { Component, Input } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  @Input() selectedRecipe!: Recipe;
}
