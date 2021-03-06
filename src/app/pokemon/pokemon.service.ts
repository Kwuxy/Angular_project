import { Injectable } from '@angular/core';
import {Move} from "../move/move";
import {Pokemon} from "./pokemon";
import {HttpClient} from "@angular/common/http";
import {IPokeAPIMoveUrl, IPokeAPIPokemon} from "./pokeapi/IPokeAPIPokemon";
import {IPokeAPIMove} from "./pokeapi/IPokeAPIMove";
import {map, mergeMap} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import {UtilsService} from "../utils/utils.service";
import {isNumeric} from "tslint";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, public utilsService: UtilsService) { }

  createPokemonByName(name: string): Pokemon {
    let speed = 0;
    let offensive = 1;
    let defensive = 1;
    let hp = 30;
    const moves: Move[] = [];
    let sprite: string = "";
    let color: string = "";

    if (name === 'milotic') {
      color = 'blue';
      speed = 81;
      offensive = 60;
      defensive = 79;
      hp = 95;
      moves.push(Move.getMoveByName('Wrap'));
      sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png";
    }

    if (name === 'gardevoir') {
      color = 'green';
      speed = 80;
      offensive = 65;
      defensive = 65;
      hp = 68;
      moves.push(Move.getMoveByName('Ice Punch'));
      sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/282.png";
    }

    return new Pokemon(name, color, speed, offensive, defensive, hp, moves);
  }

  getPokemonFromPokeApi(name: string) : Pokemon {
    if( ((name != null) && isNaN(Number(name))) ) { name = name.toLowerCase(); }

    let pokemon = new Pokemon('');
    this.http.get<IPokeAPIPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .pipe(
        mergeMap((rawPokemon: IPokeAPIPokemon) => {
          this.mapRawPokemon(rawPokemon, pokemon);
          return this.getPokeAPIMoves(rawPokemon);
        }),
        map((rawMoves: IPokeAPIMove[]) => {
          this.mapRawMoves(rawMoves, pokemon)
        })
      ).subscribe();

    return pokemon;
  }

  getPokemonFromPokeApiWithoutMoves(name: string) : Pokemon {
    if( ((name != null) && isNaN(Number(name))) ) { name = name.toLowerCase(); }

    let pokemon = new Pokemon('');
    this.http.get<IPokeAPIPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .pipe(
        map((rawPokemon: IPokeAPIPokemon) => {
          this.mapRawPokemon(rawPokemon, pokemon);
        })
      ).subscribe();

    return pokemon;
  }

  attack(attacker: Pokemon, move: Move, target: Pokemon): number {
    if (!attacker.cheated && this.utilsService.getRandomInt(100) > move.accuracy) return 0;

    let damages = move.power;
    target.hp = target.hp - damages;
    if (target.hp < 0) { target.hp = 0; }
    return damages;
  }

  setHP(pokemon: Pokemon, base_stat: number) {
    pokemon.hp = Math.floor((2 * base_stat) * pokemon.level / 100 + pokemon.level + 10);
    pokemon.max_hp = pokemon.hp;
  }

  calculateStat(pokemon: Pokemon, base_stat: number) {
    return Math.floor((2 * base_stat) * pokemon.level / 100 + 5);
  }

  private mapRawPokemon(rawPokemon: IPokeAPIPokemon, pokemon: Pokemon) {
    pokemon.name = rawPokemon.name.charAt(0).toUpperCase() + rawPokemon.name.slice(1);
    pokemon.level = 100;
    pokemon.speed = this.calculateStat(pokemon, rawPokemon.stats.filter(stat => stat.stat.name === "speed")[0].base_stat);
    this.setHP(pokemon, rawPokemon.stats.filter(stat => stat.stat.name === "hp")[0].base_stat);
    pokemon.max_hp = pokemon.hp;
    pokemon.sprites.front = rawPokemon.sprites.front_default;
    pokemon.sprites.back = rawPokemon.sprites.back_default;
    pokemon.color = this.utilsService.generateRandomColor();
  }

  private getPokeAPIMoves(rawPokemon: IPokeAPIPokemon): Observable<any> {
    let move_calls = [];
    for (let move of rawPokemon.moves) {
      move_calls.push(this.http.get<IPokeAPIMoveUrl>(move.move.url));
    }

    return forkJoin(move_calls);
  }

  private mapRawMoves(rawMoves: IPokeAPIMove[], pokemon: Pokemon) {
    rawMoves.filter((move) => move.power !== null)
      .sort(() => Math.random() - 0.5)
      .map((move) => {
        if (move.accuracy === null) { move.accuracy = 100; }
        pokemon.moves.push(new Move(move.name, move.power, move.accuracy));
      });
  }

  getPokemonsFromAPI() {
    let pokemons = [];
    let ids = [];
    for(let i = 1; i < 31; i++) {
      let randomInt;
      do {
        randomInt = this.utilsService.getRandomInt(386) + 1;
      } while(ids.includes(randomInt));
      ids.push(randomInt);
      pokemons.push(this.getPokemonFromPokeApiWithoutMoves(randomInt.toString()));
    }

    return pokemons;
  }
}
