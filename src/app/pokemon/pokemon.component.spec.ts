import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonComponent } from './pokemon.component';
import {Pokemon} from './pokemon';
import {AppComponent} from "../app.component";
import {BattleComponent} from "../battle/battle.component";
import {MoveComponent} from "../move/move.component";

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let view: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PokemonComponent,
        BattleComponent,
        MoveComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    component.pokemon = Pokemon.createPokemonByName('Gardevoir');
    component.pokemon.hp = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    expect(view.textContent).toContain('Gardevoir');
  });

  it('should display hp', () => {
    expect(view.textContent).toContain(100);
  });
});
