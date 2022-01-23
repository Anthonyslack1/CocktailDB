import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { Drink, DrinkDTO } from './models/drink';
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
  selectedDrinkId: string = "";
  alphabetSorted: boolean = true;
  ngOnInit(): void {
    this.cocktailService.getAllCocktailsByLetter("a")
    .pipe(map(value => value.drinks))
    .subscribe(drinks => {
      this.cocktailList = drinks;
    });
  }


  submit() {
    this.cocktailService.getCocktailsByName(this.cocktailSearch.value)
      .pipe(map(value => value.drinks))
      .subscribe(drinks => {
        this.cocktailList = drinks;
      });
  }

  cardClicked(drinkId: string) {
    if (this.selectedDrinkId === drinkId) {
      this.selectedDrinkId = "";
    }
    else {
      this.selectedDrinkId = this.cocktailList.find(c => c.idDrink === drinkId)?.idDrink || "";
    }
  }

  sortAlphabetically() {
    this.alphabetSorted = !this.alphabetSorted;
    if (!this.alphabetSorted) {
    this.cocktailList = this.cocktailList.sort((a,b) => a.strDrink.localeCompare(b.strDrink));
    }
    else {
      this.cocktailList = this.cocktailList.sort((a,b) => b.strDrink.localeCompare(a.strDrink));
    }
  }
}
