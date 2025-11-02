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
import { BgaIconComponent } from '../../shared/icons/bga-icon/bga-icon.component';
import { BggIconComponent } from '../../shared/icons/bgg-icon/bgg-icon.component';
import { SoundcloudIconComponent } from '../../shared/icons/soundcloud-icon/soundcloud-icon.component';
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
    ThreadIconComponent,
    BgaIconComponent,
    BggIconComponent
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
          name: 'Personal Website',
          url: this.config.socialLinks.personal.website,
          icon: 'pi pi-globe',
          description: 'Portfolio and blog'
        },
        {
          name: 'Facebook',
          url: this.config.socialLinks.personal.facebook,
          icon: 'pi pi-facebook',
          description: 'Connect with me on Facebook'
        },
        {
          name: 'TikTok',
          url: this.config.socialLinks.personal.tiktok,
          icon: 'pi pi-tiktok',
          description: 'Follow me on TikTok'
        },
        {
          name: 'YouTube',
          url: this.config.socialLinks.personal.youtube,
          icon: 'pi pi-youtube',
          description: 'Subscribe to my YouTube channel'
        },
        {
          name: 'Instagram',
          url: this.config.socialLinks.personal.instagram,
          icon: 'pi pi-instagram',
          description: 'Follow me on Instagram'
        },
        {
          name: 'Threads',
          url: this.config.socialLinks.personal.threads,
          icon: 'pi pi-comments',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Follow me on Threads'
        },
        {
          name: 'X',
          url: this.config.socialLinks.personal.x,
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
          url: this.config.socialLinks.boardGaming.instagram,
          icon: 'pi pi-instagram',
          description: 'Board game photos and stories'
        },
        {
          name: 'TikTok',
          url: this.config.socialLinks.boardGaming.tiktok,
          icon: 'pi pi-tiktok',
          description: 'Quick board game tips'
        },
        {
          name: 'YouTube',
          url: this.config.socialLinks.boardGaming.youtube,
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
          url: this.config.socialLinks.boardGaming.bgg,
          icon: '',
          iconType: 'svg',
          iconSvg: BggIconComponent,
          description: 'My board game collection and reviews'
        },
        {
          name: 'Board Game Arena',
          url: this.config.socialLinks.boardGaming.bga,
          icon: '',
          iconType: 'svg',
          iconSvg: BgaIconComponent,
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
          url: this.config.socialLinks.music.soundcloud,
          icon: '',
          iconType: 'svg',
          iconSvg: SoundcloudIconComponent,
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
          url: this.config.socialLinks.programming.github,
          icon: 'pi pi-github',
          description: 'Open-source projects'
        },
        {
          name: 'LinkedIn',
          url: this.config.socialLinks.programming.linkedin,
          icon: 'pi pi-linkedin',
          description: 'Professional profile'
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
}
