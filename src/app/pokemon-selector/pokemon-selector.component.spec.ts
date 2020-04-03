import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorComponent } from './pokemon-selector.component';
import {PokemonSelectorListComponent} from "../pokemon-selector-list/pokemon-selector-list.component";
import {PokemonSelectorTileComponent} from "../pokemon-selector-tile/pokemon-selector-tile.component";
import {PokemonSelectorRowComponent} from "../pokemon-selector-row/pokemon-selector-row.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {BattleComponent} from "../battle/battle.component";
import {LogColorDirective} from "../battle/log-color.directive";
import {HpBarComponent} from "../hp-bar/hp-bar.component";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('PokemonSelectorComponent', () => {
  let component: PokemonSelectorComponent;
  let fixture: ComponentFixture<PokemonSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
