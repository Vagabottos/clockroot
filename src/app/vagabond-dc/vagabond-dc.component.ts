import { Component, OnInit, Input } from '@angular/core';
import { VagaBotDC } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vagabond-dc',
  templateUrl: './vagabond-dc.component.html',
  styleUrls: ['./vagabond-dc.component.scss'],
})
export class VagabondDCComponent implements OnInit {

  @Input() public bot: VagaBotDC;

  public get descriptions() {
    return this.bot.descriptions;
  }

  public get battleTrackBonus(): string {
    const total = Object.values(this.bot.customData.satchelItems)
      .filter(x => x === 3)
      .length;

    switch (total) {
      case 0: return 'BattleTrack0';
      case 1: return 'BattleTrack1';
      case 2: return 'BattleTrack2';
      case 3: return 'BattleTrack3';
      default: return 'You have too many, or not enough battle track items.';
    }
  }

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  changeVaga(newVaga) {
    this.bot.customData.chosenVaga = newVaga;
    this.botService.saveBots();
  }

  toggleSatchelItem(item) {
    this.bot.customData.satchelItems[item]++;
    if (this.bot.customData.satchelItems[item] >= 4) {
      this.bot.customData.satchelItems[item] = 0;
    }

    this.botService.saveBots();
  }

  removeSatchelItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    delete this.bot.customData.satchelItems[item];
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

}
