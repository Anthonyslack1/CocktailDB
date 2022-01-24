export class IngredientsDTO {
    drinks: IngredientApiObj[] = [];
}

export class IngredientDetailDTO {
    ingredients: IngredientDetailApiObj[] = [];
}

export class IngredientDetailApiObj { 
    idIngredient: string = "";
    strIngredient: string = "";
    strDescription: string = "";
    strType: string = "";
    strAlcohol: string = "Yes";
    strABV: string = "";
}

export class IngredientApiObj {
    strIngredient1: string = "";
}

export class Ingredient {
    Name: string = "";
}

export class IngredientDetail {
    Id: string = "";
    Name: string = "";
    Description: string = "";
    Type: string = "";
    Alcohol: boolean = true;
    ABV: string = "";
}
