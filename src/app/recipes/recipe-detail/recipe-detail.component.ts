import { Component, OnInit } from '@angular/core';
import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router, Route } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe!: Recipe | undefined;
  id!: string;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.selectedRecipe = this.recipesService.getRecipeById(this.id);
    });
  }
  addIngredientsToShoppingList() {
    if (this.selectedRecipe) {
      this.recipesService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
    }
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  deleteRecipe() {
    if (this.selectedRecipe) {
      this.recipesService.deleteRecipe(this.selectedRecipe.id);
      this.router.navigate(['recipes']);
    }
  }
}
