import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../ingredients/models/ingredient';
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';
import { Drink } from './models/drink';
import { CocktailsService } from './services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {

  constructor(private cocktailService: CocktailsService,
              private ingredientsService: IngredientsService,
              public dialog: MatDialog) { }

  cocktailSearch: FormControl = new FormControl();
  ingredientSearch: FormControl = new FormControl();
  categorySearch: FormControl = new FormControl();
  
  currentCategory = "";
  cocktailFilter: string = "";
  cocktailList: Drink[] = [];
  categoryList: String[] = [];
  tagList: String[] = [];
  ingredientsList: Ingredient[] = [];
  selectedIngredients: string[] = [];
  selectedIngredientString: string[] = [];
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

    this.cocktailService.getAllCategories()
      .subscribe(categories => {
        this.categoryList = categories;
    })

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
      ingredient = this.ingredientSearch.value;
    }
    else {
      ingredient = ingredient.split(' | ')[1]
    }
    this.cocktailService.getAllCocktailsByIngredient(ingredient)
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }

  submitCategorySearch(category = "") {
    if (category == "") {
      category = this.categorySearch.value;
    }
    this.cocktailService.getAllCocktailsByCategory(category)
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
    this.currentCategory = category;
  }

  cardClicked(drinkId: string) {
    if (this.selectedDrink.Id === drinkId) {
      this.selectedDrink = new Drink();
    }
    else {
      this.selectedDrink = this.cocktailList.find(c => c.Id === drinkId) || new Drink();
    }

    const dialogRef = this.dialog.open(CocktailDetailsComponent, {
      width: '60%',
      height: '70%',
      data: { selectedDrink: this.selectedDrink }
    });


    dialogRef.afterClosed().subscribe(data =>{
      if (data) {
        if (data.searchType === "ingredient") {
          this.submitIngredientSearch(data.value);
        }
        else if (data.searchType === "category") {
          this.submitCategorySearch(data.value);
        }
      }
      this.selectedDrink = new Drink();
    })

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
