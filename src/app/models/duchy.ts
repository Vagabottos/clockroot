import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class DuchyBot extends Bot {

  public name: BotName = 'Duchy';

  public setupPosition = 'H';
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
      text: `TextHatesSurprises`,
      isActive: true
    },
    {
      traitName: 'Cost of Errors',
      name: 'RuleCostOfErrors',
      text: `TextCostOfErrors`,
      isActive: true
    },
    {
      traitName: 'Invaders',
      name: 'RuleInvaders',
      text: `TextInvaders`,
      canToggle: true
    },
    {
      traitName: 'Overwhelm',
      name: 'RuleOverwhelm',
      text: 'TextOverwhelm',
      canToggle: true
    },
    {
      traitName: 'Foundations',
      name: 'RuleFoundations',
      text: 'TextFoundations',
      canToggle: true
    },
    {
      traitName: 'Investors',
      name: 'RuleInvestors',
      text: 'TextInvestors',
      canToggle: true
    },
  ];
  // !!! The Duchy in Daylight will need order specific text for dig. Include a market tracker and minister tracker?
  public customData = {
    currentSuit: 'bird',

    burrow: 0, //Positive Integer to track number of moles in the burrow
    tunnels: [false, false, false], //true: tunnel on board, false: tunnel stowed
    citadels: [false, false, false], //true: citadel on board, false: citadel stowed
    markets: [false, false, false], //true: market on board, false: market stowed
    ministers: [
      { id: "captain", name: "Captain", suit: "fox", order: 1,swayed: false, ability: true, text: "SpecificExtra.Drillbit Duchy.Ministers.Captain"},
      { id: "marshal", name: "Marshal", suit: "bunny", order: 2, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Marshal"},
      { id: "foremole", name: "Foremole", suit: "mouse", order: 3, swayed: false, ability: true, text: "SpecificExtra.Drillbit Duchy.Ministers.Foremole"},
      { id: "brigadier", name: "Brigadier", suit: "fox", order: 4, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Brigadier"},
      { id: "banker", name: "Banker", suit: "bunny", order: 5, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Banker"},
      { id: "mayor", name: "Mayor", suit: "mouse", order: 6, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Mayor"},
      { id:"earl", name: "Earl of Stone", suit: "fox", order: 7, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Earl"},
      { id: "baron", name: "Baron of Dirt", suit: "bunny", order: 8, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Baron"},
      { id: "duchess", name: "Duchess of Mud", suit: "mouse", order: 9, swayed: false, ability: false, text: "SpecificExtra.Drillbit Duchy.Ministers.Duchess"}
    ]
  };

  public setup(): void {
  }

  public birdsong(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Drillbit Duchy.RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Drillbit Duchy.CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Drillbit Duchy.RecruitOrder`))
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Drillbit Duchy.Dig`, { suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Drillbit Duchy.Battle`, { suit })),
      this.createMetaData('score', 1, translate.instant(`SpecificDaylight.Drillbit Duchy.Build`)),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Drillbit Duchy.Ministers`))
    ];
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const activeMarkets = this.customData.markets.filter(m => m === true).length;
    let pointsMarkets: number = 0;
    if (activeMarkets === 0) {
      pointsMarkets = 0;
    }
    else if (activeMarkets === 1 || activeMarkets === 2) {
      pointsMarkets = 1;
    }
    else if (activeMarkets === 3) {
      pointsMarkets = 2;
    }
    else {
      this.customData.markets = [false, false, false];
      pointsMarkets = 0;
    }

    return [
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Rally`, { suit })),
      this.createMetaData('score', 1, translate.instant(`SpecificEvening.Drillbit Duchy.Score`)),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Sway`)),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Discard`))
    ];
  }
}
