import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorTileComponent } from './pokemon-selector-tile.component';

describe('PokemonSelectorTileComponent', () => {
  let component: PokemonSelectorTileComponent;
  let fixture: ComponentFixture<PokemonSelectorTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectorTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
