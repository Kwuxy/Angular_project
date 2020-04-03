import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelectorListComponent } from './pokemon-selector-list.component';

describe('PokemonSelectorListComponent', () => {
  let component: PokemonSelectorListComponent;
  let fixture: ComponentFixture<PokemonSelectorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonSelectorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSelectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
