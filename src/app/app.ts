import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './shared/components/background/background.component';
import { HeaderNavComponent } from './shared/components/header-nav/header-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent, HeaderNavComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'yuva-studio';
}
