import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailsRoutingModule } from './cocktails-routing.module';
import { CocktailsComponent } from './cocktails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { CocktailsService } from './services/cocktails.service';
import { MatIconModule} from '@angular/material/icon'
import { IngredientsService } from '../ingredients/services/ingredients.service';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';

@NgModule({
  imports: [
    CommonModule,
    CocktailsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    CocktailsService,
    IngredientsService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  declarations: [CocktailsComponent, CocktailDetailsComponent]
})
export class CocktailsModule { }