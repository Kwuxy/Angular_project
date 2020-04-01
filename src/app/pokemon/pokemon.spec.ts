import {Pokemon} from './pokemon';

describe('Test Pokemon.ts', () => {
    test('After the attack, gardervoir should have 53hp', () => {
      const milobellus = Pokemon.createPokemonByName('Milobellus');
      const gardevoir = Pokemon.createPokemonByName('Gardevoir');

      milobellus.attack(milobellus.moves[0], gardevoir);
      expect(gardevoir.hp).toBe(53);
    });

    test('After the attack, milobellus should have 20hp', () => {
      const milobellus = Pokemon.createPokemonByName('Milobellus');
      const gardevoir = Pokemon.createPokemonByName('Gardevoir');
      gardevoir.attack(gardevoir.moves[0], milobellus);
      expect(milobellus.hp).toBe(20);
    });
});
