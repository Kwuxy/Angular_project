import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Pokemon} from "./pokemon";

describe('PokemonService', () => {
  let service: PokemonService;
  let http: HttpTestingController;
  let milobellus: Pokemon;
  let gardevoir: Pokemon;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);

    milobellus = service.createPokemonByName('milotic');
    gardevoir = service.createPokemonByName('gardevoir');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('After the attack, gardervoir should have 53hp', () => {
    service.attack(milobellus, milobellus.moves[0], gardevoir);
    expect(gardevoir.hp).toBe(53);
  });

  test('After the attack, milobellus should have 20hp', () => {
    service.attack(milobellus, gardevoir.moves[0], milobellus);
    expect(milobellus.hp).toBe(20);
  });
});
