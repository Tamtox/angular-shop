import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() address = new EventEmitter<string>();
  collapsed = true;
  onSelect(address: string): void {
    this.address.emit(address);
  }
}
