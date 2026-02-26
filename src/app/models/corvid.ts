import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class CorvidBot extends Bot {

  public name: BotName = 'Corvid';

  public setupPosition = 'I';
  public setupRules = [
    `Setup0`,
    `Setup1`
  ];

  public difficultyDescriptions = {
    Easy: `Easy`,
    Normal: 'Normal',
    Challenging: `Challenging`,
    Nightmare: `Nightmare`
  };

  public rules = [
    {
      traitName: 'Poor Manual Dexterity',
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true
    },
    {
      traitName: 'Hates Surprises',
      name: 'RuleHatesSurprises',
      text: 'TextHatesSurprises',
      isActive: true
    },
    {
      traitName: 'Embedded Agents',
      name: 'RuleEmbeddedAgents',
      text: 'TextEmbeddedAgents',
      isActive: true
    },
    {
      traitName: 'Nimble',
      name: 'RuleNimble',
      text: 'TextNimble',
      isActive: true
    },
    {
      traitName: 'Backup Plans',
      name: 'RuleBackupPlans',
      text: 'TextBackupPlans',
      canToggle: true
    },
    {
      traitName: 'Vendetta',
      name: 'RuleVendetta',
      text: `TextVendetta`,
      canToggle: true
    },
    {
      traitName: 'Gamble',
      name: 'RuleGamble',
      text: `TextGamble`,
      canToggle: true
    },
    {
      traitName: 'Mastermind',
      name: 'RuleMastermind',
      text: `TextMastermind`,
      canToggle: true
    },
  ];

  public customData = {
    currentSuit: 'bird',
    stowedPlots: 8, //Tracks number of plots currently stowed, not face-up or face-down on board
    plots: {
      bomb: [false, false],       
      snare: [false, false],      //true = face-up // false = stowed or face-down
      extortion: [false, false],
      raid: [false, false]
    }
  };

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Cogwheel Corvids.RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Cogwheel Corvids.CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Cogwheel Corvids.RecruitOrder`,{ suit })),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Cogwheel Corvids.Flip`))
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Cogwheel Corvids.Battle`,{ suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Cogwheel Corvids.Move`,{ suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Cogwheel Corvids.Plot`,{ suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Cogwheel Corvids.PlotThickens`)),
    ]
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return[
      this.createMetaData('score', 1, translate.instant(`SpecificEvening.Cogwheel Corvids.Score`,{ suit })),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Cogwheel Corvids.Discard`))
    ];
  }

  public botRules(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return[
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.BotInteractions.Bomb`)),
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.BotInteractions.Snare`))
    ];
  }

  public plotRules(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.Plot-Tokens.Bomb`)),
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.Plot-Tokens.Snare`)),
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.Plot-Tokens.Extortion`)),
      this.createMetaData('text', '', translate.instant(`SpecificExtra.Cogwheel Corvids.Plot-Tokens.Raid`))
    ]
  }
}