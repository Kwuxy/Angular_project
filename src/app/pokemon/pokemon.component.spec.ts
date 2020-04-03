import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import {AppComponent} from "../app.component";
import {BattleComponent} from "../battle/battle.component";
import {LogColorDirective} from "../battle/log-color.directive";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {PokemonService} from "./pokemon.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterOutlet} from "@angular/router";
import {PokemonSelectorComponent} from "../pokemon-selector/pokemon-selector.component";
import {PokemonSelectorListComponent} from "../pokemon-selector-list/pokemon-selector-list.component";
import {PokemonSelectorRowComponent} from "../pokemon-selector-row/pokemon-selector-row.component";
import {PokemonSelectorTileComponent} from "../pokemon-selector-tile/pokemon-selector-tile.component";

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [
      PokemonComponent,
      PokemonInfoComponent,
      BattleComponent,
      LogColorDirective,
      HpBarComponent,
      BattleArenaComponent,
      PokemonSelectorComponent,
      PokemonSelectorListComponent,
      PokemonSelectorRowComponent,
      PokemonSelectorTileComponent
    ],
    imports: [HttpClientTestingModule]
  })));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.pokemon = service.createPokemonByName('gardevoir');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
