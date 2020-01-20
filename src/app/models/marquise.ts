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
Recruit one less warrior during the Recruit action.

**card:bird** Recruit one more warrior in the clearing with the lowest priority.
    `,
    Nightmare: `
Recruit one less warrior during the Recruit action.

**card:bird** Recruit one less warrior in the clearing with the lowest priority.

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
        `Battle in all clearings.`,

        `Recruit 2 warriors in each of the 2 clearings you rule with lowest priority.
        Gain **vp:1** for every 2 warriors that could not be recruited.
        _(Defender is the player with most pieces, then victory points, then highest priority setup.)_`,

        `Build 1 building type with most pieces already on the board in a clearing you rule.
        _(If tied, prioritize in this order: Fox, Bunny, Mouse. Clearing with most of your warriors first, then clearing priority.)_`,

        `Move all but 3 of your warriors from all clearings. After completing all moves, battle in all destination clearings.
        _(Destination is adjacent clearing with most enemies pieces first, then highest clearing priority.)_`,

        `Escalate if no building was placed due to no available slot on the board and there are less than
        4 buildings of that type on the board.
        Reveal a new order card and repeat Daylight (once per turn).`
      ];
    }

    let building = '';
    if (this.customData.currentSuit === 'fox')   { building = 'sawmill'; }
    if (this.customData.currentSuit === 'bunny') { building = 'workshop'; }
    if (this.customData.currentSuit === 'mouse') { building = 'recruiter'; }

    return [
      `Battle in ${this.customData.currentSuit} clearings.`,

      `Recruit 4 warriors evenly spread across ${this.customData.currentSuit} clearings you rule.
      _(Defender is the player with most pieces, then victory points, then highest priority setup.)_`,

      `Build 1 ${building} in a clearing you rule.
      _(If tied, prioritize in this order: Fox, Bunny, Mouse. Clearing with most of your warriors first, then clearing priority.)_`,

      `Move all but 3 of your warriors from ${this.customData.currentSuit} clearings.
      _(Destination is adjacent clearing with most enemies pieces first, then highest clearing priority.)_`,

      `Escalate if no building was placed due to no available slot on the board and there are less than
      4 buildings of that type on the board.
      Reveal a new order card and repeat Daylight (once per turn).`
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
