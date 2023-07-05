export const FactionTypes: string[] = ['sacred-dawn', 'shadow-tribes', 'mystic-dominion', 'mechanic-league', 'obsidian-eclipse', 'blood-cult', 'neutral'];
export type Faction = typeof FactionTypes[number];
// export const ResourceType = ['gold', 'r', 'g', 'b'] as const;
// export type Resource = typeof ResourceType[number];
export const MinionTypes: string[] = ['angel', 'beast', 'demon', 'dragon', 'dwarf', 'elf', 'fairy', 'goblin', 'human', 'merfolk', 'orc', 'undead', 'vampire', 'werewolf', 'witch', 'elemental', 'knight'];
export type Minion = typeof MinionTypes[number];
// export const Rarities: string[] = ["basic", "common", "rare", "epic", "legendary"];
// export type Rarity = typeof Rarities[number];

// export const MinionTypesRelations = {
//   angel: {
//     stronger: ['demon'],
//     weaker: ['undead']
//   },
//   beast: {
//     stronger: ['human'],
//     weaker: ['dragon']
//   },
//   demon: {
//     stronger: ['undead'],
//     weaker: ['human']
//   },
//   dragon: {
//     stronger: ['beast'],
//     weaker: ['undead']
//   },
//   dwarf: {
//     stronger: ['elf'],
//     weaker: ['orc']
//   },
//   elf: {
//     stronger: ['orc'],
//     weaker: ['dwarf']
//   },
//   fairy: {
//     stronger: ['dragon'],
//     weaker: ['beast']
//   },
//   goblin: {
//     stronger: ['elf'],
//     weaker: ['dwarf']
//   },
//   human: {
//     stronger: ['dragon'],
//     weaker: ['demon']
//   },
//   merfolk: {
//     stronger: ['orc'],
//     weaker: ['demon']
//   },
//   orc: {
//     stronger: ['dwarf'],
//     weaker: ['elf']
//   },
//   undead: {
//     stronger: ['demon'],
//     weaker: ['beast']
//   },
//   vampire: {
//     stronger: ['human'],
//     weaker: ['angel']
//   },
//   werewolf: {
//     stronger: ['beast'],
//     weaker: ['fairy']
//   },
//   witch: {
//     stronger: ['demon'],
//     weaker: ['undead']
//   },
//   elemental: {
//     stronger: ['undead'],
//     weaker: ['human']
//   },
//   knight: {
//     stronger: ['dragon'],
//     weaker: ['orc']
//   }
// };

// export const ModifiedMinionTypes: Record<MinionType, MinionTypeInfo> = Object.entries(MinionTypesRelations).reduce((acc, [key, value]) => {
//   acc[key as MinionType] = {
//     stronger: value.stronger as MinionType[],
//     weaker: value.weaker as MinionType[]
//   };
//   return acc;
// }, {} as Record<MinionType, MinionTypeInfo>);

// export const SortedMinionTypes = Object.fromEntries(
//   Object.entries(MinionTypesRelations).sort()
// ) as typeof MinionTypesRelations;

// export interface Bonus {
//   name: string;
//   value: number;
// }

export class Card {
  id: number = 0;
  title: string = '';
  faction: Faction = 'neutral';
  cost: number[] = [0, 0, 0, 0];
  front: string = '';
  back: string = '';
  frame: string = '';
  atk: number = 0;
  atkImg: string = '';
  rAtk: number = 0;
  rAtkImg: string = '';
  hp: number = 0;
  hpImg: string = '';
  effect: string = '';
  effectType: string = '';
  lore: string = '';
  requiredAge: number = 0;
  minionType: Minion = 'angel';
  rarity: string = '';
  codeName: string = '';
  creationDate: string = '';
  modificationDate: string = '';

  constructor(
    id: number,
    title: string,
    faction: Faction,
    minionType: Minion,
    rarity: string,
    cost: number[],
    front: string,
    back: string,
    frame: string,
    atk: number,
    atkImg: string,
    rAtk: number,
    rAtkImg: string,
    hp: number,
    hpImg: string,
    effect: string,
    effectType: string,
    lore: string,
    creationDate: string,
    modificationDate: string
  ) {
    this.id = id;
    this.title = title;
    this.faction = faction;
    this.minionType = minionType;
    this.rarity = rarity;
    this.cost = cost;
    this.front = front;
    this.back = back;
    this.frame = frame;
    this.atk = atk;
    this.atkImg = atkImg;
    this.rAtk = rAtk;
    this.rAtkImg = rAtkImg;
    this.hp = hp;
    this.hpImg = hpImg;
    this.effect = effect;
    this.effectType = effectType;
    this.lore = lore;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
  }
}

const randomCard = new Card(
  1, // You can provide a unique identifier or generate it randomly as well
  'title',
  'neutral',
  'angel',
  'basic',
  [0, 0, 0],
  'front',
  'back',
  'frame',
  0,
  'atkImg',
  0,
  'rAtkImg',
  0,
  'hpImg',
  'effect',
  'effectType',
  'lore',
  'creationDate',
  'modificationDate'
);

console.log(randomCard);
