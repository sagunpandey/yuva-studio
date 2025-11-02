import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  imports: [CommonModule],
  template: `
    <div class="background">
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blurLight" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
          <filter id="blurMedium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>

          <linearGradient id="darkBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#080810" />
            <stop offset="100%" stop-color="#151520" />
          </linearGradient>

          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00C9FF" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#92FE9D" stop-opacity="0.6" />
          </linearGradient>

          <linearGradient id="gameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F953C6" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#B91D73" stop-opacity="0.6" />
          </linearGradient>

          <linearGradient id="photoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFD700" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#FFA500" stop-opacity="0.6" />
          </linearGradient>

        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#darkBgGradient)" />

        <g opacity="0.3" filter="url(#blurLight)">
          <path d="M0,200 C300,50 600,300 900,150 S1500,-50 1920,200" fill="none" stroke="url(#codeGradient)" stroke-width="80" stroke-linecap="round"/>
          <path d="M0,800 C400,1000 800,700 1200,900 S1600,1200 1920,850" fill="none" stroke="url(#codeGradient)" stroke-width="80" stroke-linecap="round"/>
        </g>

        <g opacity="0.3" filter="url(#blurLight)">
          <circle cx="1500" cy="300" r="250" fill="url(#gameGradient)" />
          <circle cx="400" cy="700" r="200" fill="url(#gameGradient)" />
        </g>

        <g opacity="0.3" filter="url(#blurLight)">
          <path d="M1920,500 C1700,300 1500,800 1300,600 C1100,400 900,900 700,700 C500,500 300,1000 0,800" fill="none" stroke="url(#photoGradient)" stroke-width="100" stroke-linecap="round"/>
          <path d="M0,100 C200,300 400,-50 600,200 C800,450 1000,0 1200,150 C1400,300 1600,-100 1920,50" fill="none" stroke="url(#photoGradient)" stroke-width="100" stroke-linecap="round"/>
        </g>

        <g opacity="0.15">
          <rect x="10%" y="10%" width="30%" height="5%" fill="#00C9FF" transform="rotate(15 15% 15%)"/>
          <rect x="80%" y="40%" width="15%" height="3%" fill="#92FE9D" transform="rotate(-30 85% 40%)"/>
          <circle cx="20%" cy="30%" r="20" fill="#00C9FF" />
          <circle cx="85%" cy="50%" r="15" fill="#92FE9D" />

          <polygon points="500,900 600,950 550,1050 450,1000" fill="#F953C6" />
          <rect x="700" y="50" width="80" height="20" rx="5" ry="5" fill="#B91D73" transform="rotate(45 740 60)"/>

          <path d="M100,700 Q200,600 300,700 T500,700" fill="none" stroke="#FFD700" stroke-width="3"/>
          <path d="M1800,200 Q1700,300 1600,200 T1400,200" fill="none" stroke="#FFA500" stroke-width="3"/>
        </g>

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
