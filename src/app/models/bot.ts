

export type Item = 'Boot' | 'Coin' | 'Crossbow' | 'Hammer' | 'Sack' | 'Sword' | 'Tea' | 'Torch'
                 | 'Boot2' | 'Coin2'                       | 'Sack2' | 'Sword2' | 'Tea2';
export type Difficulty = 'Easy' | 'Normal' | 'Challenging' | 'Nightmare';

export interface Rule {
  name: string;
  text: string;
  isActive?: boolean;
  canToggle?: boolean;
}

export abstract class Bot {

  public abstract name: string;
  public abstract setupPosition: string;

  public setupHidden: boolean;

  public setupRules: string[] = [];
  public difficulty: Difficulty = 'Normal';
  public difficultyDescriptions: { [key in Difficulty]: string } = { Easy: '', Normal: '', Challenging: '', Nightmare: '' };
  public items: { [key in Item]?: boolean } = {};
  public rules: Rule[] = [];
  public vp = 0;

  constructor() {}
}

export class MarquiseBot extends Bot {

  public name = 'Marquise';

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

  public buildings = {
    fox: [],
    bunny: [],
    mouse: []
  };
}
