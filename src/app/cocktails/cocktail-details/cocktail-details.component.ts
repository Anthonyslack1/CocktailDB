import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drink } from '../models/drink';
import { CocktailsService } from '../services/cocktails.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  drink: Drink = new Drink();
  selectedIngredientString: string[] = [];

  constructor(public dialogRef: MatDialogRef<CocktailDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ngZone: NgZone,
              private cocktailService: CocktailsService) { }

  ngOnInit(): void {
    this.drink = this.data.selectedDrink;
    if (this.drink.Ingredients.length > 0) {
      this.mapIngredientString(this.drink);
    }
    else {
      this.cocktailService.getCocktailsById(this.drink.Id).subscribe(response => {
        this.drink = response[0];
        this.mapIngredientString(this.drink);
      })
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

  search(searchType: string, value: string) {
    this.dialogRef.close({
      searchType,
      value
    });
  }

  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  
  onExitClick() {
    this.dialogRef.close();
  }

}
