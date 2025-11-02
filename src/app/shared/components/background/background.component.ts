import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  imports: [CommonModule],
  template: `
    <div class="background">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fabricWeave"
                   patternUnits="userSpaceOnUse"
                   width="4" height="4">

            <path d="M 0,4 l 4,-4" stroke="#000000" stroke-width="0.5" stroke-opacity="0.3" />
            <path d="M 0,0 l 4,4" stroke="#000000" stroke-width="0.5" stroke-opacity="0.3" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="#282c34" />

        <rect width="100%" height="100%" fill="url(#fabricWeave)" />
      </svg>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
      background: transparent;
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }
  `]
})
export class BackgroundComponent {}
