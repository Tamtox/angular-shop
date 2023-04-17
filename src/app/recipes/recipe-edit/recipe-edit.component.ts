import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Ingredient } from '@/app/models/ingredient.model';
import { Recipe } from '@/app/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id!: string;
  editMode = false;
  recipeForm!: FormGroup;
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray<any>([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      if (recipe) {
        recipeName = recipe.name;
        imagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                quantity: new FormControl(ingredient.quantity, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
            );
          }
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  onSubmit() {
    const value = this.recipeForm.value;
    const ingredients = value.ingredients.map((ingredient: { name: string; quantity: string }) => {
      return new Ingredient(ingredient.name, Number(ingredient.quantity));
    });
    const newRecipe = new Recipe(value.name, value.description, value.imagePath, ingredients);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      if (recipe) {
        newRecipe.id = recipe?.id;
        this.recipeService.updateRecipe(newRecipe);
      }
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onClear();
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }
  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
  onClear() {
    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
