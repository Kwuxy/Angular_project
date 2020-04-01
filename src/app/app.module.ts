import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BattleComponent } from './battle/battle.component';
import { MoveComponent } from './move/move.component';
import { LogColorDirective } from './battle/log-color.directive';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    BattleComponent,
    MoveComponent,
    LogColorDirective,
    PokemonInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
