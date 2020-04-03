import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorRowComponent } from './pokemon-selector-row.component';
import {PokemonSelectorTileComponent} from "../pokemon-selector-tile/pokemon-selector-tile.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('PokemonSelectorRowComponent', () => {
  let component: PokemonSelectorRowComponent;
  let fixture: ComponentFixture<PokemonSelectorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectorRowComponent, PokemonSelectorTileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
