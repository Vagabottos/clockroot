import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class MarquiseBotDC extends Bot {

  public name: BotName = 'MarquiseDC';

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
      text: `TextHospitalsDC`,
      canToggle: true
    },
    {
      traitName: 'Iron Will',
      name: 'RuleIronWill',
      text: 'TextIronWillDC',
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

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Mechanical Marquise (DC).RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Mechanical Marquise (DC).CraftOrder`))
    ];
  }

  public daylight(translate: TranslateService) {
    let totalWarriors = 4;
    if (this.difficulty === 'Easy') { totalWarriors = 3; }
    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') { totalWarriors = 5; }

    const blitzText = this.hasTrait('Blitz')
    ? this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Blitz`))
    : this.createMetaData('text', '', '');

    if (this.customData.currentSuit === 'bird') {

      const base2 = [
        this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Bird0`)),
        this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Bird1`, { totalWarriors })),
        this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Bird2`)),
        this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Bird3`)),
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
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Suit0`, { suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Suit1`, { totalWarriors, suit })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Suit2`, { building })),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Mechanical Marquise (DC).Suit3`, { suit }))
    ];

    if (blitzText) { base.push(blitzText); }

    return base;
  }

  public evening(translate: TranslateService) {
    const buildings = this.customData.buildings;

    const iwText = this.hasTrait('Iron Will')
                 ? this.createMetaData('text', '', translate.instant(`SpecificEvening.Mechanical Marquise (DC).RepeatIronWill`))
                 : this.createMetaData('text', '', translate.instant(`SpecificEvening.Mechanical Marquise (DC).Repeat`));

    if (this.customData.currentSuit === 'bird') {

      const scores = ['fox', 'mouse', 'bunny'].map(suit => {
        return buildings[suit].reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1;
      });

      const maxScore = Math.max(...scores, 0);

      const base2 = [
        iwText,
        this.createMetaData('score', maxScore, translate.instant('SpecificEvening.Mechanical Marquise (DC).Score', { score: maxScore })),
        this.createMetaData('text', '', translate.instant('SpecificEvening.Mechanical Marquise (DC).Discard'))
      ];


      if (this.difficulty === 'Nightmare') {
        base2.push(
          this.createMetaData('score', 1, translate.instant('SpecificEvening.Mechanical Marquise (DC).NightmareScore'))
        );
      }

      return base2;
    }

    const buildingsOfSuit = buildings[this.customData.currentSuit];

    const score = Math.max(0, buildingsOfSuit.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    const base = [
      iwText,
      this.createMetaData('score', score, translate.instant('SpecificEvening.Mechanical Marquise (DC).Score', { score })),
      this.createMetaData('text', '', translate.instant('SpecificEvening.Mechanical Marquise (DC).Discard'))
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Mechanical Marquise (DC).NightmareScore'))
      );
    }

    return base;
  }
}
