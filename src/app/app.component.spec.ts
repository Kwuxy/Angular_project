import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BattleComponent} from './battle/battle.component';
import {PokemonComponent} from './pokemon/pokemon.component';
import {MoveComponent} from "./move/move.component";
import {PokemonInfoComponent} from "./pokemon-info/pokemon-info.component";
import {LogColorDirective} from "./battle/log-color.directive";
import {HpBarComponent} from "./hp-bar/hp-bar.component";
import {BattleArenaComponent} from "./battle-arena/battle-arena.component";
import {DatePipe, DecimalPipe} from "@angular/common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Test} from "tslint";

describe('AppComponent', () => {
  let http: HttpTestingController;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

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
    providers: [ DatePipe, DecimalPipe ],
    imports: [HttpClientTestingModule]
  })));

  beforeEach(() => {
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Project'`, () => {
    expect(app.title).toEqual('Project');
  });

});
