import { Component, OnInit, Input } from '@angular/core';
import { LegionBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legion',
  templateUrl: './looting-legion.component.html',
  styleUrls: ['./looting-legion.component.scss'],
})

export class LegionComponent implements OnInit
{

  @Input() public bot: LegionBot;
  
    constructor(
      public botService: BotService,
      public translateService: TranslateService
    ) { }

  ngOnInit() {
    this.bot.customData.hoardItems = this.bot.customData.hoardItems || [];
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  addHoardItems($event: Event, item: string) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    const hoard = this.bot.customData.hoardItems;
    
    if (hoard.length < 5) {
      hoard.push(item);
      this.botService.saveBots();
    }
  }

  removeHoardItem($event: Event, index: number) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    const hoard = this.bot.customData.hoardItems;
    
    if (hoard[index]) {
      hoard.splice(index, 1);
      this.botService.saveBots();
    }
  }

}
