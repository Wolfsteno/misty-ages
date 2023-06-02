export const FactionTypes = ['neutral', 'mystic-dominion', 'mechanic-league', 'blood-cult', 'dragon-clan', 'shadow-tribes'] as const;
export type Faction = typeof FactionTypes[number];

export const ResourceType = ['coal-ash', 'dragon-scales', 'eterium', 'shadow-tribes', 'vital-essence', 'sacred-dawn', 'obsidian-elcipse',] as const;
export type Resource = typeof ResourceType[number];

export const MinionTypes = [
    'beast',
    'human',
    'demon',
    'vampire',
    'werewolf',
    'fairy',
    'crossbreed',
    'elemental',
    'undead',
    'automat',
    'angel',
    'spirit',
    'goblin',
    'giant',
    'merfolk',
    'elf',
    'dwarf',
    'lifeless',
    'zombie',
    'dragon'
] as const;

export type MinionType = typeof MinionTypes[number];

export interface Bonus {
    name: string;
    value: number;
}

export class Card {
    id: number = 0;
    title: string = '';
    faction: Faction = 'neutral';
    cost: number[] = [0, 0, 0, 0, 0, 0];
    front: string = '';
    back: string = '';
    frame: string = '';
    atk: number = 0;
    hp: number = 0;
    effect: string = '';
    effectType: string = '';
    description: string = '';
    requiredAge: number = 0;
    type: MinionType[] = [];
    isDead: boolean = false;
    isDiscarted: boolean = false;
    isDestroyed: boolean = false;
    bonuses: Bonus[] = [];
    codeName: string = '';
    creationDate: string = '';
    modificationDate: string = '';

    constructor(
        id: number,
        title: string,
        faction: Faction,
        cost: number[],
        front: string,
        back: string,
        frame: string,
        atk: number,
        hp: number,
        effect: string,
        effectType: string,
        description: string,
        requiredAge: number,
        type: MinionType[],
        isDead: boolean,
        isDiscarted: boolean,
        isDestroyed: boolean,
        bonuses: Bonus[],
        codeName: string,
        creationDate: string,
        modificationDate: string
    ) {
        this.id = id;
        this.title = title;
        this.faction = faction;
        this.cost = cost;
        this.front = front;
        this.back = back;
        this.frame = frame;
        this.atk = atk;
        this.hp = hp;
        this.effect = effect;
        this.effectType = effectType;
        this.description = description;
        this.requiredAge = requiredAge;
        this.type = type;
        this.isDead = isDead;
        this.isDiscarted = isDiscarted;
        this.isDestroyed = isDestroyed;
        this.bonuses = bonuses;
        this.codeName = codeName;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
    }
}