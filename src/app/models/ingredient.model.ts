export class Ingredient {
  id: string;
  constructor(public name: string, public quantity: number) {
    this.id = crypto.randomUUID();
  }
}
