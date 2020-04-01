import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BattleComponent} from './battle/battle.component';
import {PokemonComponent} from './pokemon/pokemon.component';
import {MoveComponent} from "./move/move.component";
import {PokemonInfoComponent} from "./pokemon-info/pokemon-info.component";
import {LogColorDirective} from "./battle/log-color.directive";
import {HpBarComponent} from "./hp-bar/hp-bar.component";
import {BattleArenaComponent} from "./battle-arena/battle-arena.component";
import {DatePipe, DecimalPipe} from "@angular/common";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      providers: [ DatePipe, DecimalPipe ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Project');
  });

});
