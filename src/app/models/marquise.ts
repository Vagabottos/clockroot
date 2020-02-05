import { Bot, BotName } from './bot';

export class MarquiseBot extends Bot {

  public name: BotName = 'Marquise';

  public setupPosition = 'A';
  public setupRules = [
    `Place the keep token in a random corner clearing.`,

    `Place 1 warrior in each clearing, except the corner clearing diagonally opposite from the keep.
    Add an additional warrior to the clearing with the keep token. _(Place 12 warriors in total.)_`,

    `Place 1 sawmill, workshop and recruiter randomly among the clearings adjacent to the keep token.
    _(Place 3 in total. One per clearing.)_`
  ];

  public difficultyDescriptions = {
    Easy: `
Recruit one less warrior during the Recruit action.

**card:bird** Recruit one less warrior in the clearing with the 2nd lowest priority.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
Recruit one more warrior during the Recruit action.

**card:bird** Recruit one more warrior in the clearing with the lowest priority.
    `,
    Nightmare: `
Recruit one more warrior during the Recruit action.

**card:bird** Recruit one more warrior in the clearing with the lowest priority.

Each round score **vp:1** per player.
    `
  };

  public rules = [
    {
      name: 'Poor Manual Dexterity',
      text: `The Mechanical Marquise has no hand of cards. It cannot discard cards.
      If a player is prompted to take a card from the Mechanical Marquise, they draw a card instead.
      If prompted to give it a card, discard the card, and it scores **vp:1**.`,
      isActive: true
    },
    {
      name: 'Hates Surprises',
      text: 'Ambush cards cannot be played against bots.',
      isActive: true
    },
    {
      name: 'The Keep',
      text: 'Only you can place pieces in the clearing with the keep token.',
      isActive: true
    },
    {
      name: 'Blitz',
      text: `
After your Move action select the highest priority clearing you rule without any enemy pieces.

Move all but one warrior from the clearing and battle in the destination if opponents are present.
      `,
      canToggle: true
    },
    {
      name: 'Fortified',
      text: `
Opponents require two Hits to destroy each of your buildings.

Assigning a single Hit to a building has no effect.
      `,
      canToggle: true
    },
    {
      name: 'Iron Will',
      text: 'Escalate may be triggered twice per turn.',
      canToggle: true
    },
    {
      name: 'Hospitals',
      text: `After each battle as Defender in which you lost at least 2 warriors,
      immediately recruit 1 warrior in the clearing with the keep token.`,
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

  public birdsong() {
    return [
      `Reveal the top card of the deck as an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`
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
    const buildings = this.customData.buildings;

    if (this.customData.currentSuit === 'bird') {

      const scores = ['fox', 'mouse', 'bunny'].map(suit => {
        return buildings[suit].reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1;
      });

      const maxScore = Math.max(...scores, 0);

      return [
        `Score ${maxScore} VP.`,
        `Discard the order card.`
      ];
    }

    const buildingsOfSuit = buildings[this.customData.currentSuit];

    const score = Math.max(0, buildingsOfSuit.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    return [
      `Score ${score} VP.`,
      `Discard the order card.`
    ];
  }
}
