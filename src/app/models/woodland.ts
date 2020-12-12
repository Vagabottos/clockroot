import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class WoodlandBot extends Bot {

  public name: BotName = 'Woodland';

  public setupPosition = 'C';
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
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true
    },
    {
      name: 'RuleAutomatedAmbush',
      text: 'TextAutomatedAmbush',
      isActive: true
    },
    {
      name: 'RuleAutomatedOutrage',
      text: `TextAutomatedOutrage`,
      isActive: true
    },
    {
      name: 'RuleMartialLaw',
      text: `TextMartialLaw`,
      isActive: true
    },
    {
      name: 'RuleCrackdown',
      text: `TextCrackdown`,
      isActive: true
    },
    {
      name: 'RuleInformants',
      text: `TextInformants`,
      canToggle: true
    },
    {
      name: 'RulePopularity',
      text: `TextPopularity`,
      canToggle: true
    },
    {
      name: 'RuleVeterans',
      text: 'TextVeterans',
      canToggle: true
    },
    {
      name: 'RuleWildfire',
      text: `TextWildfire`,
      canToggle: true
    },
  ];

  public customData = {
    currentSuit: 'bird',

    sympathy: [false, false, false, false, false, false, false, false, false, false],

    buildings: {
      fox: false,
      bunny: false,
      mouse: false
    }
  };

  public birdsong(translate: TranslateService) {
    const base = [
      translate.instant(`SpecificBirdsong.Automated Alliance.RevealOrder`),
      translate.instant(`SpecificBirdsong.Automated Alliance.CraftOrder`)
    ];

    if (this.customData.currentSuit !== 'bird' && !this.customData.buildings[this.customData.currentSuit]) {

      const suit = this.customData.currentSuit;
      base.push(translate.instant(`SpecificBirdsong.Automated Alliance.Revolt`, { suit }));

      const sympathySpread = this.customData.sympathy.slice(0, 5).every(x => x) ? '1x' : '2x';
      base.push(translate.instant(`SpecificBirdsong.Automated Alliance.RevoltSpread`, { sympathySpread }));

    } else {
      const sympathySpread = this.customData.sympathy.slice(0, 5).every(x => x) ? '1x' : '2x';
      base.push(translate.instant(`SpecificBirdsong.Automated Alliance.Spread`, { sympathySpread }));

    }

    return base;
  }

  public daylight(translate: TranslateService) {

    const suit = this.customData.currentSuit;

    const base = [
      translate.instant(`SpecificDaylight.Automated Alliance.Spread`, { suit })
    ];

    if (suit === 'bird') {
      base.push(translate.instant(`SpecificDaylight.Automated Alliance.Revolt`));
    }

    return base;
  }

  public evening(translate: TranslateService) {

    let organizeVal = '3';
    if (this.difficulty === 'Easy') { organizeVal = '4'; }
    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') { organizeVal = '2'; }

    const base = [
      translate.instant(`SpecificEvening.Automated Alliance.Organize`, { organizeVal }),

      translate.instant(`SpecificEvening.Automated Alliance.WarriorPlace`),

      translate.instant(`SpecificEvening.Automated Alliance.Discard`)
    ];

    if (this.hasTrait('Wildfire')) {
      base.push(translate.instant(`SpecificEvening.Automated Alliance.Wildfire`));
    }

    if (this.difficulty === 'Nightmare') {
      base.push(translate.instant(`SpecificEvening.Automated Alliance.NightmareScore`));
    }

    return base;
  }
}
