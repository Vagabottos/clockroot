import { Bot, BotName } from './bot';

/*
  Thief - Take a random card from the enemy in your clearing with most points there, then most pieces there.
  Tinker - Search the discard pile for the top card with an available item and craft it, scoring +1 VP. 
    _Start the game with one fewer item._
  Ranger - If you have three or more damaged items, slip into a random adjacent forest.
*/
export class VagaBot extends Bot {

  public name: BotName = 'Vagabond';

  public setupPosition = 'D';
  public setupRules = [
    `Place the keep token in a random corner clearing.`,

    `Place 1 warrior in each clearing, except the corner clearing diagonally opposite from the keep.
    Add an additional warrior to the clearing with the keep token. _(Place 12 warriors in total.)_`,

    `Place 1 sawmill, workshop and recruiter randomly among the clearings adjacent to the keep token.
    _(Place 3 in total. One per clearing.)_`
  ];

  public difficultyDescriptions = {
    Easy: `
In evening, refresh one fewer item.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
In evening, refresh one more item.
    `,
    Nightmare: `
In evening, refresh one more item.

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
      name: 'Hates Surprises',
      text: 'Ambush cards cannot be played against you.',
      isActive: true
    },
    {
      name: 'Lords of the Forest',
      text: 'You rule any clearings where you are tied in presence.',
      isActive: true
    },
    {
      name: 'Adventurer',
      text: `
You can **Battle** no more than once per turn.

At the end of Daylight, repeat **Quest** as many times as possible.
      `,
      canToggle: true
    },
    {
      name: 'Berserker',
      text: `
Whenever you **Battle**, instead move to the nearest clearing with the most pieces and target the player with the most pieces there.

In evening, repair one more item.
      `,
      canToggle: true
    },
    {
      name: 'Helper',
      text: `
Whenever you **Aid**, score one extra victory point, and the aided player draws two cards instead of one.
      `,
      canToggle: true
    },
    {
      name: 'Marksman',
      text: `
At the start of battle as attacker, deal an immediate hit _(scoring a point if you remove an enemy warrior)_.
      `,
      canToggle: true
    },
  ];

  public customData = {
    currentSuit: 'bird',

    decree: {
      fox: 0,
      mouse: 0,
      bunny: 0,
      bird: 0
    },

    buildings: []
  };

  public birdsong() {
    return [
      `Reveal an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`,
      `Add the order card to the matching Decree column.`
    ];
  }

  public daylight() {
    if (this.customData.currentSuit === 'bird') {
      return [
        `Battle in all clearings. _(Defender is the player with most pieces, then victory points.)_`,

        `Recruit two warriors in each of the two clearings you rule with lowest priority.
        If you only rule one clearing, place all four warriors there.`,

        `Build a building of the type with the most pieces on the map in a clearing you rule with the most Marquise Warriors.
        _(On a tie between sawmills and any other building types, place a sawmill.
          On a tie between workshops and recruiters but not sawmills, place a recruiter.)_`,

        `Move all but three of your warriors from each clearing to the adjacent clearing with the most enemy pieces.
        Then battle in each clearing you moved into.`
      ];
    }

    let building = '';
    if (this.customData.currentSuit === 'fox')   { building = 'sawmill'; }
    if (this.customData.currentSuit === 'bunny') { building = 'workshop'; }
    if (this.customData.currentSuit === 'mouse') { building = 'recruiter'; }

    return [
      `Battle in each ${this.customData.currentSuit} clearing. _(Defender is the player with most pieces, then victory points.)_`,

      `Recruit four warriors evenly spread across ${this.customData.currentSuit} clearings you rule.
      If you rule three ${this.customData.currentSuit} clearings, place the fourth warrior in the ${this.customData.currentSuit}
      clearing with the highest priority`,

      `Build a ${building} in a clearing you rule with the most Marquise warriors.`,

      `Move all but three of your warriors from each ${this.customData.currentSuit} clearing to the adjacent
      clearing with the most enemy pieces.`,

      `If you did not place a building this turn and have five or fewer buildings on the map, discard the order card,
      draw a new one, and repeat Daylight.`
    ];
  }

  public evening() {
    if (this.customData.currentSuit === 'bird') {
      return [
        `Score **vp:1** for each single most building on the board. Then discard order card(s).`
      ];
    }

    return [
      `Score **vp:1** for each building on the board matching ${this.customData.currentSuit} clearings. Then discard order card(s).`
    ];
  }
}
