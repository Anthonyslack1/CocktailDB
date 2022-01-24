import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CocktailsService } from 'src/app/cocktails/services/cocktails.service';
import { IngredientDetail } from '../models/ingredient';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})
export class IngredientDetailComponent implements OnInit {

  ingredient: IngredientDetail = new IngredientDetail();

  constructor(public dialogRef: MatDialogRef<IngredientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private ingredientService: IngredientsService) { }

  ngOnInit(): void {
    this.ingredient = this.data.selectedIngredient;
  }

  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  
  onExitClick() {
    this.dialogRef.close();
  }

  search(category: string, searchValue: string) {
    
  }

}
