import { Component, OnInit, Input } from '@angular/core';
import { VagaBot } from '../models/vagabond';
import { BotService } from '../bot.service';
import { RendererService } from '../renderer.service';

@Component({
  selector: 'app-vagabond',
  templateUrl: './vagabond.component.html',
  styleUrls: ['./vagabond.component.scss'],
})
export class VagabondComponent implements OnInit {

  @Input() public bot: VagaBot;

  public descriptions = {
    Tinker: `Search the discard pile for the top card with an available item and craft it, scoring +1 VP.
    _Start the game with one fewer item._`,
    Thief: 'Take a random card from the enemy in your clearing with most points there, then most pieces there.',
    Ranger: 'If you have three or more damaged items, slip into a random adjacent forest.'
  };

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) { }

  ngOnInit() {
  }

  changeVaga(newVaga) {
    this.bot.customData.chosenVaga = newVaga;
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

}
