import { Component, OnInit, Input } from '@angular/core';
import { WoodlandBot } from '../models/woodland';
import { BotService } from '../bot.service';
import { RendererService } from '../renderer.service';

@Component({
  selector: 'app-vagabond',
  templateUrl: './vagabond.component.html',
  styleUrls: ['./vagabond.component.scss'],
})
export class VagabondComponent implements OnInit {

  @Input() public bot: WoodlandBot;

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) { }

  ngOnInit() {
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

}
