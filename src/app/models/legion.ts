//Leave the imports alone, change literally everything else
import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class LegionBot extends Bot { 

  public name: BotName = 'Legion'; 

  public setupPosition = 'J'; 
  public setupRules = [
    'Setup0',
    'Setup1',
    'Setup2'
  ];

  public difficultyDescriptions = {
    Easy: `Easy`,
    Normal: 'Normal',
    Challenging: `Challenging`,
    Nightmare: `Nightmare`
  };

  public rules = [
    {
      traitName: 'Automated Looters',
      name: 'RuleAutomatedLooters',
      text: `TextAutomatedLooters`,
      isActive: true
    },
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
      traitName: 'Warlord',
      name: 'RuleWarlord',
      text: `TextWarlord`,
      isActive: true
    }
  ];
  
  public customData = {
    currentSuit: 'bird',
    
    hoardItems: [],

    itemList: ["sack","boot","sword","tea","coin","crossbow","hammer"]
  };

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    //Allows you to reference the ordered suit as a variable locally
    const suit = this.customData.currentSuit;
    const hoardLength = (this.customData.hoardItems && this.customData.hoardItems.length) || 1;
    const hoardNum = Math.min(3,Math.ceil(hoardLength/2))

    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Looting Legion.Reveal`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Looting Legion.Craft`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Looting Legion.Raze`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Looting Legion.Recruit`, {hoardNum}))
    ];
    return base;
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;
    const hoardLength = (this.customData.hoardItems && this.customData.hoardItems.length) || 1;
    const hoardNum = Math.min(3,Math.ceil(hoardLength/2))

    //You can include logic to spit out the text as appropriate to the faction. It's best to define a base array and add to it
    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Looting Legion.Battle`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Looting Legion.Move`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Looting Legion.Build`, {suit})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Looting Legion.Advance`, {hoardNum})),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Looting Legion.Anoint`)),
    ];
    return base;
  }

  public evening(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificEvening.Looting Legion.Incite`, {suit})),
      this.createMetaData('score', 1, translate.instant(`SpecificEvening.Looting Legion.Score`))
    ];
    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie (DC).NightmareScore'))
      );
    }
    base.push(this.createMetaData('text', '', translate.instant(`SpecificEvening.Looting Legion.Discard`)))
    return base;
  }

  public extra(translate: TranslateService) {
    return [this.createMetaData('score', 2, translate.instant(`SpecificExtra.Looting Legion.Hoard`))]
  }
}
