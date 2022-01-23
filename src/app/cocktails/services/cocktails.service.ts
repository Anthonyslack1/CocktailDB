import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { Drink, DrinkDTO } from "../models/drink";


@Injectable({
    providedIn: 'root',
   })
export class CocktailsService {
    constructor(private http: HttpClient) {}

    getCocktailsByName(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}search.php?s=${searchValue}`);
    }
    getAllCocktailsByLetter(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}search.php?f=${searchValue}`);
    }
}