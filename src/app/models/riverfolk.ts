import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { NEVER } from 'rxjs';

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
    },
    protectionismShield: false,
    protectionismSword: false
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
    const riverDifficulty = (this.difficulty === "Easy" ? 0 : this.difficulty === "Normal" ? 1 : this.difficulty === "Challenging" ? 2 : 2);
    const daylightActions = [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BuildAndGarrison`, {riverDifficulty, suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.RecruitOther`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.RecruitBird`)),
      this.createMetaData('score', 1, translate.instant(`SpecificDaylight.Riverfolk Robots.Organize`))
    ]
    this.customData.protectionismShield ? daylightActions.push(this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BattleShield`))) : NEVER,
    this.customData.protectionismSword ? daylightActions.push(this.createMetaData('text', '', translate.instant(`SpecificDaylight.Riverfolk Robots.BattleSword`,{suit}))) : NEVER
    return daylightActions;
  }

  public evening(translate: TranslateService) {
    const eveningActions = [
    this.createMetaData('score', 1, translate.instant(`SpecificEvening.Riverfolk Robots.Score`)),
    this.createMetaData('text', '', translate.instant(`SpecificEvening.Riverfolk Robots.Discard`))
    ]

    if (this.customData.protectionismShield || this.customData.protectionismSword) {
      eveningActions.push(this.createMetaData('text', '', translate.instant(`SpecificEvening.Riverfolk Robots.Racketeering`)))
    }
    if (this.customData.protectionismShield) {
      eveningActions.push(this.createMetaData('text', '', translate.instant(`SpecificEvening.Riverfolk Robots.DiscardShield`)))
    }
    if (this.difficulty === 'Nightmare') {
      eveningActions.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie (DC).NightmareScore'))
      );
    }
    return eveningActions;
  }

  public services(translate: TranslateService) {
  return [
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.servicesBirdsong`)),
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.servicesCost`)),
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.servicesVictoryPoints`)),
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.serviceCard`)),
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.serviceBoat`)),
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.serviceMerc`))
  ];
}
  public tradePost(translate: TranslateService) {
  return [
    this.createMetaData('text','',translate.instant(`SpecificExtra.Riverfolk Robots.tradePost`))
  ];
}

 }
