import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorListComponent } from './pokemon-selector-list.component';
import {PokemonSelectorRowComponent} from "../pokemon-selector-row/pokemon-selector-row.component";
import {PokemonSelectorTileComponent} from "../pokemon-selector-tile/pokemon-selector-tile.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PokemonService} from "../pokemon/pokemon.service";

describe('PokemonSelectorListComponent', () => {
  let component: PokemonSelectorListComponent;
  let fixture: ComponentFixture<PokemonSelectorListComponent>;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectorListComponent, PokemonSelectorRowComponent, PokemonSelectorTileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorListComponent);
    pokemonService = TestBed.inject(PokemonService);
    component = fixture.componentInstance;
    component.pokemons = [pokemonService.createPokemonByName('milotic'), pokemonService.createPokemonByName('gardevoir')];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
