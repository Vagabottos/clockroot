import { Component, OnInit, Input } from '@angular/core';
import { DuchyBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-duchy',
  templateUrl: './drillbit-duchy.component.html',
  styleUrls: ['./drillbit-duchy.component.scss'],
})
export class DuchyComponent implements OnInit {

  @Input() public bot: DuchyBot;

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }
  ngOnInit() {
    this.bot.customData.citadels = this.bot.customData.citadels || [false, false, false];
    this.bot.customData.markets = this.bot.customData.markets || [false, false, false];
    this.bot.customData.tunnels = this.bot.customData.tunnels || [false, false, false];
    this.bot.customData.burrow = this.bot.customData.burrow || 0;
  }
  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }
  
// Toggles true/false for Citadels, Markets, and Tunnels
  toggleTracker(type: 'citadels' | 'markets' | 'tunnels', index: number) {
    this.bot.customData[type][index] = !this.bot.customData[type][index];
    this.botService.saveBots();
  }

  // Toggles the minister's swayed status
  toggleMinister(index: number) {
    this.bot.customData.ministers[index].swayed = !this.bot.customData.ministers[index].swayed;
    this.botService.saveBots();
  }
  // Changes the number of warriors in the Burrow
  modifyBurrow(diff = 1) {
    this.bot.customData.burrow = Math.max(this.bot.customData.burrow + diff, 0);

    this.botService.saveBots();
  }

}
