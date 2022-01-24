import { Component, OnInit } from '@angular/core';
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
      .subscribe(ingredients => {
        this.ingredientList = ingredients;
      });
  }

  cardClicked(ingredientName: Ingredient) {
    if (this.selectedIngredient.Name.toLocaleLowerCase() === ingredientName.Name.toLocaleLowerCase()) {
      this.selectedIngredient = new IngredientDetail();
    }
    else {
      this.ingredientService.getIngredientDetails(ingredientName.Name).subscribe(detail => {
        this.selectedIngredient = detail[0];
      });
    }
  }
}
