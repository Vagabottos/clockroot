import { Bot, BotName } from './bot';

export class VagaBot extends Bot {

  public name: BotName = 'Vagabond';

  public setupPosition = 'D';
  public setupRules = [
    `Place the Vagabot pawn in the forest adjacent to the most clearings. If there are multiple such forests, decide randomly among those.`,

    `Shuffle the quest deck, draw 1 quest card, and place it face up near you. This quest can only be completed by the bot.`,

    `Place any 1 item marked "R" beneath each ruin on the map.`,

    `Take any 4 items marked "S" and place them in your Satchel. _(The Tinker starts with 3 items instead of 4 items.)_`
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
      name: 'Lone Wanderer',
      text: 'Your pawn is not a warrior and cannot be removed from the map.',
      isActive: true
    },
    {
      name: 'Nimble',
      text: 'You can move regardless of who rules your clearing.',
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
    chosenVaga: '',

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
      `If you have two or fewer undamaged items, move to a random adjacent forest, then go to Evening.`
    ];
  }

  public daylight() {
    return [];
  }

  public evening() {
    return [
      `If you have any damaged items, refresh four undamaged items. If you have none, refresh six instead.`,

      `If you are in a forest, repair all items. If not, repair one item. Repair unexhausted items before exhausted items.`,

      `Discard the order card.`
    ];
  }
}
