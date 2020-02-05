import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { MarquiseComponent } from '../marquise/marquise.component';
import { EyrieComponent } from '../eyrie/eyrie.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, BotResourcesComponent, MarquiseComponent, EyrieComponent]
})
export class HomePageModule {}
