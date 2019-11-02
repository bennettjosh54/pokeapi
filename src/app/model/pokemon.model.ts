import {Abilities} from './abilities.model';
import {Forms} from './forms.model';
import {GameIndicies} from './game-indicies.model';
import {HeldItems} from './held-items/held-items.model';
import {Moves} from './moves/moves.model';
import {Stats} from './stats.model';
import {Types} from './types.model';
import {Species} from './species/species.model';

export class Pokemon {

    abilities: [Abilities];
    baseExperience: number;
    forms: Forms[];
    gameIndicies: GameIndicies[];
    height: number;
    heldItems: HeldItems[];
    id: number;
    isDefault: boolean;
    locationAreaEncounters: string;
    moves: Moves[];
    name: string;
    order: number;
    species: Species;
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
    };
    stats: Stats[];
    types: Types[];
    weight: number;
}