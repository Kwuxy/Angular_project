import {TurnOrder} from './turn-order';
import {Pokemon} from '../pokemon/pokemon';
import {PokemonService} from "../pokemon/pokemon.service";
import {TestBed} from "@angular/core/testing";

describe('Test TurnOrder.ts', () => {
    let turnOrder: TurnOrder;
    let service: PokemonService;

    beforeEach(() => {
      service = TestBed.inject(PokemonService);
      turnOrder = new TurnOrder();
    });

    test('Should return fastest pokemon', () => {
        const fastest: Pokemon = service.createPokemonByName('Milobellus');
        const slowest: Pokemon = service.createPokemonByName('Gardevoir');
        expect(turnOrder.turn_order(fastest, slowest)).toBe(fastest);
    });

    test('Argument index should not have any impact', () => {
        const fastest: Pokemon = service.createPokemonByName('Milobellus');
        const slowest: Pokemon = service.createPokemonByName('Gardevoir');
        expect(turnOrder.turn_order(slowest, fastest)).toBe(fastest);
    });

    test('Should return the cheater pokemon', () => {
        const fastest: Pokemon = service.createPokemonByName('Milobellus');
        const slowest: Pokemon = service.createPokemonByName('Gardevoir');
        slowest.cheater = true;
        expect(turnOrder.turn_order(fastest, slowest)).toBe(slowest);
    });

    test('should return null when no cheater', () => {
        const p1: Pokemon = service.createPokemonByName('Milobellus');
        const p2: Pokemon = service.createPokemonByName('Gardevoir');

        expect(TurnOrder.xor_cheater(p1, p2)).toBe(null);
    });

    test('should return p1 when p1 is the only cheater', () => {
        const p1: Pokemon = service.createPokemonByName('Milobellus');
        const p2: Pokemon = service.createPokemonByName('Gardevoir');
        p1.cheater = true;
        expect(TurnOrder.xor_cheater(p1, p2)).toBe(p1);
    });

    test('should return p2 when p2 is the only cheater', () => {
        const p1: Pokemon = service.createPokemonByName('Milobellus');
        const p2: Pokemon = service.createPokemonByName('Gardevoir');
        p2.cheater = true;
        expect(TurnOrder.xor_cheater(p1, p2)).toBe(p2);
    });

    test('should return null when two cheater', () => {
        const p1: Pokemon = service.createPokemonByName('Milobellus');
        const p2: Pokemon = service.createPokemonByName('Gardevoir');
        p1.cheater = true;
        p2.cheater = true;
        expect(TurnOrder.xor_cheater(p1, p2)).toBe(null);
    });

    test('should return 0 when generatingRandomInt with random < 0.5 and max = 2', () => {
      turnOrder.random = () => 0.49;
      expect(turnOrder.getRandomInt(2)).toBe(0);
    });

    test('should return 1 when generatingRandomInt with random > 0.5 and max = 2', () => {
      turnOrder.random = () => 0.51;
      expect(turnOrder.getRandomInt(2)).toBe(1);
    });

    test('Should return p1 when pokemons have the same speed and random < 0.5', () => {
      const p1: Pokemon = service.createPokemonByName('Milobellus');
      const p2: Pokemon = service.createPokemonByName('Gardevoir');
      p1.speed = 80;
      turnOrder.random = () => 0.40;
      expect(turnOrder.turn_order(p1, p2)).toBe(p1);
    });

    test('Should return p2 when pokemons have the same speed and random > 0.5', () => {
      const p1: Pokemon = service.createPokemonByName('Milobellus');
      const p2: Pokemon = service.createPokemonByName('Gardevoir');
      p1.speed = 80;
      turnOrder.random = () => 0.60;
      expect(turnOrder.turn_order(p1, p2)).toBe(p2);
    });
});
