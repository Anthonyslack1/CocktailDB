import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
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
  ingredientFilter: string = "";

  alphabetSorted: boolean = false;
  constructor(private ingredientService: IngredientsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ingredientService.getAllIngredients()
      .subscribe(ingredients => {
        this.ingredientList = ingredients;
      });
  }

  cardClicked(ingredientName: Ingredient) {
    this.ingredientService.getIngredientDetails(ingredientName.Name).subscribe(detail => {
      this.selectedIngredient = detail[0];
      const dialogRef = this.dialog.open(IngredientDetailComponent, {
        width: '60%',
        height: '70%',
        data: { selectedIngredient: this.selectedIngredient }
      });
  
    });

  }

  sortAlphabetically() {
    this.alphabetSorted = !this.alphabetSorted;
    if (!this.alphabetSorted) {
      this.ingredientList = this.ingredientList.sort((a, b) => a.Name.localeCompare(b.Name));
    }
    else {
      this.ingredientList = this.ingredientList.sort((a, b) => b.Name.localeCompare(a.Name));
    }
  }
}
