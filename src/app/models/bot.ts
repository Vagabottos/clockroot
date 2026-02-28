import { TranslateService } from '@ngx-translate/core';
import { MetaData } from '../paragraph/paragraph.component';

export type BotName = 'Eyrie' | 'Marquise' | 'Woodland' | 'Vagabond' //Add your BotName here
                    | 'EyrieDC' | 'MarquiseDC' | 'WoodlandDC' | 'VagabondDC'
                    | 'Duchy' | 'Lizard' | 'Corvid' | 'Riverfolk'
                    | 'Legion';

export type Item = 'Boot'  | 'Coin'  | 'Crossbow'  | 'Hammer'  | 'Sack'  | 'Sword'  | 'Tea'  | 'Torch'
                 | 'Boot2' | 'Coin2'                           | 'Sack2' | 'Sword2' | 'Tea2'

                 // fucking vagabonds
                 | 'Boot3' | 'Coin3' | 'Crossbow2' | 'Hammer2' | 'Sack3' | 'Sword3' | 'Tea3' | 'Torch2'
                 | 'Boot4'           | 'Crossbow3' | 'Hammer3' | 'Sack4' | 'Sword4'          | 'Torch3'
                 | 'Boot5'                         | 'Hammer4'           | 'Sword5'
                 | 'Boot6'                                               | 'Sword6'
                 | 'Boot7'                                               | 'Sword7';
export type Difficulty = 'Easy' | 'Normal' | 'Challenging' | 'Nightmare';

export interface Rule {
  name: string;
  text: string;
  traitName: string;
  isActive?: boolean;
  canToggle?: boolean;
}

export abstract class Bot {

  constructor() {}

  public abstract name: BotName;
  public abstract setupPosition: string;

  public traitHash: { [key: string]: boolean } = {};
  public setupHidden: boolean;

  public setupRules: string[] = [];
  public difficulty: Difficulty = 'Normal';
  public difficultyDescriptions: { [key in Difficulty]: string } = { Easy: '', Normal: '', Challenging: '', Nightmare: '' };
  public items: { [key in Item]?: boolean } = {};
  public rules: Rule[] = [];
  public vp = 0;

  public customData: any = {};

  public abstract setup(): void;
  public abstract daylight(translate: TranslateService): MetaData[];
  public abstract birdsong(translate: TranslateService): MetaData[];
  public abstract evening(translate: TranslateService): MetaData[];

  public hasTrait(trait: string): boolean {
    if (!this.traitHash) { return false; }
    return this.traitHash[trait];
  }

  public addVP(addend: number): void {
    this.vp = this.vp + addend;
  }

  protected createMetaData(metatype: string, metaval: any, metatext: string): MetaData {
    let obj = {
      text: metatext,
      type: metatype, 
      value: metaval
    }
    return obj
  }
}
