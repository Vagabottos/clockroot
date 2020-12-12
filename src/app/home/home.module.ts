import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { BotResourcesComponent } from '../bot-resources/bot-resources.component';
import { MarquiseComponent } from '../marquise/marquise.component';
import { EyrieComponent } from '../eyrie/eyrie.component';
import { WoodlandComponent } from '../woodland/woodland.component';
import { VagabondComponent } from '../vagabond/vagabond.component';
import { SharedModule } from '../shared.module';
import { FormatPipe } from '../format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, BotResourcesComponent, MarquiseComponent, EyrieComponent, WoodlandComponent, VagabondComponent, FormatPipe]
})
export class HomePageModule {}
