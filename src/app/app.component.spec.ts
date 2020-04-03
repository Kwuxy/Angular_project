import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BattleComponent} from './battle/battle.component';
import {PokemonComponent} from './pokemon/pokemon.component';
import {PokemonInfoComponent} from "./pokemon-info/pokemon-info.component";
import {LogColorDirective} from "./battle/log-color.directive";
import {HpBarComponent} from "./hp-bar/hp-bar.component";
import {BattleArenaComponent} from "./battle-arena/battle-arena.component";
import {APP_BASE_HREF, DatePipe, DecimalPipe} from "@angular/common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PokemonSelectorComponent} from "./pokemon-selector/pokemon-selector.component";
import {PokemonSelectorListComponent} from "./pokemon-selector-list/pokemon-selector-list.component";
import {PokemonSelectorRowComponent} from "./pokemon-selector-row/pokemon-selector-row.component";
import {PokemonSelectorTileComponent} from "./pokemon-selector-tile/pokemon-selector-tile.component";
import {RouterTestingModule} from "@angular/router/testing";

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
      LogColorDirective,
      HpBarComponent,
      BattleArenaComponent,
      PokemonSelectorComponent,
      PokemonSelectorListComponent,
      PokemonSelectorRowComponent,
      PokemonSelectorTileComponent
    ],
    providers: [ DatePipe, DecimalPipe],
    imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
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
