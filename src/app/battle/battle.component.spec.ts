import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import {AppComponent} from "../app.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {MoveComponent} from "../move/move.component";
import {Pokemon} from "../pokemon/pokemon";

describe('BattleComponent', () => {
  let battle: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let view: any;

  let milobellus: Pokemon;
  let gardevoir: Pokemon;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PokemonComponent,
        BattleComponent,
        MoveComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battle = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    milobellus = Pokemon.createPokemonByName('Milobellus');
    gardevoir = Pokemon.createPokemonByName('Gardevoir');
    battle.fighters = [milobellus, gardevoir];
  });

  it('should create', () => {
    expect(battle).toBeTruthy();
  });

  test('Should return pokemon is alive', () => {
    expect(battle.pokemonIsAlive(milobellus)).toBe(true);
  });

  test('Should return pokemon is not alive', () => {
    milobellus.hp = 0;
    expect(battle.pokemonIsAlive(milobellus)).toBe(false);
  });

  test('Should return all pokemons are alive', () => {
    expect(battle.allPokemonsAreAlive()).toBe(true);
  });

  test('Should return all pokemons are alive when a pokemon has 0 hp', () => {
    milobellus.hp = 0;
    expect(battle.allPokemonsAreAlive()).toBe(false);
  });

  test('Should return all pokemons are alive when both pokemons have 0 hp', () => {
    milobellus.hp = 0;
    gardevoir.hp = 0;
    expect(battle.allPokemonsAreAlive()).toBe(false);
  });

  test('gardevoir should win', () => {
    battle.playMatch().then(pokemon => expect(pokemon).toBe(gardevoir));
  });

  test('milobellus should win when it get drugs', () => {
    milobellus.hp = 9999;
    battle.playMatch().then(pokemon => expect(pokemon).toBe(milobellus));
  });

  it('should grey out pause button when finished', () => {
    battle.isFinished = true;
    fixture.detectChanges();
    expect(view.querySelector('#play_pause_button').disabled).toBe(true);
  });

  it('play_pause_button content should be Pause when click on play', () => {
    view.querySelector('#play_pause_button').click();
    fixture.detectChanges();
    expect(view.querySelector('#play_pause_button').textContent).toBe('Pause');
  });

  it('Pause props content should be false when click on play', () => {
    view.querySelector('#play_pause_button').click();
    fixture.detectChanges();
    expect(battle.isPaused).toBe(false);
  });

  it('should reset HP when resetting game', () => {
    let initialHP = battle.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp;
    battle.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp = 0;
    view.querySelector('#reset_button').click();
    fixture.detectChanges();
    expect(battle.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp).toBe(initialHP);
  });
});
