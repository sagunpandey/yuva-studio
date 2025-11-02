import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <p>Redirecting to sagunpandey.com...</p>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: var(--text-primary);
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to sagunpandey.com
    window.location.href = 'https://sagunpandey.com';
  }
}
