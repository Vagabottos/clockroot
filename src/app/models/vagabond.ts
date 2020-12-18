import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class VagaBot extends Bot {

  public name: BotName = 'Vagabond';

  public setupPosition = 'D';
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
      traitName: 'Lone Wanderer',
      name: 'RuleLoneWanderer',
      text: 'TextLoneWanderer',
      isActive: true
    },
    {
      traitName: 'Nimble',
      name: 'RuleNimble',
      text: 'TextNimble',
      isActive: true
    },
    {
      traitName: 'Adventurer',
      name: 'RuleAdventurer',
      text: `TextAdventurer`,
      canToggle: true
    },
    {
      traitName: 'Berserker',
      name: 'RuleBerserker',
      text: `TextBerserker`,
      canToggle: true
    },
    {
      traitName: 'Helper',
      name: 'RuleHelper',
      text: `TextHelper`,
      canToggle: true
    },
    {
      traitName: 'Marksman',
      name: 'RuleMarksman',
      text: `TextMarksman`,
      canToggle: true
    },
  ];

  public descriptions = {
    Tinker: `SpecificExtra.Vagabot.DescTinker`,
    Thief: 'SpecificExtra.Vagabot.DescThief',
    Ranger: 'SpecificExtra.Vagabot.DescRanger'
  };

  public customData = {

    chosenVaga: '',

    currentSuit: 'bird',

    satchelItems: {},

    decree: {
      fox: 0,
      mouse: 0,
      bunny: 0,
      bird: 0
    },

    buildings: []
  };

  private actions(vaga: VagaBot, translate: TranslateService) {
    return {
      explore() {
        return translate.instant('SpecificDaylight.Vagabot.ActionExplore');
      },

      quest(canBeModified = false) {
        return `
${translate.instant('SpecificDaylight.Vagabot.ActionQuest')}

${canBeModified && vaga.hasTrait('Adventurer') ? translate.instant('SpecificDaylight.Vagabot.ActionQuestRepeat') : ''}`;
      },

      aid() {
        const aidHelpText = vaga.hasTrait('Helper') ? '2x ' : '';
        return translate.instant('SpecificDaylight.Vagabot.ActionQuestRepeat', { aidHelpText });
      },

      battle() {
        const target = vaga.hasTrait('Berserker') 
          ? translate.instant('SpecificDaylight.Vagabot.ActionBattleTargetBerserker')
          : translate.instant('SpecificDaylight.Vagabot.ActionBattleTarget');

        return `
${translate.instant('SpecificDaylight.Vagabot.ActionBattle', { target })}

${!vaga.hasTrait('Adventurer') ? translate.instant('SpecificDaylight.Vagabot.ActionBattleAdventurer') : ''}

${vaga.hasTrait('Marksman') ? translate.instant('SpecificDaylight.Vagabot.ActionBattleMarksman') : ''}

${translate.instant('SpecificDaylight.Vagabot.ActionBattleTiebreaker')}
`;
      },

      repair() {
        return translate.instant('SpecificDaylight.Vagabot.ActionRepair');
      },

      special() {
        return `
${translate.instant('SpecificDaylight.Vagabot.ActionSpecial')}

${translate.instant('SpecificExtra.Vagabot.Special' + vaga.customData.chosenVaga)}
        `;
      }
    };
  }

  public birdsong(translate: TranslateService) {
    return [
      translate.instant(`SpecificBirdsong.Vagabot.RevealOrder`),
      translate.instant(`SpecificBirdsong.Vagabot.CraftOrder`),
      translate.instant(`SpecificBirdsong.Vagabot.RestOrder`)
    ];
  }

  public daylight(translate: TranslateService) {
    const actions = this.actions(this, translate);

    let base = [];

    switch (this.customData.currentSuit) {
      case 'fox':   { base = [actions.explore(),  actions.battle(), actions.special()];                  break; }
      case 'bunny': { base = [actions.battle(),   actions.repair(), actions.special()];                  break; }
      case 'mouse': { base = [actions.quest(),    actions.aid(),    actions.battle(), actions.repair()]; break; }
      default:      { base = [actions.explore(),  actions.quest(),  actions.aid(),    actions.battle()]; break; }
    }

    if (this.hasTrait('Adventurer')) {
      base.push(actions.quest(true));
    }

    return base;
  }

  public evening(translate: TranslateService) {
    const itemRepairs = this.hasTrait('Berserker') ? 2 : 1;

    let itemRefreshMin = '4';
    let itemRefreshMax = '6';

    if (this.difficulty === 'Easy') {
      itemRefreshMin = '3';
      itemRefreshMax = '5';
    }

    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') {
      itemRefreshMin = '5';
      itemRefreshMax = '7';
    }

    const base = [
      translate.instant('SpecificEvening.Vagabot.Refresh', { itemRefreshMin, itemRefreshMax }),
      translate.instant('SpecificEvening.Vagabot.Forest', { itemRepairs }),
      translate.instant('SpecificEvening.Vagabot.Discard')
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(translate.instant('SpecificEvening.Vagabot.NightmareScore'));
    }

    return base;
  }
}
