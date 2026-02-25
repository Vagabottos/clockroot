import { Component, OnInit, Input } from '@angular/core';
import { LizardBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lizard',
  templateUrl: './logical-lizards.component.html',
  styleUrls: ['./logical-lizards.component.scss'],
})
export class LizardComponent implements OnInit {

  @Input() public bot: LizardBot;
  
  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }
  
  public buildings = [
    { suit: 'fox', building: 'garden' },
    { suit: 'bunny', building: 'garden' },
    { suit: 'mouse', building: 'garden' }
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

}
