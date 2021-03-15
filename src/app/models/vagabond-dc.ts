import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class VagaBotDC extends Bot {

  public name: BotName = 'VagabondDC';

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
      text: `TextHelperDC`,
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
    Tinker: `SpecificExtra.Vagabot (DC).DescTinker`,
    Thief: 'SpecificExtra.Vagabot (DC).DescThief',
    Ranger: 'SpecificExtra.Vagabot (DC).DescRanger'
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

  private actions(vaga: VagaBotDC, translate: TranslateService) {
    return {
      explore() {
        return translate.instant('SpecificDaylight.Vagabot (DC).ActionExplore');
      },

      quest(canBeModified = false) {
        return `
${translate.instant('SpecificDaylight.Vagabot (DC).ActionQuest')}

${canBeModified && vaga.hasTrait('Adventurer') ? translate.instant('SpecificDaylight.Vagabot (DC).ActionQuestRepeat') : ''}`;
      },

      aid() {
        return translate.instant('SpecificDaylight.Vagabot (DC).ActionAid');
      },

      battle() {
        const target = vaga.hasTrait('Berserker')
          ? translate.instant('SpecificDaylight.Vagabot (DC).ActionBattleTargetBerserker')
          : translate.instant('SpecificDaylight.Vagabot (DC).ActionBattleTarget');

        return `
${translate.instant('SpecificDaylight.Vagabot (DC).ActionBattle', { target })}

${!vaga.hasTrait('Adventurer') ? translate.instant('SpecificDaylight.Vagabot (DC).ActionBattleAdventurer') : ''}

${vaga.hasTrait('Marksman') ? translate.instant('SpecificDaylight.Vagabot (DC).ActionBattleMarksman') : ''}

${translate.instant('SpecificDaylight.Vagabot (DC).ActionBattleTiebreaker')}
`;
      },

      special() {
        return `
${translate.instant('SpecificDaylight.Vagabot (DC).ActionSpecial')}

${translate.instant('SpecificExtra.Vagabot (DC).Special' + vaga.customData.chosenVaga)}
        `;
      }
    };
  }

  public setup(): void {

  }

  public birdsong(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Vagabot (DC).RevealOrder`)),
      this.createMetaData('score', 1, translate.instant(`SpecificBirdsong.Vagabot (DC).CraftOrder`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Vagabot (DC).RestOrder`))
    ];
  }

  public daylight(translate: TranslateService) {
    const actions = this.actions(this, translate);

    let base = [];

    switch (this.customData.currentSuit) {
      case 'fox':   { 
                      base = [
                              this.createMetaData('text', '', actions.explore()),  
                              this.createMetaData('text', '', actions.special()), 
                              this.createMetaData('score', 1, actions.battle())
                      ];                  
                      break; 
                    }
      case 'bunny': { 
                      base = [
                              this.createMetaData('text', '', actions.special()),  
                              this.createMetaData('text', '', actions.aid()),     
                              this.createMetaData('score', 1, actions.battle())
                      ];                  
                      break; 
                    }
      case 'mouse': { 
                      base = [
                              this.createMetaData('score', 2, actions.quest()),    
                              this.createMetaData('text', '', actions.aid()),     
                              this.createMetaData('score', 1, actions.battle())
                      ];                  
                      break; 
                    }
      default:      { 
                      base = [
                              this.createMetaData('text', '', actions.explore()),  
                              this.createMetaData('score', 2, actions.quest()),   
                              this.createMetaData('score', 1, actions.battle())
                      ];                  
                      break; 
                    }
    }

    if (this.hasTrait('Adventurer')) {
      base.push(
        this.createMetaData('score', 2, actions.quest(true))
      );
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
      this.createMetaData('text', '', translate.instant('SpecificEvening.Vagabot (DC).Refresh', { itemRefreshMin, itemRefreshMax })),
      this.createMetaData('text', '', translate.instant('SpecificEvening.Vagabot (DC).Forest', { itemRepairs })),
      this.createMetaData('text', '', translate.instant('SpecificEvening.Vagabot (DC).Discard'))
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(
        this.createMetaData('score', 1, translate.instant('SpecificEvening.Vagabot (DC).NightmareScore'))
      );
    }

    return base;
  }
}
