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

  // Cycles the plot token: //true = face-up // false = stowed or face-down
  cyclePlot(type: string, index: number) {
    this.bot.customData.plots[type][index] = (!this.bot.customData.plots[type][index]);
    const botPlot = this.bot.customData.plots;
    const currentState = botPlot[type][index]
    let faceUpCount = 0

    for (const plot in botPlot) {
      for (const i in botPlot[plot]) {
        if (botPlot[plot][i]) {
          faceUpCount++
        }
      }
    }
    
    const notTracked = 8 - this.bot.customData.stowedPlots - faceUpCount

    if (currentState) {
      if (notTracked<=0) {
        this.modifyPlot(notTracked-1)
      }
    }
    else if (!currentState) {
      if (notTracked>=0) {
        this.modifyPlot(1)
      }
    }

    this.botService.saveBots();
  }

  // Returns the correct icon path based on the token's current state
  getPlotIcon(type: string, index: number): string {
    const state = this.bot.customData.plots[type][index];
    if (state === false) {
      // 0 = In Supply (Faded), 1 = Face Down on Map
      return `assets/inicon/plot-${type}.png`; 
    } else {
      // 2 = Face Up on Map
      return `assets/inicon/plot-${type}.png`; 
    }
  }

  modifyPlot(diff = 1) {
    this.bot.customData.stowedPlots = Math.max(this.bot.customData.stowedPlots+ diff, -1);

    this.botService.saveBots();
  }

}
