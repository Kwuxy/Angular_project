import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInfoComponent } from './pokemon-info.component';
import {AppComponent} from "../app.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {BattleComponent} from "../battle/battle.component";
import {MoveComponent} from "../move/move.component";
import {LogColorDirective} from "../battle/log-color.directive";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {Pokemon} from "../pokemon/pokemon";
import {PokemonService} from "../pokemon/pokemon.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('PokemonInfoComponent', () => {
  let component: PokemonInfoComponent;
  let fixture: ComponentFixture<PokemonInfoComponent>;
  let view: any;
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
    fixture = TestBed.createComponent(PokemonInfoComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    component.pokemon = service.createPokemonByName('gardevoir');
    component.pokemon.hp = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    expect(view.textContent).toContain('gardevoir');
  });

  it('should display hp', () => {
    expect(view.textContent).toContain(100);
  });
});
