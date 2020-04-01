import {Directive, ElementRef, Host, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appLogColor]'
})

export class LogColorDirective {
  @Input() @HostBinding('style.color') color: string;

  constructor(private el: ElementRef) {}

}
