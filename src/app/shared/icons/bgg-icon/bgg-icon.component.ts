import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bgg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 38" width="24" height="24">
      <g fill="none" fill-rule="evenodd">
        <path fill="currentColor" d="M41.64 20.85c0-.13-.08-.29-.26-.29h-4.13v3.91h4.13c.18 0 .26-.13.26-.26v-3.36zm0-6.93c0-.13-.08-.29-.26-.29h-4.13v3.68h4.13c.18 0 .26-.13.26-.26v-3.13zm-8.97 13.92V10.1h11c1.46 0 2.38.92 2.38 2.23v3.94c0 1.19-.79 2.36-2.43 2.75 1.64.4 2.57 1.5 2.57 2.68v3.86c0 1.39-.93 2.26-2.38 2.26h-11zm25.08-10.88l5.01 0v8.85c0 1.16-.9 2.02-2.04 2.02h-8.94c-1.14 0-2.04-.87-2.04-2.02V12.09c0-1.08.93-1.99 2.04-1.99h11v3.81h-8.2c-.13 0-.26.13-.26.29v9.51c0 .16.1.26.26.26h3.7c.19 0 .29-.11.29-.26v-3.3h-2.41l1.61-3.76zm16.57 0l5.01 0v8.85c0 1.16-.9 2.02-2.04 2.02h-8.94c-1.14 0-2.04-.87-2.04-2.02V12.09c0-1.08.93-1.99 2.04-1.99h11v3.81h-8.2c-.13 0-.26.13-.26.29v9.51c0 .16.1.26.26.26h3.7c.19 0 .29-.11.29-.26v-3.3h-2.41l1.61-3.76z"/>
        <polygon fill="currentColor" points="24.87 7.01 21.107 8.035 24.792 0 .9 8.794 2.206 19.327 0 21.454 6.577 37.93 20.558 32.779 25.418 21.37 23.331 19.358"/>
      </g>
    </svg>
  `,
  styles: [`:host { display: inline-flex; }`]
})
export class BggIconComponent {}
