import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from '../ingredients/models/ingredient';
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';
import { Drink, SearchType } from './models/drink';
import { CocktailsService } from './services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {

  constructor(private cocktailService: CocktailsService,
              private ingredientsService: IngredientsService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
                this.alpha = Array.from(Array(26)).map((e, i) => i + 65);
                this.alphabet = this.alpha.map((x) => String.fromCharCode(x));
               }

  cocktailSearch: FormControl = new FormControl("", [Validators.required]);
  ingredientSearch: FormControl = new FormControl("", [Validators.required]);
  categorySearch: FormControl = new FormControl("", [Validators.required]);


  lastSearched: Subject<string> = new Subject<string>();
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
  alpha: number [] = [];
  alphabet: string[] = [];

  get isResults(): boolean {
    return this.cocktailList.length > 0;
  }

  get SearchType() {
    return SearchType;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const cocktailIdFromRoute = (routeParams.get('cocktailId'));
    if (cocktailIdFromRoute) {
      this.submitSearch(SearchType.Id, cocktailIdFromRoute);
    }
    else {
      this.submitSearch(SearchType.Alphabetical, this.alphabet[0]);
    }

    this.cocktailService.getAllCategories()
      .subscribe(categories => {
        this.categoryList = categories;
      })

    this.ingredientsService.getAllIngredients()
      .subscribe(ingredients => {
        this.ingredientsList = ingredients;
      })
  }


  submitSearch(searchType: SearchType, searchValue: string = "") {
    let results: Observable<Drink[]> = new Observable<Drink[]>();
    switch (searchType) {
      case SearchType.Id: {
        if (searchValue === "") {
          searchValue = this.cocktailSearch.value;
        }
        results = this.cocktailService.getCocktailsById(searchValue);
        break;
      }
      case SearchType.Name: {
        if (searchValue === "") {
          searchValue = this.cocktailSearch.value;
        }
        results = this.cocktailService.getAllCocktailsByName(searchValue);
        this.updateLastSearched(`Cocktails containing "${this.cocktailSearch.value}."`);
        break;
      }
      case SearchType.Ingredient: {
        if (searchValue === "") {
          searchValue = this.ingredientSearch.value;
        }
        else {
          searchValue = searchValue.split(' | ')[1]
        }
        results = this.cocktailService.getAllCocktailsByIngredient(searchValue);
        this.updateLastSearched(`Cocktails made with "${searchValue}."`);
        break;
      }
      case SearchType.Category: {
        if (searchValue === "") {
          searchValue = this.categorySearch.value;
        }
        results = this.cocktailService.getAllCocktailsByCategory(searchValue);
        this.updateLastSearched(`Drinks in the "${searchValue}" category.`);
        break;
      }
      case SearchType.Glass: {
        results = this.cocktailService.getAllCocktailsByGlass(searchValue);
        this.updateLastSearched(`Drinks best served in a "${searchValue}."`);
        break;
      }
      case SearchType.Alphabetical: {
        results = this.cocktailService.getAllCocktailsByLetter(searchValue);
        this.updateLastSearched(`Cocktails beginning with "${searchValue}."`);
        break;
      }
      case SearchType.Random: {
        results = this.cocktailService.getRandomCocktail();
        this.updateLastSearched(`Here, try this.`);
        break;
      }
      default: {
        break;
      }
    }
    results.subscribe(drinkList => {
      this.cocktailList = drinkList;
    })
  }

  updateLastSearched(text: string) {
    this.lastSearched.next(text);
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
        this.submitSearch(data.searchType, data.value);
      }
      this.selectedDrink = new Drink();
    })

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
