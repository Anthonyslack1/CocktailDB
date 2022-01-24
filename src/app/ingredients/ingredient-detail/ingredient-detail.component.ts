import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Drink, SearchType } from 'src/app/cocktails/models/drink';
import { CocktailsService } from 'src/app/cocktails/services/cocktails.service';
import { IngredientDetail, SimpleDrink } from '../models/ingredient';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})
export class IngredientDetailComponent implements OnInit {

  ingredient: IngredientDetail = new IngredientDetail();
  cocktailSearch: FormControl = new FormControl('', [Validators.required]);
  cocktailList: Drink[] = [];

  constructor(public dialogRef: MatDialogRef<IngredientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private cocktailService: CocktailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.ingredient = this.data.selectedIngredient;
    this.cocktailService.getAllCocktailsByIngredient(this.ingredient.Name)
      .subscribe(data => {
        this.cocktailList = data;
      })
  }

  get SearchType() {
    return SearchType;
  }

  onNoClick(): void {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
  
  onExitClick() {
    this.dialogRef.close();
  }

  submitSearch() {
    if (this.cocktailSearch.value) {
      this.router.navigate(['/cocktails/'+ this.cocktailSearch.value]);
      this.dialogRef.close();
    }
  }

  search(category: string, searchValue: string) {

  }

}
