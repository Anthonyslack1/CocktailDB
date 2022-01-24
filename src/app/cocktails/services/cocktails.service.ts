import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { CategoryApiObj, CategoryDTO, Drink, DrinkAPIObj, DrinkDTO } from "../models/drink";


@Injectable({
    providedIn: 'root',
   })
export class CocktailsService {
    constructor(private http: HttpClient) {}

    //TODO The mapping can be condensed or made prettier... API can change
    getCocktailsByName(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}search.php?s=${searchValue}`)
        .pipe(map(value => {
            return this.mapDrink(value);
        }));
    }

    getCocktailsById(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}lookup.php?i=${searchValue}`)
        .pipe(map(value => {
            return this.mapDrink(value);
        }));
    }

    getAllCocktailsByLetter(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}search.php?f=${searchValue}`)
            .pipe(map(value => {
                return this.mapDrink(value);
            }));
    }

    getAllCocktailsByIngredient(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}filter.php?i=${searchValue}`)
            .pipe(map(value => {
                return this.mapDrink(value);
            }));
    }

    getAllCocktailsByCategory(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}filter.php?c=${searchValue}`)
            .pipe(map(value => {
                return this.mapDrink(value);
            }));
    }

    
    getAllCocktailsByGlass(searchValue: string) {
        return this.http.get<DrinkDTO>(`${environment.cocktailDBBaseUrl}filter.php?g=${searchValue}`)
            .pipe(map(value => {
                return this.mapDrink(value);
            }));
    }

    getAllCategories() {
        return this.http.get<CategoryDTO>(`${environment.cocktailDBBaseUrl}list.php?c=list`)
        .pipe(map(value => {
            return this.mapCategories(value);
        }));
    }

    mapIngredients(apiObj: any) {
        const result: string[] = [];
        for (let i = 1; i <= 15; i++) {
            let ingredientValue = apiObj[`strIngredient${i}`];
            if (ingredientValue) {
                result.push(ingredientValue);
            }
        }
        return result;
    }

    mapMeasurements(apiObj: any) {
        const result: string[] = [];
        for (let i = 1; i <= 15; i++) {
            let measurementValue = apiObj[`strMeasure${i}`];
            if (measurementValue) {
                result.push(measurementValue);
            }
        }
        return result;
    }

    mapCategories(apiObj: CategoryDTO) {
        const result: string[] = [];
        apiObj.drinks.forEach(category => {
            result.push(category.strCategory)
        });
        return result;
    }

    mapDrink(value: DrinkDTO) {
        const drinkArray: Drink[] = [];
        if (value !== null && value.drinks !== null) {
            value.drinks.forEach(apiObj => {
                let newDrink = new Drink();
                newDrink.Id = apiObj.idDrink;
                newDrink.Name = apiObj.strDrink;
                newDrink.NameAlt = apiObj.strDrinkAlternate;
                if (apiObj.strTags && apiObj.strTags.length > 0) {
                    newDrink.Tags = apiObj.strTags.split(',');
                }
                newDrink.Video = apiObj.strVideo;
                newDrink.Category = apiObj.strCategory;
                newDrink.IBA = apiObj.strIBA;
                newDrink.Alcoholic = apiObj.strAlcoholic === "Alcoholic";
                newDrink.Glass = apiObj.strGlass;
                newDrink.InstructionsEN = apiObj.strInstructions;
                newDrink.InstructionsES = apiObj.strInstructionsES;
                newDrink.InstructionsDE = apiObj.strInstructionsDE;
                newDrink.InstructionsFR = apiObj.strInstructionsFR;
                newDrink.InstructionsIT = apiObj.strInstructionsIT;
                newDrink.DrinkThumbnail = apiObj.strDrinkThumb;
                newDrink.Ingredients = this.mapIngredients(apiObj);
                newDrink.Measurements = this.mapMeasurements(apiObj);
                newDrink.ImageSource = apiObj.strImageSource;
                newDrink.ImageAttribution = apiObj.strImageAttribution;
                newDrink.CreativeCommonsConfirmed = apiObj.strCreativeCommonsConfirmed === "Yes";
                newDrink.DateModified = apiObj.dateModified;
                drinkArray.push(newDrink);
            })
        }
        return drinkArray;
    }
}
