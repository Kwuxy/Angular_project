import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorTileComponent } from './pokemon-selector-tile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PokemonService} from "../pokemon/pokemon.service";

describe('PokemonSelectorTileComponent', () => {
  let component: PokemonSelectorTileComponent;
  let fixture: ComponentFixture<PokemonSelectorTileComponent>;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectorTileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorTileComponent);
    pokemonService = TestBed.inject(PokemonService);
    component = fixture.componentInstance;
    component.pokemon = pokemonService.createPokemonByName('milotic');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
