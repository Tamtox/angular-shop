import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';
  currentPage = 'recipes';
  navigate(address: string): void {
    this.currentPage = address;
  }
}
