import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, RecipesComponent, ReadMoreComponent, CommentsComponent],
  exports: [ReadMoreComponent]
})
export class HomePageModule {}
