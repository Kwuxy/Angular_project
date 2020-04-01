import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BattleComponent} from './battle/battle.component';
import {PokemonComponent} from './pokemon/pokemon.component';
import {MoveComponent} from "./move/move.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PokemonComponent,
        BattleComponent,
        MoveComponent
      ]
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
