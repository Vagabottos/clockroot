
export type BotName = 'Marquise';

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

  constructor() {}

  public abstract name: BotName;
  public abstract setupPosition: string;

  public setupHidden: boolean;

  public setupRules: string[] = [];
  public difficulty: Difficulty = 'Normal';
  public difficultyDescriptions: { [key in Difficulty]: string } = { Easy: '', Normal: '', Challenging: '', Nightmare: '' };
  public items: { [key in Item]?: boolean } = {};
  public rules: Rule[] = [];
  public vp = 0;

  public customData: any = {};

  public abstract daylight(): string[];
  public abstract birdsong(): string[];
  public abstract evening(): string[];
}
