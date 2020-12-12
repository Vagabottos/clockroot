import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

const numToText = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  6: 'six',
  8: 'eight'
};

const getNumText = (num: number) => numToText[num] || 'UNKNOWN NUMBER';

export class MarquiseBot extends Bot {

  public name: BotName = 'Marquise';

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
      traitName: 'The Keep',
      name: 'RuleTheKeep',
      text: 'TextTheKeep',
      isActive: true
    },
    {
      traitName: 'Blitz',
      name: 'RuleBlitz',
      text: 'TextBlitz',
      canToggle: true
    },
    {
      traitName: 'Fortified',
      name: 'RuleFortified',
      text: `TextFortified`,
      canToggle: true
    },
    {
      traitName: 'Hospitals',
      name: 'RuleHospitals',
      text: `TextHospitals`,
      canToggle: true
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

    buildings: {
      fox: [],
      bunny: [],
      mouse: []
    }
  };

  public birdsong(translate: TranslateService) {
    return [
      translate.instant(`SpecificBirdsong.Mechanical Marquise.RevealOrder`),
      translate.instant(`SpecificBirdsong.Mechanical Marquise.CraftOrder`)
    ];
  }

  public daylight(translate: TranslateService) {
    let totalWarriors = 4;
    if (this.difficulty === 'Easy') { totalWarriors = 2; }
    if (this.hasTrait('Iron Will') && this.customData.currentSuit === 'bird') { totalWarriors *= 2; }

    const warriorsOverTwo = totalWarriors / 2;

    const blitzText = this.hasTrait('Blitz')
    ? translate.instant(`SpecificDaylight.Mechanical Marquise.Blitz`)
    : '';

    if (this.customData.currentSuit === 'bird') {

      const isChallengingPlus = this.difficulty === 'Challenging' || this.difficulty === 'Nightmare';

      const base2 = [
        translate.instant(`SpecificDaylight.Mechanical Marquise.Bird0`),

        translate.instant(`SpecificDaylight.Mechanical Marquise.Bird1`, { totalWarriors, warriorsOverTwo }),

        isChallengingPlus ? translate.instant(`SpecificDaylight.Mechanical Marquise.BirdChallenging`) : '',

        translate.instant(`SpecificDaylight.Mechanical Marquise.Bird2`),

        translate.instant(`SpecificDaylight.Mechanical Marquise.Bird3`),
      ].filter(Boolean);

      if (blitzText) { base2.push(blitzText); }

      return base2;
    }

    let building = '';
    if (this.customData.currentSuit === 'fox')   { building = 'sawmill'; }
    if (this.customData.currentSuit === 'bunny') { building = 'workshop'; }
    if (this.customData.currentSuit === 'mouse') { building = 'recruiter'; }

    const suit = this.customData.currentSuit;

    const base = [
      translate.instant(`SpecificDaylight.Mechanical Marquise.Suit0`, { suit }),

      translate.instant(`SpecificDaylight.Mechanical Marquise.Suit1`, { totalWarriors, suit }),

      translate.instant(`SpecificDaylight.Mechanical Marquise.Suit2`, { building }),

      translate.instant(`SpecificDaylight.Mechanical Marquise.Suit3`, { suit })
    ];

    if (blitzText) { base.push(blitzText); }

    base.push(
      translate.instant(`SpecificDaylight.Mechanical Marquise.Repeat`)
    );

    return base;
  }

  public evening(translate: TranslateService) {
    const buildings = this.customData.buildings;

    if (this.customData.currentSuit === 'bird') {

      const scores = ['fox', 'mouse', 'bunny'].map(suit => {
        return buildings[suit].reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1;
      });

      const maxScore = Math.max(...scores, 0);

      const base2 = [
        translate.instant('SpecificEvening.Electric Eyrie.Score', { score: maxScore }),
        translate.instant('SpecificEvening.Electric Eyrie.Discard')
      ];


      if (this.difficulty === 'Nightmare') {
        base2.push(translate.instant('SpecificEvening.Electric Eyrie.ScoreNightmare'));
      }

      return base2;
    }

    const buildingsOfSuit = buildings[this.customData.currentSuit];

    const score = Math.max(0, buildingsOfSuit.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    const base = [
      translate.instant('SpecificEvening.Electric Eyrie.Score', { score }),
      translate.instant('SpecificEvening.Electric Eyrie.Discard')
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(translate.instant('SpecificEvening.Electric Eyrie.ScoreNightmare'));
    }

    return base;
  }
}
