import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleArenaComponent } from './battle-arena.component';
import {AppComponent} from "../app.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {BattleComponent} from "../battle/battle.component";
import {MoveComponent} from "../move/move.component";
import {LogColorDirective} from "../battle/log-color.directive";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {Pokemon} from "../pokemon/pokemon";
import {PokemonService} from "../pokemon/pokemon.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('BattleArenaComponent', () => {
  let component: BattleArenaComponent;
  let fixture: ComponentFixture<BattleArenaComponent>;
  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      PokemonComponent,
      PokemonInfoComponent,
      BattleComponent,
      MoveComponent,
      LogColorDirective,
      HpBarComponent,
      BattleArenaComponent
    ],
    imports: [HttpClientTestingModule]
  })));

  beforeEach(() => {
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BattleArenaComponent);
    component = fixture.componentInstance;
    component.fighters = [
      service.createPokemonByName('gardevoir'),
      service.createPokemonByName('milotic')
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
