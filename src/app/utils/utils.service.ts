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

  generateRandomColor(){
    return '#'+(0x1000000+(this.random())*0xffffff).toString(16).substr(1,6)
  }
}
