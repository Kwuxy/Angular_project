import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BattleComponent } from './battle/battle.component';
import { MoveComponent } from './move/move.component';
import { LogColorDirective } from './battle/log-color.directive';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { BattleArenaComponent } from './battle-arena/battle-arena.component';
import { HpBarComponent } from './hp-bar/hp-bar.component';
import {PokemonService} from "./pokemon/pokemon.service";
import {BattleService} from "./battle/battle.service";
import {DatePipe, DecimalPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {UtilsService} from "./utils/utils.service";
import { PokemonSelectorComponent } from './pokemon-selector/pokemon-selector.component';
import {RouterModule, Routes} from "@angular/router";
import { PokemonSelectorListComponent } from './pokemon-selector-list/pokemon-selector-list.component';
import { PokemonSelectorTileComponent } from './pokemon-selector-tile/pokemon-selector-tile.component';

const routes: Routes = [
  { path: '', component: PokemonSelectorComponent },
  { path: 'battle/:firstPokemon/:secondPokemon',  component: BattleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    BattleComponent,
    MoveComponent,
    LogColorDirective,
    PokemonInfoComponent,
    BattleArenaComponent,
    HpBarComponent,
    PokemonSelectorComponent,
    PokemonSelectorListComponent,
    PokemonSelectorTileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PokemonService,
    BattleService,
    DatePipe,
    DecimalPipe,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
