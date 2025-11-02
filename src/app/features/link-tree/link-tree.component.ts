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
  description: string;
  microText?: string;
  badge?: string;
  category?: string;
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
          description: 'Explore my work and thoughts',
          microText: 'Portfolio, blog, and more about my journey',
          category: 'Personal'
        },
        {
          name: 'Facebook (@sagun.pandey)',
          url: this.config.socialLinks.personal.facebook,
          icon: 'pi pi-facebook',
          description: 'Stay connected',
          microText: 'Personal updates and life moments',
          category: 'Personal'
        },
        {
          name: 'TikTok (@sagun.pandey)',
          url: this.config.socialLinks.personal.tiktok,
          icon: 'pi pi-tiktok',
          description: 'Follow me on TikTok',
          category: 'Personal'
        },
        {
          name: 'YouTube (@withyuva)',
          url: this.config.socialLinks.personal.youtube,
          icon: 'pi pi-youtube',
          description: 'Subscribe to my YouTube channel',
          category: 'Personal'
        },
        {
          name: 'Instagram (@sagun.pandey)',
          url: this.config.socialLinks.personal.instagram,
          icon: 'pi pi-instagram',
          description: 'Daily life in pictures',
          microText: 'Moments from my personal journey',
          category: 'Personal'
        },
        {
          name: 'Threads (@sagun.pandey)',
          url: this.config.socialLinks.personal.threads,
          icon: '',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Text-based conversations',
          microText: 'Longer form thoughts and discussions',
          category: 'Personal'
        },
        {
          name: 'X (Twitter) (@sagunpandey)',
          url: this.config.socialLinks.personal.x,
          icon: 'pi pi-twitter',
          description: 'Thoughts in 280 characters or less',
          microText: 'Tech, life, and random musings',
          category: 'Personal'
        }
      ]
    },
    {
      title: 'Board Gaming',
      icon: 'pi pi-table',
      links: [
        {
          name: 'Instagram (@rollpasa)',
          url: this.config.socialLinks.boardGaming.instagram,
          icon: 'pi pi-instagram',
          description: 'Board game photos and sessions',
          microText: 'Tabletop adventures and collection',
          category: 'Board Gaming'
        },
        {
          name: 'TikTok (@rollpasa)',
          url: this.config.socialLinks.boardGaming.tiktok,
          icon: 'pi pi-tiktok',
          description: 'Board game content',
          microText: 'Short videos of gameplay and reviews',
          category: 'Board Gaming'
        },
        {
          name: 'YouTube (@rollpasa)',
          url: this.config.socialLinks.boardGaming.youtube,
          icon: 'pi pi-youtube',
          description: 'Board game channel',
          microText: 'Gameplay, reviews, and more',
          category: 'Board Gaming'
        },
        {
          name: 'Threads (@rollpasa)',
          url: this.config.socialLinks.boardGaming.threads,
          icon: '',
          iconType: 'svg',
          iconSvg: ThreadIconComponent,
          description: 'Board game discussions',
          microText: 'Thoughts on games and the hobby',
          category: 'Board Gaming'
        },
        {
          name: 'BoardGameGeek (withyuva)',
          url: this.config.socialLinks.boardGaming.bgg,
          icon: '',
          iconType: 'svg',
          iconSvg: BggIconComponent,
          description: 'My board game collection',
          microText: 'Ratings, reviews, and plays',
          category: 'Board Gaming'
        },
        {
          name: 'Board Game Arena (withyuva)',
          url: this.config.socialLinks.boardGaming.bga,
          icon: '',
          iconType: 'svg',
          iconSvg: BgaIconComponent,
          description: 'Play board games online',
          microText: 'Challenge me to a game!',
          category: 'Board Gaming'
        }
      ]
    },
    {
      title: 'Music',
      icon: 'pi pi-music',
      links: [
        {
          name: 'SoundCloud (sagunpandey)',
          url: this.config.socialLinks.music.soundcloud,
          description: 'Original compositions',
          microText: 'Listen to my latest tracks and mixes',
          category: 'Music',
          icon: '',
          iconType: 'svg',
          iconSvg: SoundcloudIconComponent
        }
      ]
    },
    {
      title: 'Programming',
      icon: 'pi pi-code',
      links: [
        {
          name: 'GitHub (@sagunpandey)',
          url: this.config.socialLinks.programming.github,
          icon: 'pi pi-github',
          description: 'My open source contributions',
          microText: 'Check out my code and projects',
          category: 'Programming'
        },
        {
          name: 'LinkedIn (sagunpandey)',
          url: this.config.socialLinks.programming.linkedin,
          icon: 'pi pi-linkedin',
          description: 'Professional profile',
          category: 'Programming'
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
