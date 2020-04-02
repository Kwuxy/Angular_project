import {IPokeAPIMove} from "./IPokeAPIMove";

export interface IPokeAPIPokemon {
  name: string;
  moves: IPokeAPIMoveUrl[];
  sprites: IPokeAPISprite;
  stats: IPokeAPIStat[];
}

export interface IPokeAPIMoveUrl {
  move: IPokeAPIMove;
}

export interface IPokeAPISprite {
  back_default: string;
  front_default: string;
}

export interface IPokeAPIStat {
  stat: IPokeAPIStatDetail;
  base_stat: number;
}

export interface IPokeAPIStatDetail {
  name: string;
}
