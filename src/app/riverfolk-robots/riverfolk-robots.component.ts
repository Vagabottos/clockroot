import { Component, OnInit, Input } from '@angular/core';
import { RiverfolkBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-riverfolk',
  templateUrl: './riverfolk-robots.component.html',
  styleUrls: ['./riverfolk-robots.component.scss'],
})
export class RiverfolkComponent implements OnInit {

  @Input() public bot: RiverfolkBot;

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

    public buildings = [
    { suit: 'fox', building: 'tradingpost' },
    { suit: 'bunny', building: 'tradingpost' },
    { suit: 'mouse', building: 'tradingpost' }
  ];

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }
  ngOnInit() {
    ['fox', 'bunny', 'mouse'].forEach(suit => {
      this.bot.customData.buildings[suit] = this.bot.customData.buildings[suit] || [];
    });
  }
  toggleBuilding(suit, index) {
    this.bot.customData.buildings[suit] = this.bot.customData.buildings[suit] || [];
    this.bot.customData.buildings[suit][index] = !this.bot.customData.buildings[suit][index];

    this.botService.saveBots();
  }

toggleProtectionism(isShield: boolean) {
    const prot = this.bot.customData;
    if (isShield) {
      prot.protectionismShield = !prot.protectionismShield;
    } else {
      prot.protectionismSword = !prot.protectionismSword;
    }
    this.botService.saveBots();
  }

}
