import { Component } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipesService],
})
export class RecipesComponent {
  selectedRecipe: Recipe | null = null;
  constructor(private recipesService: RecipesService) {}
  ngOnInit(): void {
    this.recipesService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
