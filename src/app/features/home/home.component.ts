import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
   protected readonly config = inject(ConfigService);

   private frame = false;

   ngOnInit() {
     this.onScroll();
     window.addEventListener('scroll', this.onScroll, { passive: true });
   }

   ngOnDestroy() {
     window.removeEventListener('scroll', this.onScroll as any);
   }

   onMouseMove(e: MouseEvent) {
     // Skip mouse parallax on small screens
     if (window.innerWidth < 768) return;
     const x = (e.clientX - window.innerWidth / 2);
     const y = (e.clientY - window.innerHeight / 2);
     // Set pixel values so CSS calc() produces valid length values (e.g. '100px')
     // Set base vars (kept for compatibility)
     document.documentElement.style.setProperty('--px', `${x}px`);
     document.documentElement.style.setProperty('--py', `${y}px`);

     // Compute and set per-layer translations to avoid runtime calc() in CSS
     document.documentElement.style.setProperty('--backdrop-x', `${x * -0.03}px`);
     document.documentElement.style.setProperty('--backdrop-y', `${y * -0.03}px`);
     document.documentElement.style.setProperty('--overlay-x', `${x * 0.015}px`);
     document.documentElement.style.setProperty('--overlay-y', `${y * 0.015}px`);
     document.documentElement.style.setProperty('--glow-x', `${x * 0.02}px`);
     document.documentElement.style.setProperty('--glow-y', `${y * 0.02}px`);
   }

   onScroll = () => {
     if (this.frame) return;
     this.frame = true;
     requestAnimationFrame(() => {
       const sy = window.scrollY || 0;
       // Update derived vertical translation variables (pixels)
       document.documentElement.style.setProperty('--sy', `${sy}px`);
       document.documentElement.style.setProperty('--backdrop-sy', `${sy * 0.15}px`);
       document.documentElement.style.setProperty('--overlay-sy', `${sy * 0.12}px`);
       document.documentElement.style.setProperty('--glow-sy', `${sy * 0.2}px`);
       this.frame = false;
     });
   };

  // Kept getters in case we bring back intro copy later
  get author() { return this.config.author; }
  get bio() { return this.config.bio; }
  get gravatarUrl() { return this.config.gravatarUrl; }
}
