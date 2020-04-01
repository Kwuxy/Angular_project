import {Pokemon} from "../pokemon/pokemon";

export class Log {
  content: string;
  color: string;

  constructor(content: string, color: string = 'black') {
    this.content = content;
    this.color = color;
  }

  ngOnInit(): void {
  }
}
