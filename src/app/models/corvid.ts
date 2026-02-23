import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class CorvidBot extends Bot {

  public name: BotName = 'Corvid';

  public setupPosition = 'I';
  public setupRules = [
    `Setup0`,
    `Setup1`
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
      traitName: 'Embedded Agents',
      name: 'RuleEmbeddedAgents',
      text: 'TextEmbeddedAgents',
      isActive: true
    },
    {
      traitName: 'Nimble',
      name: 'RuleNimble',
      text: 'TextNimble',
      isActive: true
    },
    {
      traitName: 'Backup Plans',
      name: 'RuleBackupPlans',
      text: 'TextBackupPlans',
      canToggle: true
    },
    {
      traitName: 'Vendetta',
      name: 'RuleVendetta',
      text: `TextVendetta`,
      canToggle: true
    },
    {
      traitName: 'Gamble',
      name: 'RuleGamble',
      text: `TextGamble`,
      canToggle: true
    },
    {
      traitName: 'Mastermind',
      name: 'RuleMastermind',
      text: `TextMastermind`,
      canToggle: true
    },
  ];

  public customData = {
    decree: {
      fox: 0,
      mouse: 0,
      bunny: 0,
      bird: 2
    },

    buildings: []
  };

  public setup(): void {
    this.customData.decree.bird = this.difficulty === 'Easy' ? 1 : 2;
  }

  public birdsong(translate: TranslateService) {
    const newRoost = !this.customData.buildings.some(Boolean);

    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie.RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Electric Eyrie.CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie.DecreeOrder`))
    ];

    if (newRoost) {
      base.push(
        this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie.NewRoost`))
      );
    }

    return base;
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

            const recruitText = this.hasTrait('Nobility')
              ? translate.instant('SpecificDaylight.Electric Eyrie.ExtraRecruit')
              : '';

            actions.push(
              this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.Recruit', { totalForSuit, suitText, recruitText }))
            );
            break;
          }

          case 'move': {
            actions.push(
              this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.Move', { totalForSuit, suitText }))
            );
            break;
          }

          case 'battle': {
            let extraHit = '';
            if (suit === mostSuit) { extraHit = translate.instant('SpecificDaylight.Electric Eyrie.ExtraHit'); }
            actions.push(
              this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.Battle', { totalForSuit, suitText, extraHit }))
            );
            break;
          }
        }
      });
    });

    if (actions.length === 0) {
      return [
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.ExtraDecree'))
      ];
    }

    if (this.hasTrait('Relentless')) {
      actions.push(
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.ExtraRelentless'))
      );
    }

    actions.push(
      this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.ExtraBuild'))
    );

    if (this.hasTrait('Swoop')) {
      actions.push(
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie.ExtraSwoop'))
      );
    }

    return actions;
  }

  public evening(translate: TranslateService) {

    const score = Math.max(0, this.customData.buildings.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    const base = [
      this.createMetaData('score', score, translate.instant('SpecificEvening.Electric Eyrie.Score', { score }))
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie.NightmareScore'))
      );
    }

    return base
  }

  public turmoil(translate: TranslateService) {
    const base = [
      this.createMetaData('text', '', translate.instant('SpecificExtra.Electric Eyrie.Purge')),
      this.createMetaData('text', '', translate.instant('SpecificExtra.Electric Eyrie.Evening'))
    ];

    const score = this.customData.decree.bird

    if (this.hasTrait('Nobility')) {
      base.unshift(
        this.createMetaData('score', score, translate.instant('SpecificExtra.Electric Eyrie.YesNobility'))
      );
    } else {
      base.unshift(
        this.createMetaData('score', -score, translate.instant('SpecificExtra.Electric Eyrie.NoNobility'))
      );
    }

    return base;
  }
}
