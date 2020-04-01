import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hp-bar',
  templateUrl: './hp-bar.component.html',
  styleUrls: ['./hp-bar.component.css']
})
export class HpBarComponent implements OnInit {
  @Input() max_hp: number;
  @Input() hp: number;

  constructor() { }

  ngOnInit(): void {
  }

}
