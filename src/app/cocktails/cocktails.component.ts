import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Drink } from './models/drink';
import { CocktailsService } from './services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {

  constructor(private cocktailService: CocktailsService) { }

  cocktailSearch: FormControl = new FormControl('');
  cocktailFilter: string = "";
  cocktailList: Drink[] = [];
  selectedIngredients: string[] = [];
  selectedIngredientString: string[] = [];
  selectedDrink: Drink = new Drink();
  alphabetSorted: boolean = true;

  ngOnInit(): void {
    //TODO add alphabetical control
    this.cocktailService.getAllCocktailsByLetter("a")
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }


  submit() {
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
      this.mapIngredientString(this.selectedDrink);
    }
  }

  mapIngredientString(drink: Drink) {
    this.selectedIngredientString = [];
    drink.Ingredients.forEach(ingredient => {
      let index = drink.Ingredients.indexOf(ingredient)
      let ingredientString = ingredient + " " + drink.Measurements[index];
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
