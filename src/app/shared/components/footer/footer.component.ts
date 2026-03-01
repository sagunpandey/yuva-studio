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
      <div class="rule" aria-hidden="true"></div>
      <p class="copyright">© {{ currentYear }} Sagun Pandey. ALL RIGHTS RESERVED.</p>
      <div class="footer-links">
        <a routerLink="/privacy-policy" class="footer-link">Privacy Policy</a>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly config = inject(ConfigService);
  currentYear = new Date().getFullYear();
}
