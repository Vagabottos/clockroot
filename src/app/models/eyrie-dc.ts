import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class EyrieBotDC extends Bot {

  public name: BotName = 'EyrieDC';

  public setupPosition = 'B';
  public setupRules = [
    `Setup0`,
    `Setup1`,
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
      traitName: 'Lords of the Forest',
      name: 'RuleLordsOfTheForest',
      text: 'TextLordsOfTheForest',
      isActive: true
    },
    {
      traitName: 'Nobility',
      name: 'RuleNobility',
      text: 'TextNobility',
      canToggle: true
    },
    {
      traitName: 'Relentless',
      name: 'RuleRelentless',
      text: 'TextRelentless',
      canToggle: true
    },
    {
      traitName: 'Swoop',
      name: 'RuleSwoop',
      text: `TextSwoop`,
      canToggle: true
    },
    {
      traitName: 'War Tax',
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
      bird: 2
    },

    buildings: []
  };

  public setup(): void {
  }

  public birdsong(translate: TranslateService) {
    const newRoost = !this.customData.buildings.some(Boolean);

    const base = [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie (DC).RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Electric Eyrie (DC).CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie (DC).DecreeOrder`))
    ];

    if (newRoost) {
      base.push(
        this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Electric Eyrie (DC).NewRoost`))
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

            let recruitNum = totalForSuit;
            if (suit === 'bird' && this.difficulty !== 'Nightmare') {
              if (this.difficulty === 'Easy') { recruitNum -= 1; }
              if (this.difficulty === 'Challenging') { recruitNum += 1; }
            }

            if (this.difficulty === 'Nightmare') { recruitNum += 1; }

            const recruitText = this.hasTrait('Nobility')
              ? translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraRecruit')
              : '';

            if (recruitNum > 0) {
              actions.push(
                this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).Recruit', { recruitNum, suitText, recruitText }))
              );
            }
            break;
          }

          case 'move': {
            actions.push(
              this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).Move', { totalForSuit, suitText }))
            );
            break;
          }

          case 'battle': {
            let extraHit = '';
            if (mostSuits.includes(suit)) { extraHit = translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraHit'); }
            actions.push(
              this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).Battle', { totalForSuit, suitText, extraHit }))
            );
            break;
          }
        }
      });
    });

    if (actions.length === 0) {
      return [
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraDecree'))
      ];
    }

    if (this.hasTrait('Relentless')) {
      actions.push(
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraRelentless'))
      );
    }

    actions.push(
      this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraBuild'))
    );

    if (this.hasTrait('Swoop')) {
      actions.push(
        this.createMetaData('text', '', translate.instant('SpecificDaylight.Electric Eyrie (DC).ExtraSwoop'))
      );
    }

    return actions;
  }

  public evening(translate: TranslateService) {

    const score = Math.max(0, this.customData.buildings.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    const base = [
      this.createMetaData('score', score, translate.instant('SpecificEvening.Electric Eyrie (DC).Score', { score }))
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Electric Eyrie (DC).NightmareScore'))
      );
    }

    return base;
  }

  public turmoil(translate: TranslateService) {
    const base = [
      this.createMetaData('text', '', translate.instant('SpecificExtra.Electric Eyrie (DC).Purge')),
      this.createMetaData('text', '', translate.instant('SpecificExtra.Electric Eyrie (DC).Evening'))
    ];

    const score = this.customData.decree.bird

    if (this.hasTrait('Nobility')) {
      base.unshift(
        this.createMetaData('score', score, translate.instant('SpecificExtra.Electric Eyrie (DC).YesNobility'))
      );
    } else {
      base.unshift(
        this.createMetaData('score', -score, translate.instant('SpecificExtra.Electric Eyrie (DC).NoNobility'))
      );
    }

    return base;
  }
}
