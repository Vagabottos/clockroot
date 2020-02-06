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

  public descriptions = {
    Tinker: `Search the discard pile for the top card with an available item and craft it, scoring +1 VP.
    _Start the game with one fewer item._`,
    Thief: 'Take a random card from the enemy in your clearing with most points there, then most pieces there.',
    Ranger: 'If you have three or more damaged items, slip into a random adjacent forest.'
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

  private actions(vaga: VagaBot) {
    return {
      explore() {
        return `Move to the nearest ruin, exhausting one item per move, then exhaust one item to take an item from that ruin.`;
      },

      quest(canBeModified = false) {
        return `
Move to the nearest clearing matching the quest, then exhaust any two items to discard the quest and
score **vp:1**. _(Ignore card text.)_ Then, replace the quest.

${canBeModified && vaga.hasTrait('Adventurer') ? 'Repeat this as many times as possible.' : ''}`;
      },

      aid() {
        const aidHelpText = vaga.hasTrait('Helper') ? 'twice ' : '';
        return `
Target the player in your clearing with any items and the least VP among those players.
Exhaust as many items as possible up to the number of items they have, take that many items from them, and
score ${aidHelpText}that many VP. Then, they draw ${aidHelpText}that many cards.`;
      },

      battle() {
        const target = vaga.hasTrait('Berserker') ? 'pieces' : 'VP';

        return `
Move to the nearest clearing with any pieces of the enemy with the most ${target}, then exhaust one item to battle
that player. Score **vp:1** per enemy warrior removed.
${!vaga.hasTrait('Adventurer') ? 'Repeat this action, exhausting two items per extra battle, as many times as possible.' : ''}

${vaga.hasTrait('Marksman') ? 'Deal an immediate hit in each battle.' : ''}

_(If target defender is in multiple clearings at equal distance, move to clearing where they have most buildings and
tokens, then fewest warriors.)_`;
      },

      repair() {
        return `If you have any damaged items, exhaust one item to repair one damaged item, unexhausted before exhausted.`;
      },

      special() {
        return `
Exhaust one item to do the following (skip if it would have no effect):

${vaga.descriptions[vaga.customData.chosenVaga] || 'no class chosen'}
        `;
      }
    };
  }

  public birdsong() {
    return [
      `Reveal an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`,
      `If you have two or fewer undamaged items, move to a random adjacent forest, then go to Evening.`
    ];
  }

  public daylight() {
    const actions = this.actions(this);

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

  public evening() {
    const itemRepairs = this.hasTrait('Berserker') ? 'two items' : 'one item';

    let itemRefreshMin = 'four';
    let itemRefreshMax = 'six';

    if (this.difficulty === 'Easy') {
      itemRefreshMin = 'three';
      itemRefreshMax = 'five';
    }

    if (this.difficulty === 'Challenging' || this.difficulty === 'Nightmare') {
      itemRefreshMin = 'five';
      itemRefreshMax = 'seven';
    }

    const base = [
      `If you have any damaged items, refresh ${itemRefreshMin} undamaged items. If you have none, refresh ${itemRefreshMax} instead.`,

      `If you are in a forest, repair all items. If not, repair ${itemRepairs}. Repair unexhausted items before exhausted items.`,

      `Discard the order card.`
    ];

    if (this.difficulty === 'Nightmare') {
      base.push(`Score **vp:1**.`);
    }

    return base;
  }
}
