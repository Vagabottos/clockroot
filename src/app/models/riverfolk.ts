import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class RiverfolkBot extends Bot {

  public name: BotName = 'Riverfolk';

  public setupPosition = 'G';
  public setupRules = [
    `Setup0`,
    `Setup1`,
    `Setup2`,
    `Setup3`,
    `Setup4`
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
      traitName: 'Market',
      name: 'RuleMarket',
      text: 'TextMarket',
      isActive: true
    },
    {
      traitName: 'Garrison',
      name: 'RuleGarrison',
      text: 'TextGarrison',
      canToggle: true
    },
    {
      traitName: 'Greedy',
      name: 'RuleGreedy',
      text: 'TextGreedy',
      canToggle: true
    },
    {
      traitName: 'Ferocious',
      name: 'RuleFerocious',
      text: `TextFerocious`,
      canToggle: true
    },
    {
      traitName: 'Involved',
      name: 'RuleInvolved',
      text: `TextInvolved`,
      canToggle: true
    },
  ];
  //Will need a check for protectionism to determine several key actions, will need a tracker for trade posts and services and payments? May be an annoying one but seems straight forward overall
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
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Riverfolk Robots.StockMarket`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Riverfolk Robots.CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Riverfolk Robots.SetOrder`))
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    return [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BildAndGarrison`)),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.RecruitOther`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.RecruitBird`)),
      this.createMetaData('score', 1, translate.instant(`SpecificDaylight.Riverfolk Robots.Organize`)),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BattleShield`)),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BattleSword`,{suit}))
    ];
  }

  public evening(translate: TranslateService) {
    return [
      this.createMetaData('score', 1, translate.instant(`SpecificEvening.Riverfolk Robots.Score`)),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Riverfolk Robots.Racketeering`)),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Riverfolk Robots.Discard`))
    ];
  }

 }
