import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Ingredient, IngredientDetail } from './models/ingredient';
import { IngredientsService } from './services/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  
  selectedIngredient: IngredientDetail = new IngredientDetail();
  ingredientList: Ingredient[] = [];

  constructor(private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients()
      .pipe(map(value => value.drinks))
      .subscribe(ingredients => {
        this.ingredientList = ingredients;
      });
  }

  cardClicked(ingredientName: Ingredient) {
    if (this.selectedIngredient.strIngredient.toLocaleLowerCase() === ingredientName.strIngredient1.toLocaleLowerCase()) {
      this.selectedIngredient = new IngredientDetail();
    }
    else {
      this.ingredientService.getIngredientDetails(ingredientName.strIngredient1).subscribe(detail => {
        this.selectedIngredient = detail.ingredients[0];
      });
    }
  }
}
