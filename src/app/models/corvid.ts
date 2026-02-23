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

    buildings: {
      fox: [],
      bunny: [],
      mouse: []
    }
  };

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Cogwheel Corvids.RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Cogwheel Corvids.CraftOrder`))
    ];
  }

  public daylight(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Cogwheel Corvids.Flip`)),
    ]
  }

  public evening(translate: TranslateService) {
    return[
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Cogwheel Corvids.Score`)),
    ];
  }
}