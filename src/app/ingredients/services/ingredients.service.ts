import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from '../../../environments/environment';
import { Ingredient, IngredientDetail, IngredientDetailDTO, IngredientsDTO } from "../models/ingredient";


@Injectable({
    providedIn: 'root',
   })
export class IngredientsService {
    constructor(private http: HttpClient) {}

    //TODO: map this crap obj
    getAllIngredients() {
        return this.http.get<IngredientsDTO>(`${environment.cocktailDBBaseUrl}list.php?i=list`)
            .pipe(map(result => {
                return this.mapIngredientsDTO(result);
            }));
    }

    getIngredientDetails(ingredientName: string) {
        return this.http.get<IngredientDetailDTO>(`${environment.cocktailDBBaseUrl}search.php?i=${ingredientName}`)
            .pipe(map(result => {
                return this.mapIngredientsDetail(result);
            }));
    }

    mapIngredientsDTO(value: IngredientsDTO) {
        let ingredientArray: Ingredient[] = [];
        if (value !== null && value.drinks) {
            value.drinks.forEach(apiObj => {
                let newIngredient = new Ingredient();
                newIngredient.Name = apiObj.strIngredient1;
                ingredientArray.push(newIngredient);
            })
        }
        return ingredientArray;
    }

    mapIngredientsDetail(value: IngredientDetailDTO) {
        let ingredientArray: IngredientDetail[] = [];
        if (value !== null && value.ingredients !== null) {
            value.ingredients.forEach(apiObj => {
                let newIngredient = new IngredientDetail();
                newIngredient.Id = apiObj.idIngredient;
                newIngredient.Name = apiObj.strIngredient;
                newIngredient.Description = apiObj.strDescription;
                newIngredient.Type = apiObj.strType;
                newIngredient.Alcohol = apiObj.strAlcohol === "Yes" ? true : false;
                newIngredient.ABV = apiObj.strABV;
                ingredientArray.push(newIngredient);
            })
        }
        return ingredientArray;
    }
    
}

