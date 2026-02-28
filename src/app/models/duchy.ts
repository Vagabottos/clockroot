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

  public customData = {
    currentSuit: 'bird',

    burrow: 0, //Positive Integer to track number of moles in the burrow
    tunnels: [true, true, true], //false: tunnel on board, true: tunnel stowed
    citadels: [true, true, true], //false: citadel on board, true: citadel stowed
    markets: [true, true, true], //false: market on board, true: market stowed
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
    const citadelUsedLength = this.customData.citadels.filter(m => m ===false).length;
    const moleRevealed = (citadelUsedLength === 3 ? 4 : citadelUsedLength) + (this.customData.ministers.find(m => m.id === "foremole").swayed ? 1 : 0)
    const moleDifficulty = (this.difficulty === "Easy" ? 1 : this.difficulty === "Normal" ? 2 : this.difficulty === "Challenging" ? 3 : 4);
    const moleRecruit = moleRevealed + moleDifficulty;
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Drillbit Duchy.RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Drillbit Duchy.CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Drillbit Duchy.RecruitOrder`, {moleRecruit, moleDifficulty}))
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    const isCaptainSwayed = this.customData.ministers.find(m => m.id === "captain").swayed;
    const hasTunnelSupply = this.customData.tunnels.filter(m => m === true).length === 0;
    const isBirdOrder = this.customData.currentSuit === "bird" ? "Bird" : "";
    const pointsEarl =(this.customData.ministers.find(m=>m.id === "earl").swayed) ? this.customData.citadels.filter(m => m === false).length : 0
    const pointsBaron = (this.customData.ministers.find(m=>m.id === "baron").swayed) ? this.customData.markets.filter(m => m === false).length : 0
    const pointsDuchess = (this.customData.ministers.find(m=>m.id === "duchess").swayed && this.customData.tunnels.filter(m => m === true).length === 0) ? 2 : 0
    const ministerPoints = pointsEarl + pointsBaron + pointsDuchess

    return [
      this.createMetaData('text', '', 
        translate.instant(`SpecificDaylight.Drillbit Duchy.Dig` + isBirdOrder, { suit }) + 
        (hasTunnelSupply ? ' ' + translate.instant(`SpecificDaylight.Drillbit Duchy.DigNoTunnel`) : '')
      ),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Drillbit Duchy.` + (isCaptainSwayed ? `BattleCaptain` : `Battle`), { suit })),
      this.createMetaData('score', 1, translate.instant(`SpecificDaylight.Drillbit Duchy.Build`)),
      this.createMetaData('score', ministerPoints, translate.instant(`SpecificDaylight.Drillbit Duchy.Ministers`, {ministerPoints}))
    ];
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const pointsMarkets = this.customData.markets.filter(m => m === false).length;

    const eveningActions = [
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Rally`, { suit })),
      this.createMetaData('score', pointsMarkets, translate.instant(`SpecificEvening.Drillbit Duchy.Score`)),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Sway`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Drillbit Duchy.Discard`))
    ]

    if (this.difficulty === 'Nightmare') {
      eveningActions.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie (DC).NightmareScore'))
      );
    }
    
    return eveningActions;
  }
}
