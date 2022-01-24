import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsRoutingModule } from './intredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { CocktailsService } from '../cocktails/services/cocktails.service';
import { MatIconModule} from '@angular/material/icon'
import { IngredientsService } from './services/ingredients.service';

@NgModule({
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CocktailsService,
    IngredientsService
  ],
  declarations: [IngredientsComponent]
})
export class IngredientsModule { }