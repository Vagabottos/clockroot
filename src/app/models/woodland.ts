import { Bot, BotName } from './bot';

export class WoodlandBot extends Bot {

  public name: BotName = 'Woodland';

  public setupPosition = 'C';
  public setupRules = [
    `Form a supply of 10 warriors near you.`,

    `Collect your 3 bases and place them near you.`,

    `Collect your 10 sympathy tokens and place them near you.`
  ];

  public difficultyDescriptions = {
    Easy: `
You only **Organize** if a clearing has four or more Alliance warriors.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
You **Organize** if a clearing has two or more Alliance warriors.
    `,
    Nightmare: `
You **Organize** if a clearing has two or more Alliance warriors.

At the end of Evening, score one victory point.
    `
  };

  public rules = [
    {
      name: 'Poor Manual Dexterity',
      text: `You have no hand of cards. You cannot discard cards.
      If a human would take a card from you, they draw a card instead.
      If a human would give a card to you, they discard it, and you score **vp:1**.`,
      isActive: true
    },
    {
      name: 'Automated Ambush',
      text: 'In battle as defender with any Alliance warriors, you deal an extra hit.',
      isActive: true
    },
    {
      name: 'Automated Outrage',
      text: `Whenever a human removes a sympathy token or moves any warriors into a sympathetic clearing,
      they must discard a matching card. If they cannot, you score **vp:1**.`,
      isActive: true
    },
    {
      name: 'Martial Law',
      text: `Whenever you place a sympathy token in a clearing with three or more warriors of an enemy player,
      you score one fewer victory point _(minimum of zero)_.`,
      isActive: true
    },
    {
      name: 'Crackdown',
      text: `Whenever a base is removed, remove all sympathy tokens from clearings matching the suit of the base removed.`,
      isActive: true
    },
    {
      name: 'Informants',
      text: `Defenseless sympathy tokens benefit from Automated Ambush.`,
      canToggle: true
    },
    {
      name: 'Popularity',
      text: `Enemies do not score victory points for removing sympathy tokens.`,
      canToggle: true
    },
    {
      name: 'Veterans',
      text: `
Gain the Guerilla Warfare ability of the Woodland Alliance. _(In battle as defender, you use the higher roll
  and the attacker uses the lower roll.)_
      `,
      canToggle: true
    },
    {
      name: 'Wildfire',
      text: `At the end of evening, **Spread Sympathy**. Do not score points for placing this sympathy token.`,
      canToggle: true
    },
  ];

  public customData = {
    currentSuit: 'bird',

    sympathy: [],

    buildings: {
      fox: false,
      bunny: false,
      mouse: false
    }
  };

  public birdsong() {
    const base = [
      `Reveal an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`
    ];

    if (this.customData.currentSuit === 'bird'
    && !Object.keys(this.customData.buildings).every(x => this.customData.buildings[x])) { return base; }

    if (this.customData.currentSuit !== 'bird' && !this.customData.buildings[this.customData.currentSuit]) {
      base.push(`
Remove all enemy pieces from the **card:${this.customData.currentSuit}** clearing with the most enemy pieces,
and place the **card:${this.customData.currentSuit}** base there.
      `);

    } else {
      const sympathySpread = this.customData.sympathy.slice(0, 4).every(x => x) ? 'once' : 'twice';
      base.push(`
**Spread Sympathy** ${sympathySpread}.
      `);

    }

    return base;
  }

  public daylight() {

    const curSuit = this.customData.currentSuit;

    const base = [
`Place a sympathy token in the **card:${curSuit}** clearing with the fewest enemy warriors adjacent to any sympathetic clearing.

(**No Such Clearings**: Instead place a sympathy token on the clearing with the fewest enemy pieces.)

(**Cannot Spread**: If you cannot place a sympathy token, score 5 VP.)`,
    ];

    if (curSuit === 'bird') {
      base.push(`
Remove all enemy pieces from any clearing with the most enemy pieces,
and place the corresponding base there.
      `);
    }

    return base;
  }

  public evening() {

    let organizeVal = 'three';
    if (this.difficulty === 'Easy') { organizeVal = 'four'; }
    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') { organizeVal = 'two'; }

    const base = [
      `In each clearing with a base and ${organizeVal} or more Alliance warriors,
      remove all Alliance warriors there and **Spread Sympathy**.`,

      `Place a warrior in each clearing with a base.`,

      `Discard the order card.`
    ];

    if (this.hasTrait('Wildfire')) {
      base.push(`**Spread Sympathy**, but do not score victory points.`);
    }

    if (this.difficulty === 'Nightmare') {
      base.push(`Score **vp:1**.`);
    }

    return base;
  }
}
