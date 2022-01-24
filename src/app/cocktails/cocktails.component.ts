import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ingredient } from '../ingredients/models/ingredient';
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { Drink } from './models/drink';
import { CocktailsService } from './services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {

  constructor(private cocktailService: CocktailsService,
              private ingredientsService: IngredientsService) { }

  cocktailSearch: FormControl = new FormControl('');
  ingredientSearch: FormControl = new FormControl('');
  categorySearch: FormControl = new FormControl('');
  
  cocktailFilter: string = "";
  cocktailList: Drink[] = [];
  selectedIngredients: string[] = [];
  selectedIngredientString: string[] = [];
  ingredientsList: Ingredient[] = [];
  selectedDrink: Drink = new Drink();
  alphabetSorted: boolean = true;

  get isResults(): boolean {
    return this.cocktailList.length > 0;
  }

  ngOnInit(): void {
    //TODO add alphabetical control
    this.cocktailService.getAllCocktailsByLetter("a")
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });

    this.ingredientsService.getAllIngredients()
      .subscribe(ingredients => {
        this.ingredientsList = ingredients;
      })
  }


  submitNameSearch() {
    this.cocktailService.getCocktailsByName(this.cocktailSearch.value)
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }

  submitIngredientSearch(ingredient = "") {
    if (ingredient == "") {
      this.ingredientSearch.value
    }
    else {
      ingredient = ingredient.split(' | ')[1]
    }
    this.cocktailService.getAllCocktailsByIngredient(ingredient)
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }

  submitCategorySearch() {
    this.cocktailService.getCocktailsByName(this.cocktailSearch.value)
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }

  cardClicked(drinkId: string) {
    if (this.selectedDrink.Id === drinkId) {
      this.selectedDrink = new Drink();
    }
    else {
      this.selectedDrink = this.cocktailList.find(c => c.Id === drinkId) || new Drink();
      if (this.selectedDrink.Ingredients.length > 0) {
        this.mapIngredientString(this.selectedDrink);
      }
      else {
        this.cocktailService.getCocktailsById(this.selectedDrink.Id).subscribe(response => {
          this.selectedDrink = response[0];
          this.mapIngredientString(this.selectedDrink);
        })
      }
    }
  }

  mapIngredientString(drink: Drink) {
    this.selectedIngredientString = [];
    drink.Ingredients.forEach(ingredient => {
      let index = drink.Ingredients.indexOf(ingredient);
      let measurement = "To Preference";
      if (drink.Measurements[index] !== undefined) {
        measurement = drink.Measurements[index];
      }
      let ingredientString =  measurement + " | " + ingredient;
      this.selectedIngredientString.push(ingredientString);
    });
  }

  mapTags(drink: Drink) {
    if (drink.Tags) {

    }
  }

  sortAlphabetically() {
    this.alphabetSorted = !this.alphabetSorted;
    if (!this.alphabetSorted) {
      this.cocktailList = this.cocktailList.sort((a, b) => a.Name.localeCompare(b.Name));
    }
    else {
      this.cocktailList = this.cocktailList.sort((a, b) => b.Name.localeCompare(a.Name));
    }
  }
}
