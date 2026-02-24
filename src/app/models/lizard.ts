import { TranslateService } from '@ngx-translate/core';
import { Bot, BotName } from './bot';

export class LizardBot extends Bot {

  public name: BotName = 'Lizard';

  public setupPosition = 'F';
  public setupRules = [
    `Setup0`,
    `Setup1`,
    `Setup2`,
    `Setup3`,
    `Setup4`
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
      traitName: 'Pilgrims',
      name: 'RulePilgrims',
      text: 'TextPilgrims',
      isActive: true
    },
    {
      traitName: 'Robot Revenge',
      name: 'RuleRobotRevenge',
      text: 'TextRobotRevenge',
      isActive: true
    },
    {
      traitName: 'Fanatics',
      name: 'RuleFanatics',
      text: 'TextFanatics',
      canToggle: true
    },
    {
      traitName: 'Martyrs',
      name: 'RuleMartyrs',
      text: `TextMartyrs`,
      canToggle: true
    },
    {
      traitName: 'Erratic',
      name: 'RuleErratic',
      text: `TextErratic`,
      canToggle: true
    },
    {
      traitName: 'Spiteful',
      name: 'RuleSpiteful',
      text: `TextSpiteful`,
      canToggle: true
    },
  ];
  // This one is gonna need a sermon on the mount with how whacky Lizards is. SpecificExtras may need to be used to address Lost Souls, Conspiracies, Acolytes... I'll probably think about this one last.
  public customData = {
    currentSuit: 'bird',

  };

  public setup(): void {
  }

  public birdsong(translate: TranslateService) {
    return [
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Logical Lizards.Outcasts`)),
      this.createMetaData('text', '', translate.instant(`SpecificBirdsong.Logical Lizards.Conspiracy`)),
    ];
  }

  public daylight(translate: TranslateService) {
    const suit = this.customData.currentSuit;

    return [
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Logical Lizards.RitualsBird`)),
      this.createMetaData('text', '', translate.instant(`SpecificDaylight.Logical Lizards.RitualsOther`, {suit})),
    ];
  }

  public evening(translate: TranslateService) {
    return [
        this.createMetaData('score', 1, translate.instant(`SpecificEvening.Logical Lizards.Score`)),
        this.createMetaData('text', '', translate.instant(`SpecificEvening.Logical Lizards.DiscardLostSouls`)),
        this.createMetaData('text', '', translate.instant(`SpecificEvening.Logical Lizards.ReturnRevealedCards`)),
        this.createMetaData('score', 1, translate.instant(`SpecificEvening.Logical Lizards.Craft`)),
    ]
  
  }
}
