import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';

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
  constructor(private route: ActivatedRoute, private recipeService: RecipesService) {}
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
                ingredientName: new FormControl(ingredient.name, Validators.required),
                ingredientAmount: new FormControl(ingredient.quantity, [
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
    console.log(this.recipeForm);
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredientName: new FormControl(null, Validators.required),
        ingredientAmount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }
}
