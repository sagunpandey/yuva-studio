import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent, SocialLink } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-photographer',
  standalone: true,
  imports: [CommonModule, RouterModule, SocialLinksComponent],
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent {
  protected readonly config = inject(ConfigService);

  socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: 'pi pi-instagram',
      url: 'https://instagram.com/your-handle'
    },
    {
      name: 'Links',
      icon: 'pi pi-share-alt',
      url: '/links',
      queryParams: { category: 'photography' }
    }
  ];
}
