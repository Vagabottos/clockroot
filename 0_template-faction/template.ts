//Leave the imports alone, change literally everything else
import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class TemplateBot extends Bot { 

  public name: BotName = 'Template'; 

  public setupPosition = 'A'; 
  public setupRules = [
    'Setup0',
    'Setup1',
    'Setup2',
    'Setup3',
    'Setup4',
  ];

  public difficultyDescriptions = {
    Easy: `Easy`,
    Normal: 'Normal',
    Challenging: `Challenging`,
    Nightmare: `Nightmare`
  };

  public rules = [
    //Trait that is always active (such as Poor Manual Dexterity and Hates Surprises)
    {
      traitName: 'Poor Manual Dexterity',
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true //Look here for why
    },
    {
      traitName: 'Hates Surprises',
      name: 'RuleHatesSurprises',
      text: 'TextHatesSurprises',
      isActive: true
    },
    //Trait that can be toggled on to increase difficulty
    {
      traitName: 'Hospitals',
      name: 'RuleHospitals',
      text: `TextHospitals`,
      canToggle: true //Look here for why
    },
    {
      traitName: 'Iron Will',
      name: 'RuleIronWill',
      text: 'TextIronWill',
      canToggle: true
    }
  ];

  public customData = {
    currentSuit: 'bird',

    numWarriors: 8,

    buildings: {
      fox: [],
      bunny: [],
      mouse: []
    },

    trackedArray: {
      bomb: [false, false],       
      snare: [false, false],      //true = face-up // false = stowed or face-down
      extortion: [false, false],
      raid: [false, false]
    }
  };

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    //Allows you to reference the ordered suit as a variable locally
    const suit = this.customData.currentSuit;
    const numWarriors = this.customData.numWarriors;

    //The returned array is read by the translator and pulls from the JSON to spit out the text
    return [
      //Example of just spitting out text
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Mechanical Marquise.RevealOrder`)),
      //Example of adding a button to increase the VP by the integer
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Mechanical Marquise.CraftOrder`)),
      //Example of adding a variable to the translator (JSON reads these variables wtih a translator such as **card:{{suit}}** spits out card-bird.png)
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Mechanical Marquise.CraftOrder`, {suit, numWarriors}))
    ];
  }

  public daylight(translate: TranslateService) {
    //You can include logic to spit out the text as appropriate to the faction. It's best to define a base array and add to it
    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Template Faction.Move`))
    ];
    const numWarriors = this.customData.numWarriors;
    (numWarriors > 5) ? base.concat(this.createMetaData('text','',translate.instant(`SpecificDaylight.Template Faction.Attack`))) : '';
    return base;
  }

  public evening(translate: TranslateService) {
    return [

    ];
  }
}
