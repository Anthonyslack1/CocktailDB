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
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CocktailsService,
    IngredientsService
  ],
  declarations: [CocktailsComponent]
})
export class CocktailsModule { }