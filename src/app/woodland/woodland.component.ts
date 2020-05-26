import { Component, OnInit, Input } from "@angular/core";
import { WoodlandBot } from "../models/woodland";
import { BotService } from "../bot.service";
import { RendererService } from "../renderer.service";

@Component({
  selector: "app-woodland",
  templateUrl: "./woodland.component.html",
  styleUrls: ["./woodland.component.scss"],
})
export class WoodlandComponent implements OnInit {
  @Input() public bot: WoodlandBot;

  public sympathyScores = [0, 1, 1, 1, 1, 2, 2, 3, 3, 4];

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) {}

  ngOnInit() {}

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  toggleSympathy(sympathyIndex: number) {
    const sympathyCollection = this.bot.customData.sympathy;

    sympathyCollection[sympathyIndex] = !sympathyCollection[sympathyIndex];

    const tokenIsOnBoard = !sympathyCollection[sympathyIndex];
    if (tokenIsOnBoard) {
      this.placeLaterTokensOnBoard(sympathyCollection, sympathyIndex);
    } else {
      this.removePriorTokens(sympathyIndex, sympathyCollection);
    }
    this.botService.saveBots();
  }

  private removePriorTokens(
    sympathyIndex: number,
    sympathyCollection: boolean[]
  ) {
    for (let index = 0; index < sympathyIndex; index++) {
      sympathyCollection[index] = true;
    }
  }

  private placeLaterTokensOnBoard(
    sympathyCollection: boolean[],
    sympathyIndex: number
  ) {
    for (
      let index = sympathyCollection.length - 1;
      index > sympathyIndex;
      index--
    ) {
      sympathyCollection[index] = false;
    }
  }

  toggleBuilding(suit) {
    this.bot.customData.buildings[suit] = !this.bot.customData.buildings[suit];
    this.botService.saveBots();
  }
}
