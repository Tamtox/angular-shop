import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  // @Input() classes = '';
  // @HostBinding('class') classes: string;
  // constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    console.log(123);
  }
}
