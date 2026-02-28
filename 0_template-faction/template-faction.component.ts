//###Read the README for instructions on what to change and where to go, you will miss something###
import { Component, OnInit, Input } from '@angular/core';
import { TemplateBot } from '../models'; //Change this
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-template', //Change this
  templateUrl: './template-faction.component.html', //Change this
  styleUrls: ['./template-faction.component.scss'], //Change this
})
export class TemplateComponent implements OnInit //Change this
{

  @Input() public bot: TemplateBot; //Change this
  
    constructor(
      public botService: BotService,
      public translateService: TranslateService
    ) { }

    //Start changing everything below to match your bot
  public trackedArray = [
    { type: 'bomb', name: 'Bomb' },
    { type: 'snare', name: 'Snare' },
    { type: 'extortion', name: 'Extortion' },
    { type: 'raid', name: 'Raid' }
  ];

  public trackedInteger: 8;

  ngOnInit() {
    this.trackedArray.forEach(p => {
      this.bot.customData.trackedArray[p.type] = this.bot.customData.trackedArray[p.type] || [0, 0];
    });
  }

  //Necessary for ordered suit selection widget in birdsong
  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

}
