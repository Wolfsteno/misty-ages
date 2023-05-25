class Card {
    faction: '1' | '2' | '3' | '4' | '5';
    type: 'action' | 'pj' | 'building';
    name: string;
    description: string;
    effect: string;
    atk: number;
    def: number;
    cost: {
        resource1: number;
        resource2: number;
        resource3: number;
        resource4: number;
        resource5: number;
    };
    image: string;

    constructor(
        faction: '1' | '2' | '3' | '4' | '5',
        type: 'action' | 'pj' | 'building',
        name: string,
        description: string,
        effect: string,
        atk: number,
        def: number,
        cost: {
            resource1: number;
            resource2: number;
            resource3: number;
            resource4: number;
            resource5: number;
        },
        image: string
    ) {
        this.faction = faction;
        this.type = type;
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.atk = atk;
        this.def = def;
        this.cost = cost;
        this.image = image;
    }
}
