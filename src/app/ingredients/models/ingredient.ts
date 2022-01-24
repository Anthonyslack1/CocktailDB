export class IngredientsDTO {
    drinks: Ingredient[] = [];
}

export class IngredientDetailDTO {
    ingredients: IngredientDetail[] = [];
}

export class Ingredient {
    strIngredient1: string = "";
}

export class IngredientDetail { 
    idIngredient: string = "";
    strIngredient: string = "";
    strDescription: string = "";
    strType: string = "";
    strAlcohol: string = "Yes";
    strABV: string = "";
}
