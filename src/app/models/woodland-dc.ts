import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class WoodlandBotDC extends Bot {

  public name: BotName = 'WoodlandDC';

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
      traitName: 'Poor Manual Dexterity',
      name: 'RulePoorManualDexterity',
      text: `TextPoorManualDexterity`,
      isActive: true
    },
    {
      traitName: 'Automated Ambush',
      name: 'RuleAutomatedAmbush',
      text: 'TextAutomatedAmbush',
      isActive: true
    },
    {
      traitName: 'Automated Outrage',
      name: 'RuleAutomatedOutrage',
      text: `TextAutomatedOutrage`,
      isActive: true
    },
    {
      traitName: 'Crackdown',
      name: 'RuleCrackdown',
      text: `TextCrackdownDC`,
      isActive: true
    },
    {
      traitName: 'Informants',
      name: 'RuleInformants',
      text: `TextInformants`,
      canToggle: true
    },
    {
      traitName: 'Popularity',
      name: 'RulePopularity',
      text: `TextPopularityDC`,
      canToggle: true
    },
    {
      traitName: 'Veterans',
      name: 'RuleVeterans',
      text: 'TextVeteransDC',
      canToggle: true
    },
    {
      traitName: 'Wildfire',
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
      translate.instant(`SpecificBirdsong.Automated Alliance (DC).RevealOrder`),
      translate.instant(`SpecificBirdsong.Automated Alliance (DC).CraftOrder`)
    ];

    if (this.customData.currentSuit !== 'bird' && !this.customData.buildings[this.customData.currentSuit]) {

      const suit = this.customData.currentSuit;
      base.push(translate.instant(`SpecificBirdsong.Automated Alliance (DC).Revolt`, { suit }));

    } else {
      const sympathySpread = this.customData.sympathy.slice(0, 5).every(x => x) ? '1x' : '2x';
      base.push(translate.instant(`SpecificBirdsong.Automated Alliance (DC).Spread`, { sympathySpread }));

    }

    return base;
  }

  public daylight(translate: TranslateService) {

    const suit = this.customData.currentSuit;

    const base = [
    ];

    if (suit === 'bird') {
      base.push(translate.instant(`SpecificDaylight.Automated Alliance (DC).SympathyBird`, { suit }));
      base.push(translate.instant(`SpecificDaylight.Automated Alliance (DC).Revolt`));
    } else {
      base.push(translate.instant(`SpecificDaylight.Automated Alliance (DC).Sympathy`, { suit }));
    }

    const sympathySpread = this.customData.sympathy.slice(0, 5).every(x => x) ? '1x' : '2x';
    base.push(translate.instant(`SpecificBirdsong.Automated Alliance (DC).RevoltSpread`, { sympathySpread }));

    return base;
  }

  public evening(translate: TranslateService) {

    let organizeVal = '3';
    if (this.difficulty === 'Easy') { organizeVal = '4'; }
    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') { organizeVal = '2'; }

    const base = [
      translate.instant(`SpecificEvening.Automated Alliance (DC).Organize`, { organizeVal }),

      translate.instant(`SpecificEvening.Automated Alliance (DC).WarriorPlace`),

      translate.instant(`SpecificEvening.Automated Alliance (DC).Discard`)
    ];

    if (this.hasTrait('Wildfire')) {
      base.push(translate.instant(`SpecificEvening.Automated Alliance (DC).Wildfire`));
    }

    if (this.difficulty === 'Nightmare') {
      base.push(translate.instant(`SpecificEvening.Automated Alliance (DC).NightmareScore`));
    }

    return base;
  }
}
