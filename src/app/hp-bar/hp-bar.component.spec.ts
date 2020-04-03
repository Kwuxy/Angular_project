import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpBarComponent } from './hp-bar.component';
import {AppComponent} from "../app.component";
import {PokemonComponent} from "../pokemon/pokemon.component";
import {PokemonInfoComponent} from "../pokemon-info/pokemon-info.component";
import {BattleComponent} from "../battle/battle.component";
import {LogColorDirective} from "../battle/log-color.directive";
import {BattleArenaComponent} from "../battle-arena/battle-arena.component";
import {RouterOutlet} from "@angular/router";
import {PokemonSelectorComponent} from "../pokemon-selector/pokemon-selector.component";
import {PokemonSelectorListComponent} from "../pokemon-selector-list/pokemon-selector-list.component";
import {PokemonSelectorRowComponent} from "../pokemon-selector-row/pokemon-selector-row.component";
import {PokemonSelectorTileComponent} from "../pokemon-selector-tile/pokemon-selector-tile.component";

describe('HpBarComponent', () => {
  let component: HpBarComponent;
  let fixture: ComponentFixture<HpBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        PokemonComponent,
        PokemonInfoComponent,
        BattleComponent,
        LogColorDirective,
        HpBarComponent,
        BattleArenaComponent,
        PokemonSelectorComponent,
        PokemonSelectorListComponent,
        PokemonSelectorRowComponent,
        PokemonSelectorTileComponent,
        RouterOutlet
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
