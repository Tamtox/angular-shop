import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '@/app/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  recipes!: Recipe[];
  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  navigateToNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
