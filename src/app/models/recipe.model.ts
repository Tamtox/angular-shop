import { Ingredient } from '@/app/models/ingredient.model';

export class Recipe {
  id: string;
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {
    this.id = crypto.randomUUID();
  }
}
