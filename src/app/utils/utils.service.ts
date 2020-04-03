import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  random = Math.random;

  constructor() { }

  getRandomInt(max: number): number {
    return Math.floor(this.random() * Math.floor(max));
  }
}
