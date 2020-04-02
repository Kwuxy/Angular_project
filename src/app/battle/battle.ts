import {Input} from "@angular/core";
import {Pokemon} from "../pokemon/pokemon";
import {Log} from "./log";
import {TurnOrder} from "./turn-order";
import {Observable} from "rxjs";

export class Battle {
  fighters: Pokemon[];
  actions: Log[];
  intervalId;
  isPaused: boolean;
  isFinished: boolean;
  turnOrder = new TurnOrder();
  firstAttacker: Pokemon | undefined;
  isBeginning: boolean;
  source: Observable<any>;

  constructor(fighters: Pokemon[]) {
    this.fighters = fighters;
    this.actions = [];
    this.isBeginning = true;
  }
}
