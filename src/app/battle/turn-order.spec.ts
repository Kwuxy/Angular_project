import {TurnOrder} from './turn-order';
import {Pokemon} from '../pokemon/pokemon';
import {PokemonService} from "../pokemon/pokemon.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UtilsService} from "../utils/utils.service";

describe('Test TurnOrder.ts', () => {
    let turnOrder: TurnOrder;
    let service: PokemonService;
    let http: HttpTestingController;
    let utilsService: UtilsService;

    beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilsService]
    }));

    beforeEach(() => {
      service = TestBed.inject(PokemonService);
      http = TestBed.inject(HttpTestingController);
      utilsService = TestBed.inject(UtilsService);
      turnOrder = new TurnOrder(utilsService);
    });

    test('Should return fastest pokemon', () => {
        const fastest: Pokemon = service.createPokemonByName('milotic');
        const slowest: Pokemon = service.createPokemonByName('gardevoir');
        expect(turnOrder.turn_order(fastest, slowest)).toBe(fastest);
    });

    test('Argument index should not have any impact', () => {
        const fastest: Pokemon = service.createPokemonByName('milotic');
        const slowest: Pokemon = service.createPokemonByName('gardevoir');
        expect(turnOrder.turn_order(slowest, fastest)).toBe(fastest);
    });

    test('Should return the cheater pokemon', () => {
        const fastest: Pokemon = service.createPokemonByName('milotic');
        const slowest: Pokemon = service.createPokemonByName('gardevoir');
        slowest.cheater = true;
        expect(turnOrder.turn_order(fastest, slowest)).toBe(slowest);
    });

    test('should return null when no cheater', () => {
        const p1: Pokemon = service.createPokemonByName('milotic');
        const p2: Pokemon = service.createPokemonByName('gardevoir');

        expect(turnOrder.xor_cheater(p1, p2)).toBe(null);
    });

    test('should return p1 when p1 is the only cheater', () => {
        const p1: Pokemon = service.createPokemonByName('milotic');
        const p2: Pokemon = service.createPokemonByName('gardevoir');
        p1.cheater = true;
        expect(turnOrder.xor_cheater(p1, p2)).toBe(p1);
    });

    test('should return p2 when p2 is the only cheater', () => {
        const p1: Pokemon = service.createPokemonByName('milotic');
        const p2: Pokemon = service.createPokemonByName('gardevoir');
        p2.cheater = true;
        expect(turnOrder.xor_cheater(p1, p2)).toBe(p2);
    });

    test('should return null when two cheater', () => {
        const p1: Pokemon = service.createPokemonByName('milotic');
        const p2: Pokemon = service.createPokemonByName('gardevoir');
        p1.cheater = true;
        p2.cheater = true;
        expect(turnOrder.xor_cheater(p1, p2)).toBe(null);
    });

    test('Should return p1 when pokemons have the same speed and random < 0.5', () => {
      const p1: Pokemon = service.createPokemonByName('milotic');
      const p2: Pokemon = service.createPokemonByName('gardevoir');
      p1.speed = 80;
      utilsService.random = () => 0.40;
      expect(turnOrder.turn_order(p1, p2)).toBe(p1);
    });

    test('Should return p2 when pokemons have the same speed and random > 0.5', () => {
      const p1: Pokemon = service.createPokemonByName('milotic');
      const p2: Pokemon = service.createPokemonByName('gardevoir');
      p1.speed = 80;
      utilsService.random = () => 0.60;
      expect(turnOrder.turn_order(p1, p2)).toBe(p2);
    });
});
