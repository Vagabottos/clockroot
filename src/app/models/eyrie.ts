import { Bot, BotName } from './bot';

export class EyrieBot extends Bot {

  public name: BotName = 'Eyrie';

  public setupPosition = 'B';
  public setupRules = [
    `Form a supply of 20 warriors near you.`,

    `Place 1 roost and 6 warriors in the corner clearing diagonally opposite from the clearing with the keep token.
    If the Marquise is not playing, place those pieces in a random corner clearing.`,

    `Tuck your 2 Loyal Vizier cards, showing their suit, into the rightmost Decree column.`,
  ];

  public difficultyDescriptions = {
    Easy: `
During setup, add only one Loyal Vizier to the Decree.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
During setup, take one bird Ambush from the deck and add it to the bird column of the Decree.
    `,
    Nightmare: `
During setup, take one bird Ambush from the deck and add it to the bird column of the Decree.

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
      name: 'Nobility',
      text: `
You now fall into turmoil if you cannot place a roost or a warrior.

Whenever you fall into turmoil, you do not lose victory points. Instead, you score one victory point per bird card in the Decree.
      `,
      canToggle: true
    },
    {
      name: 'Relentless',
      text: `
After resolving the Decree, remove all defenseless buildings and tokens in any clearing with Eyrie warriors.
      `,
      canToggle: true
    },
    {
      name: 'Swoop',
      text: `
At the end of Daylight, place two warriors in the clearing of highest priority with no Eyrie pieces.
      `,
      canToggle: true
    },
    {
      name: 'War Tax',
      text: `
Whenever you remove an enemy building or token, its owner loses one victory point.
      `,
      canToggle: true
    },
  ];

  public customData = {
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
    const actions = [];

    let mostVal = 0;
    let mostSuit = '';
    ['fox', 'mouse', 'bunny', 'bird'].forEach(suit => {
      if (this.customData.decree[suit] <= mostVal) { return; }

      mostVal = this.customData.decree[suit];
      mostSuit = suit;
    });

    ['fox', 'mouse', 'bunny', 'bird'].forEach(suit => {
      const totalForSuit = this.customData.decree[suit];
      if (totalForSuit === 0) { return; }

      const suitText = suit === 'bird' ? 'any' : `**card:${suit}**`;

      actions.push(`
Recruit ${totalForSuit} warrior(s) in a ${suitText} clearing with a roost.

_(**Ties**: Recruit in such a clearing with the most enemy pieces, then fewest Eyrie warriors, then lowest priority.)_
      `);

      actions.push(`
Move from the ${suitText} clearing you rule of highest priority.
Move to the adjacent clearing with the fewest enemy pieces.
Leave warriors to exactly rule the origin or ${totalForSuit}, whichever is higher.

_(**Destination Ties**: Move to such a clearing with no roost, then fewest enemy warriors, then lowest priority.)_
      `);

      actions.push(`
Battle in a ${suitText} clearing against the player with the most buildings there.
${suit === mostSuit ? '**Deal an extra hit.**' : '' }

_(**Clearing Ties**: Battle in such a clearing with no roost, then most defenseless buildings and tokens of the same player.)_

_(**Defender Ties**: Battle such a player with the most pieces here.)_
      `);
    });

    return actions;
  }

  public evening() {

    const score = Math.max(0, this.customData.buildings.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    return [
      `Score ${score} VP.`
    ];
  }
}
