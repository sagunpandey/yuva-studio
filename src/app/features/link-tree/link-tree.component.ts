import { Component, inject, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { BadgeModule } from 'primeng/badge';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ThreadIconComponent } from '../../shared/icons/thread-icon/thread-icon.component';
import { ConfigService } from '../../core/services/config.service';

interface LinkItem {
  name: string;
  url: string;
  icon: string;
  iconType?: 'default' | 'svg';
  iconSvg?: Type<any>;
  description?: string;
  badge?: string;
}

interface LinkCategory {
  title: string;
  icon: string;
  links: LinkItem[];
}

@Component({
  selector: 'app-link-tree',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    DividerModule,
    TooltipModule,
    RippleModule,
    StyleClassModule,
    BadgeModule,
    FooterComponent,
    HeaderComponent,
    ThreadIconComponent
  ],
  templateUrl: './link-tree.component.html',
  styleUrls: ['./link-tree.component.scss']
})
export class LinkTreeComponent {
  protected readonly config = inject(ConfigService);

  categories: LinkCategory[] = [
    {
      title: 'Personal',
      icon: 'pi pi-user',
      links: [
        {
          name: 'Facebook',
          url: this.config.socialLinks.facebook,
          icon: 'pi pi-facebook',
          description: 'Connect with me on Facebook'
        },
        {
          name: 'TikTok',
          url: this.config.socialLinks.tiktok,
          icon: 'pi pi-tiktok',
          description: 'Follow me on TikTok'
        },
        {
          name: 'YouTube',
          url: this.config.socialLinks.youtube,
          icon: 'pi pi-youtube',
          description: 'Subscribe to my YouTube channel'
        },
        {
          name: 'Instagram',
          url: this.config.socialLinks.instagram,
          icon: 'pi pi-instagram',
          description: 'Follow me on Instagram'
        },
        {
          name: 'Threads',
          url: this.config.socialLinks.threads,
          icon: 'pi pi-comments',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Follow me on Threads'
        },
        {
          name: 'X',
          url: this.config.socialLinks.x,
          icon: 'pi pi-twitter',
          description: 'Follow me on X'
        }
      ]
    },
    {
      title: 'Board Gaming',
      icon: 'pi pi-dice-three',
      links: [
        {
          name: 'Instagram',
          url: 'https://instagram.com/your-username',
          icon: 'pi pi-instagram',
          description: 'Board game photos and stories'
        },
        {
          name: 'TikTok',
          url: 'https://tiktok.com/@your-username',
          icon: 'pi pi-tiktok',
          description: 'Quick board game tips'
        },
        {
          name: 'YouTube',
          url: 'https://youtube.com/your-channel',
          icon: 'pi pi-youtube',
          description: 'Board game reviews and playthroughs'
        },
        {
          name: 'Threads',
          url: this.config.socialLinks.boardGaming.threads,
          icon: 'pi pi-comments',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Board game discussions on Threads'
        },
        {
          name: 'BoardGameGeek',
          url: 'https://boardgamegeek.com/user/yourusername',
          icon: 'pi pi-th-large',
          description: 'My board game collection and reviews'
        },
        {
          name: 'Board Game Arena',
          url: 'https://boardgamearena.com/player?id=97163770',
          icon: 'pi pi-play',
          description: 'Play board games with me online'
        }
      ]
    },
    {
      title: 'Photography',
      icon: 'pi pi-camera',
      links: [
        {
          name: 'Street Photography',
          url: this.config.socialLinks.photography.street.instagram,
          icon: 'pi pi-instagram',
          description: 'Urban photography portfolio'
        },
        {
          name: 'Street on Threads',
          url: this.config.socialLinks.photography.street.threads,
          icon: 'pi pi-comments',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Street photography on Threads'
        },
        {
          name: 'Portrait Photography',
          url: this.config.socialLinks.photography.portrait.instagram,
          icon: 'pi pi-instagram',
          description: 'Portfolio and bookings'
        },
        {
          name: 'Portraits on Threads',
          url: this.config.socialLinks.photography.portrait.threads,
          icon: 'pi pi-comments',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Portrait photography on Threads'
        }
      ]
    },
    {
      title: 'Music',
      icon: 'pi pi-music',
      links: [
        {
          name: 'SoundCloud',
          url: 'https://soundcloud.com/your-profile',
          icon: 'pi pi-soundcloud',
          description: 'Original music and remixes'
        }
      ]
    },
    {
      title: 'Programming',
      icon: 'pi pi-code',
      links: [
        {
          name: 'GitHub',
          url: this.config.socialLinks.github,
          icon: 'pi pi-github',
          description: 'Open-source projects'
        },
        {
          name: 'LinkedIn',
          url: this.config.socialLinks.linkedin,
          icon: 'pi pi-linkedin',
          description: 'Professional profile'
        },
        {
          name: 'Personal Website',
          url: 'https://your-website.com',
          icon: 'pi pi-globe',
          description: 'Portfolio and blog'
        }
      ]
    }
  ];

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getIconComponent(link: LinkItem): Type<any> | null {
    if (link.iconType === 'svg' && link.iconSvg) {
      return link.iconSvg;
    }
    return null;
  }

  private getSafe<T>(obj: any, path: string, defaultValue: any = null): T | null {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
  }
}
