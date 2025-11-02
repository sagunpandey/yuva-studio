import {ChangeDetectorRef, Component, inject, OnInit, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {BadgeModule} from 'primeng/badge';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {ConfigService} from '../../core/services/config.service';
import {ThreadIconComponent} from '../../shared/icons/thread-icon/thread-icon.component';
import {BgaIconComponent} from '../../shared/icons/bga-icon/bga-icon.component';
import {BggIconComponent} from '../../shared/icons/bgg-icon/bgg-icon.component';
import {SoundcloudIconComponent} from '../../shared/icons/soundcloud-icon/soundcloud-icon.component';

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
    HeaderComponent
  ],
  templateUrl: './link-tree.component.html',
  styleUrls: ['./link-tree.component.scss']
})
export class LinkTreeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly config = inject(ConfigService);
  private cdr = inject(ChangeDetectorRef);

  selectedCategory: string | null = null;
  categories: LinkCategory[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.initializeCategories();
      const params = await firstValueFrom(this.route.queryParams);
      const referredCategory = params['referredCategory'];

      // If referredCategory exists and matches any category title (case insensitive)
      if (referredCategory) {
        const categoryExists = this.categories.some(
          c => c.title.toLowerCase() === referredCategory.toLowerCase()
        );

        if (categoryExists) {
          this.selectedCategory = referredCategory;
          await this.pinCategory(referredCategory);
        }
      }
    } catch (error) {
      console.error('Error initializing link tree:', error);
    }
  }

  private initializeCategories(): void {
    this.categories = [
      {
        title: 'Professional',
        icon: 'pi pi-code',
        links: [
          this.createLinkItem('Website', this.config.socialLinks?.personal?.website, 'pi pi-globe', 'Explore my work and thoughts', 'Portfolio, blog, and more about my journey'),
          this.createLinkItem('LinkedIn (sagunpandey)', this.config.socialLinks?.programming?.linkedin, 'pi pi-linkedin', 'Professional profile'),
          this.createLinkItem('GitHub (@sagunpandey)', this.config.socialLinks?.programming?.github, 'pi pi-github', 'My open source contributions', 'Check out my code and projects')
        ]
      },
      {
        title: 'Board Gaming',
        icon: 'pi pi-table',
        links: [
          this.createLinkItem('Instagram (@rollpasa)', this.config.socialLinks?.boardGaming?.instagram, 'pi pi-instagram', 'Board game photos and sessions', 'Tabletop adventures and collection'),
          this.createLinkItem('TikTok (@rollpasa)', this.config.socialLinks?.boardGaming?.tiktok, 'pi pi-tiktok', 'Board game content', 'Short videos of gameplay and reviews'),
          this.createLinkItem('YouTube (@rollpasa)', this.config.socialLinks?.boardGaming?.youtube, 'pi pi-youtube', 'Board game channel', 'Gameplay, reviews, and more'),
          {
            ...this.createLinkItem('Threads (@rollpasa)', this.config.socialLinks?.boardGaming?.threads, '', 'Board game discussions', 'Thoughts on games and the hobby'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent
          },
          {
            ...this.createLinkItem('BoardGameGeek (withyuva)', this.config.socialLinks?.boardGaming?.bgg, '', 'My board game collection', 'Ratings, reviews, and plays'),
            iconType: 'svg',
            iconSvg: BggIconComponent
          },
          {
            ...this.createLinkItem('Board Game Arena (withyuva)', this.config.socialLinks?.boardGaming?.bga, '', 'Play board games online', 'Challenge me to a game!'),
            iconType: 'svg',
            iconSvg: BgaIconComponent
          }
        ]
      },
      {
        title: 'Photography',
        icon: 'pi pi-camera',
        links: [
          this.createLinkItem('Street (@withyuva)', this.config.socialLinks?.photography?.street?.instagram, 'pi pi-instagram', 'Street photography', 'Capturing moments in the urban landscape'),
          {
            ...this.createLinkItem('Street on Threads', this.config.socialLinks?.photography?.street?.threads, '', 'Street photography discussions', 'Thoughts on street photography'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent
          },
          this.createLinkItem('Portrait (@timelessbyyuva)', this.config.socialLinks?.photography?.portrait?.instagram, 'pi pi-instagram', 'Portrait photography', 'Timeless portraits and moments'),
          {
            ...this.createLinkItem('Portrait on Threads', this.config.socialLinks?.photography?.portrait?.threads, '', 'Portrait photography', 'Behind the scenes and more'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent
          }
        ]
      },
      {
        title: 'Music',
        icon: 'pi pi-music',
        links: [
          {
            ...this.createLinkItem('SoundCloud (sagunpandey)', this.config.socialLinks?.music?.soundcloud, '', 'Original compositions', 'Listen to my latest tracks and mixes'),
            iconType: 'svg',
            iconSvg: SoundcloudIconComponent
          }
        ]
      },
      {
        title: 'Personal',
        icon: 'pi pi-user',
        links: [
          this.createLinkItem('Facebook (@sagun.pandey)', this.config.socialLinks?.personal?.facebook, 'pi pi-facebook', 'Stay connected', 'Personal updates and life moments'),
          this.createLinkItem('TikTok (@sagun.pandey)', this.config.socialLinks?.personal?.tiktok, 'pi pi-tiktok', 'Follow me on TikTok'),
          this.createLinkItem('YouTube (@withyuva)', this.config.socialLinks?.personal?.youtube, 'pi pi-youtube', 'Subscribe to my YouTube channel'),
          {
            ...this.createLinkItem('Threads (@sagun.pandey)', this.config.socialLinks?.personal?.threads, '', 'Text-based conversations', 'Longer form thoughts and discussions'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent
          },
          this.createLinkItem('X (@sagunpandey)', this.config.socialLinks?.personal?.x, 'pi pi-twitter', 'Thoughts in 280 characters or less', 'Tech, life, and random musings')
        ]
      },
    ];
  }

  private createLinkItem(
    name: string,
    url: string = '#',
    icon: string = '',
    description: string = '',
    microText?: string,
    category?: string
  ): LinkItem {
    return {
      name,
      url: url || '#',
      icon,
      description,
      microText,
      category: category || this.categories[this.categories.length - 1]?.title
    };
  }

  private async pinCategory(category: string): Promise<void> {
    // Create a new array reference to trigger change detection
    const currentCategories = [...this.categories];
    const categoryIndex = currentCategories.findIndex(
      c => c.title.toLowerCase() === category.toLowerCase()
    );

    if (categoryIndex > 0) {
      // Create a new array with the selected category first
      // Update the categories array
      this.categories = [
        {...currentCategories[categoryIndex]}, // Create new object reference
        ...currentCategories.slice(0, categoryIndex),
        ...currentCategories.slice(categoryIndex + 1)
      ];

      // Manually trigger change detection
      this.cdr.detectChanges();
    }
  }

  openLink(url: string): void {
    try {
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  }

  getIconComponent(link: LinkItem | undefined): Type<any> | null {
    if (!link) return null;

    try {
      if (link.iconType === 'svg' && link.iconSvg) {
        return link.iconSvg;
      }
      return null;
    } catch (error) {
      console.error('Error getting icon component:', error);
      return null;
    }
  }
}
