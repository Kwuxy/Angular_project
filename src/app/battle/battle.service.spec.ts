import {async, TestBed} from '@angular/core/testing';

import { BattleService } from './battle.service';
import {PokemonComponent} from "../pokemon/pokemon.component";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {BattleComponent} from "./battle.component";
import {LogColorDirective} from "./log-color.directive";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {PokemonService} from "../pokemon/pokemon.service";
import {Battle} from "./battle";
import {Pokemon} from "../pokemon/pokemon";
import {DatePipe, DecimalPipe} from "@angular/common";

describe('BattleService', () => {
  let pokemonService: PokemonService;
  let battleService: BattleService;
  let battle: Battle;

  let milobellus: Pokemon;
  let gardevoir: Pokemon;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonComponent,
        PokemonInfoComponent,
        BattleComponent,
        LogColorDirective,
        HpBarComponent,
        BattleArenaComponent
      ],
      providers: [ DatePipe, DecimalPipe ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pokemonService = TestBed.inject(PokemonService);
    battleService = TestBed.inject(BattleService);
  });

  beforeEach(() => {
    milobellus = pokemonService.createPokemonByName('Milobellus');
    gardevoir = pokemonService.createPokemonByName('Gardevoir');
    battle = new Battle([milobellus, gardevoir]);
  });

  it('should be created', () => {
    expect(battleService).toBeTruthy();
  });

  it('Should return pokemon is alive', () => {
    expect(battleService.pokemonIsAlive(milobellus)).toBe(true);
  });

  it('Should return pokemon is not alive', () => {
    milobellus.hp = 0;
    expect(battleService.pokemonIsAlive(milobellus)).toBe(false);
  });

  it('Should return all pokemons are alive', () => {
    expect(battleService.allPokemonsAreAlive(battle.fighters)).toBe(true);
  });

  it('Should return all pokemons are alive when a pokemon has 0 hp', () => {
    milobellus.hp = 0;
    expect(battleService.allPokemonsAreAlive(battle.fighters)).toBe(false);
  });

  it('Should return all pokemons are alive when both pokemons have 0 hp', () => {
    milobellus.hp = 0;
    gardevoir.hp = 0;
    expect(battleService.allPokemonsAreAlive(battle.fighters)).toBe(false);
  });

  it('gardevoir should win', () => {
    battleService.playMatch(battle).then(pokemon => expect(pokemon).toBe(gardevoir));
  });

  it('milobellus should win when it get drugs', () => {
    milobellus.hp = 9999;
    battleService.playMatch(battle).then(pokemon => expect(pokemon).toBe(milobellus));
  });

  // it('should render date as medium with pipe', () => {
  //   const date: Date = new Date(2020, 4, 1, 20, 12, 30);
  //   battleService.playMatch(battle).then(result => expect(battle.actions[0]).toEqual("The match begins atfzefezfez2, 2020, 20:12:30 PM"));
  // });

});
