import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { IngredientDetailDTO, IngredientsDTO } from "../models/ingredient";


@Injectable({
    providedIn: 'root',
   })
export class IngredientsService {
    constructor(private http: HttpClient) {}

    //TODO: map this crap obj
    getAllIngredients() {
        return this.http.get<IngredientsDTO>(`${environment.cocktailDBBaseUrl}list.php?i=list`);
    }

    getIngredientDetails(ingredientName: string) {
        return this.http.get<IngredientDetailDTO>(`${environment.cocktailDBBaseUrl}search.php?i=${ingredientName}`);
    }
}

