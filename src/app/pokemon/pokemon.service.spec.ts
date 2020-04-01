import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('After the attack, gardervoir should have 53hp', () => {
    const milobellus = service.createPokemonByName('Milobellus');
    const gardevoir = service.createPokemonByName('Gardevoir');
    service.attack(milobellus.moves[0], gardevoir);
    expect(gardevoir.hp).toBe(53);
  });

  test('After the attack, milobellus should have 20hp', () => {
    const milobellus = service.createPokemonByName('Milobellus');
    const gardevoir = service.createPokemonByName('Gardevoir');
    service.attack(gardevoir.moves[0], milobellus);
    expect(milobellus.hp).toBe(20);
  });
});
