import { Component, OnInit } from '@angular/core';

import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.recipesService.getRecipes();
    this.recipesService.recipes.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
  navigateToNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
