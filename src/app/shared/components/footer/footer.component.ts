import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <p>© {{ currentYear }} Sagun Pandey. All rights reserved.</p>
      <div class="footer-links">
        <a routerLink="/privacy-policy" class="footer-link">Privacy Policy</a>
        <span class="divider">•</span>
        <a href="mailto:sag.pan@gmail.com" class="footer-link">Contact</a>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly config = inject(ConfigService);
  currentYear = new Date().getFullYear();
}
