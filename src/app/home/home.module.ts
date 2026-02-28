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
import { MarquiseDCComponent } from '../marquise-dc/marquise-dc.component';
import { EyrieDCComponent } from '../eyrie-dc/eyrie-dc.component';
import { WoodlandDCComponent } from '../woodland-dc/woodland-dc.component';
import { VagabondDCComponent } from '../vagabond-dc/vagabond-dc.component';
import { DuchyComponent } from '../drillbit-duchy/drillbit-duchy.component';
import { CorvidComponent } from '../cogwheel-corvids/cogwheel-corvids.component';
import { LizardComponent } from '../logical-lizards/logical-lizards.component';
import { RiverfolkComponent } from '../riverfolk-robots/riverfolk-robots.component';
import { LegionComponent } from '../looting-legion/looting-legion.component';
import { ParagraphComponent } from '../paragraph/paragraph.component';

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
  declarations: [
    HomePage, BotResourcesComponent, ParagraphComponent,
    MarquiseComponent, EyrieComponent, WoodlandComponent, VagabondComponent,
    MarquiseDCComponent, EyrieDCComponent, WoodlandDCComponent, VagabondDCComponent,
    DuchyComponent, CorvidComponent, LizardComponent, RiverfolkComponent, 
    LegionComponent,
    FormatPipe
  ]
})
export class HomePageModule {}
