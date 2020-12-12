import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class EyrieBot extends Bot {

  public name: BotName = 'Eyrie';

  public setupPosition = 'B';
  public setupRules = [
    `Setup0`,
    `Setup1`,
    `Setup2`,
    `Setup3`
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
      name: 'RuleHatesSurprises',
      text: 'TextHatesSurprises',
      isActive: true
    },
    {
      name: 'RuleLordsOfTheForest',
      text: 'TextLordsOfTheForest',
      isActive: true
    },
    {
      name: 'RuleNobility',
      text: 'TextNobility',
      canToggle: true
    },
    {
      name: 'RuleRelentless',
      text: 'TextRelentless',
      canToggle: true
    },
    {
      name: 'RuleSwoop',
      text: `TextSwoop`,
      canToggle: true
    },
    {
      name: 'RuleWarTax',
      text: `TextWarTax`,
      canToggle: true
    },
  ];

  public customData = {
    decree: {
      fox: 0,
      mouse: 0,
      bunny: 0,
      bird: 0
    },

    buildings: []
  };

  public birdsong(translate: TranslateService) {
    return [
      translate.instant(`SpecificBirdsong.Electric Eyrie.RevealOrder`),
      translate.instant(`SpecificBirdsong.Electric Eyrie.CraftOrder`),
      translate.instant(`SpecificBirdsong.Electric Eyrie.DecreeOrder`)
    ];
  }

  public daylight(translate: TranslateService) {
    const actions = [];

    let mostVal = 0;
    let mostSuit = '';
    let mostSuits = [];
    ['fox', 'mouse', 'bunny', 'bird'].forEach(suit => {
      if (this.customData.decree[suit] < mostVal) { return; }

      // hold onto info if there is ever a tie
      if (this.customData.decree[suit] === mostVal) {
        mostSuits.push(suit);
        return;
      }

      mostVal = this.customData.decree[suit];
      mostSuit = suit;

      // reset if we get here
      mostSuits = [suit];
    });

    // if we have a tie for the most, we don't have a most
    if (mostSuits.length > 1) {
      mostSuit = '';
      mostVal = 0;
    }

    ['recruit', 'move', 'battle'].forEach(curAction => {
      ['fox', 'mouse', 'bunny', 'bird'].forEach(suit => {
        const totalForSuit = this.customData.decree[suit];
        if (totalForSuit === 0) { return; }

        const suitText = `**card:${suit}**`;

        switch (curAction) {
          case 'recruit': {
            actions.push(translate.instant('SpecificDaylight.Electric Eyrie.Recruit', { totalForSuit, suitText }));
            break;
          }

          case 'move': {
            actions.push(translate.instant('SpecificDaylight.Electric Eyrie.Move', { totalForSuit, suitText }));
            break;
          }

          case 'battle': {
            let extraHit = '';
            if(suit === mostSuit) extraHit = translate.instant('SpecificDaylight.Electric Eyrie.ExtraHit');
            actions.push(translate.instant('SpecificDaylight.Electric Eyrie.Move', { totalForSuit, suitText, extraHit }));
            break;
          }
        }
      });
    });

    if (actions.length === 0) {
      return [
        translate.instant('SpecificDaylight.Electric Eyrie.ExtraDecree')
      ];
    }

    if (this.hasTrait('Relentless')) {
      actions.push(translate.instant('SpecificDaylight.Electric Eyrie.ExtraRelentless'));
    }

    actions.push(translate.instant('SpecificDaylight.Electric Eyrie.ExtraBuild'));

    if (this.hasTrait('Swoop')) {
      actions.push(translate.instant('SpecificDaylight.Electric Eyrie.ExtraSwoop'));
    }

    return actions;
  }

  public evening(translate: TranslateService) {

    const score = Math.max(0, this.customData.buildings.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    const base = [
      translate.instant('SpecificEvening.Electric Eyrie.Score', { score })
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(translate.instant('SpecificEvening.Electric Eyrie.ScoreNightmare'));
    }

    return base;
  }

  public turmoil(translate: TranslateService) {
    const base = [
      translate.instant('SpecificExtra.Electric Eyrie.Purge'),
      translate.instant('SpecificExtra.Electric Eyrie.Evening')
    ];

    if (this.hasTrait('Nobility')) {
      base.unshift(translate.instant('SpecificExtra.Electric Eyrie.YesNobility'));
    } else {
      base.unshift(translate.instant('SpecificExtra.Electric Eyrie.NoNobility'));
    }

    return base;
  }
}
