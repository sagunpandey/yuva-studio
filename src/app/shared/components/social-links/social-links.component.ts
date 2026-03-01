import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
  @Input() links: SocialLink[] = [
    {
      name: 'LinkedIn',
      icon: 'pi pi-linkedin',
      url: 'https://linkedin.com/in/your-profile'
    },
    {
      name: 'GitHub',
      icon: 'pi pi-github',
      url: 'https://github.com/your-username'
    }
  ];
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

