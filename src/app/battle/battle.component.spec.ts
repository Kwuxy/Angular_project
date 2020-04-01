import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import {AppComponent} from "../app.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {MoveComponent} from "../move/move.component";
import {Pokemon} from "../pokemon/pokemon";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {LogColorDirective} from "./log-color.directive";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {PokemonService} from "../pokemon/pokemon.service";
import {BattleService} from "./battle.service";
import {DatePipe, DecimalPipe} from "@angular/common";

describe('BattleComponent', () => {
  let battleComponent: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let view: any;
  let pokemonService: PokemonService;
  let battleService: BattleService;

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
      providers: [
        DatePipe, DecimalPipe
      ]
    })
    .compileComponents();

    pokemonService = TestBed.inject(PokemonService);
    battleService = TestBed.inject(BattleService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    battleComponent = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    milobellus = pokemonService.createPokemonByName('Milobellus');
    gardevoir = pokemonService.createPokemonByName('Gardevoir');
    battleComponent.fighters = [milobellus, gardevoir];
  });

  it('should create', () => {
    expect(battleComponent).toBeTruthy();
  });

  it('should grey out pause button when finished', () => {
    battleComponent.battle.isFinished = true;
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
    expect(battleComponent.battle.isPaused).toBe(false);
  });

  it('should reset HP when resetting game', () => {
    let initialHP = battleComponent.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp;
    battleComponent.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp = 0;
    view.querySelector('#reset_button').click();
    fixture.detectChanges();
    expect(battleComponent.fighters.filter(pokemon => pokemon.name === "Milobellus")[0].hp).toBe(initialHP);
  });
});
