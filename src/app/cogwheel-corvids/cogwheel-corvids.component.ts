import { Component, OnInit, Input } from '@angular/core';
import { CorvidBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-corvid',
  templateUrl: './cogwheel-corvids.component.html',
  styleUrls: ['./cogwheel-corvids.component.scss'],
})
export class CorvidComponent implements OnInit
{

  @Input() public bot: CorvidBot;

public plots = [
    { type: 'bomb', name: 'Bomb' },
    { type: 'snare', name: 'Snare' },
    { type: 'extortion', name: 'Extortion' },
    { type: 'raid', name: 'Raid' }
  ];

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.plots.forEach(p => {
      this.bot.customData.plots[p.type] = this.bot.customData.plots[p.type] || [0, 0];
    });
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  // Cycles the plot token: 0 (Supply) -> 1 (Face Down) -> 2 (Face Up) -> 0 (Supply)
  cyclePlot(type: string, index: number) {
    this.bot.customData.plots[type][index] = (this.bot.customData.plots[type][index] + 1) % 3;
    this.botService.saveBots();
  }

}
