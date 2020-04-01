import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon/pokemon";

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.css']
})
export class BattleArenaComponent implements OnInit {
  @Input() fighters: Pokemon[];

  constructor() { }

  ngOnInit(): void {
  }

}
