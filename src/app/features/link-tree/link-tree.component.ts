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
  hide?: boolean;
  sponsored?: boolean;
  couponCode?: string;
  discount?: string;
  isHotDeal?: boolean;
}

interface LinkCategory {
  id: string;
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
      const category = params['category'];

      // If category exists and matches any category ID (case-insensitive)
      if (category) {
        const cat = this.categories.find(
          c => c.id.toLowerCase() === category.toLowerCase() ||
            c.title.toLowerCase() === category.toLowerCase()
        );

        if (cat) {
          this.selectedCategory = cat.id;
          await this.pinCategory(cat.id);
        }
      }
    } catch (error) {
      console.error('Error initializing link tree:', error);
    }
  }

  private initializeCategories(): void {
    this.categories = [
      {
        id: 'professional',
        title: 'Professional',
        icon: 'pi pi-code',
        links: [
          this.createLinkItem('Website', this.config.socialLinks?.personal?.website, 'pi pi-globe', 'Explore my work and thoughts', 'Portfolio, blog, and more about my journey'),
          this.createLinkItem('LinkedIn', this.config.socialLinks?.programming?.linkedin, 'pi pi-linkedin', 'sagunpandey', 'View my professional profile and experience'),
          this.createLinkItem('GitHub', this.config.socialLinks?.programming?.github, 'pi pi-github', '@sagunpandey', 'Explore my open-source contributions and projects')
        ]
      },
      {
        id: 'gaming',
        title: 'Board Gaming',
        icon: 'pi pi-table',
        links: [
          this.createLinkItem('Instagram', this.config.socialLinks?.boardGaming?.instagram, 'pi pi-instagram', '@rollpasa', 'Tabletop adventures and collection'),
          this.createLinkItem('TikTok', this.config.socialLinks?.boardGaming?.tiktok, 'pi pi-tiktok', '@rollpasa', 'Short videos of gameplay and reviews'),
          this.createLinkItem('YouTube', this.config.socialLinks?.boardGaming?.youtube, 'pi pi-youtube', '@rollpasa', 'Gameplay, reviews, and more'),
          {
            ...this.createLinkItem('Threads', this.config.socialLinks?.boardGaming?.threads, '', '@rollpasa', 'Thoughts on games and the hobby'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent,
            hide: true,
          },
          {
            ...this.createLinkItem('BoardGameGeek', this.config.socialLinks?.boardGaming?.bgg, '', 'withyuva', 'Ratings, reviews, and plays'),
            iconType: 'svg',
            iconSvg: BggIconComponent
          },
          {
            ...this.createLinkItem('Board Game Arena', this.config.socialLinks?.boardGaming?.bga, '', 'withyuva', 'Challenge me to a game!'),
            iconType: 'svg',
            iconSvg: BgaIconComponent
          },
          {
            ...this.createLinkItem('Box King Gaming', 'https://boxkinggaming.com/', 'pi pi-shopping-cart', 'Use code ROLLPASA for 10% off your order!', 'High-quality shelves, board game tables, organizers, and accessories.'),
            sponsored: true,
            couponCode: 'ROLLPASA',
            discount: '10% off',
            isHotDeal: false
          },
        ]
      },
      {
        id: 'photography',
        title: 'Photography',
        icon: 'pi pi-camera',
        links: [
          this.createLinkItem('Street | Black & White', this.config.socialLinks?.photography?.street?.instagram, 'pi pi-instagram', '@withyuva', 'Capturing moments in the urban landscape'),
          {
            ...this.createLinkItem('Street on Threads', this.config.socialLinks?.photography?.street?.threads, '', '@withyuva', 'Thoughts on street photography'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent,
            hide: true,
          },
          this.createLinkItem('Portraits & Moments', this.config.socialLinks?.photography?.portrait?.instagram, 'pi pi-instagram', '@timelessbyyuva', 'Timeless portraits and moments'),
          {
            ...this.createLinkItem('Portraits on Threads', this.config.socialLinks?.photography?.portrait?.threads, '', 'Portrait photography', 'Behind the scenes and more'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent,
            hide: true,
          }
        ]
      },
      {
        id: 'music',
        title: 'Music',
        icon: 'pi pi-music',
        links: [
          {
            ...this.createLinkItem('SoundCloud', this.config.socialLinks?.music?.soundcloud, '', 'sagunpandey', 'Listen to my latest tracks and mixes'),
            iconType: 'svg',
            iconSvg: SoundcloudIconComponent
          }
        ]
      },
      {
        id: 'personal',
        title: 'Personal',
        icon: 'pi pi-user',
        links: [
          this.createLinkItem('Instagram', this.config.socialLinks?.personal?.instagram, 'pi pi-instagram', '@sagun.pandey', 'Glimpses of my daily life and adventures'),
          {
            ...this.createLinkItem('Facebook', this.config.socialLinks?.personal?.facebook, 'pi pi-facebook', '@sagun.pandey', 'Connect with me on social media'),
            hide: true
          },
          this.createLinkItem('TikTok', this.config.socialLinks?.personal?.tiktok, 'pi pi-tiktok', '@sagun.pandey', 'Quick, fun videos from my world'),
          this.createLinkItem('YouTube', this.config.socialLinks?.personal?.youtube, 'pi pi-youtube', '@withyuva', 'Subscribe for my latest uploads'),
          {
            ...this.createLinkItem('Threads', this.config.socialLinks?.personal?.threads, '', '@sagun.pandey', 'Join the conversation'),
            iconType: 'svg',
            iconSvg: ThreadIconComponent
          },
          this.createLinkItem('X', this.config.socialLinks?.personal?.x, 'pi pi-twitter', '@sagunpandey', 'Tweets and thoughts')
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

  private async pinCategory(categoryId: string): Promise<void> {
    // Create a new array reference to trigger change detection
    const currentCategories = [...this.categories];
    const categoryIndex = currentCategories.findIndex(
      c => c.id.toLowerCase() === categoryId.toLowerCase()
    );

    // Only proceed if the category is found and it's not already the first item
    if (categoryIndex >= 0) {
      // Create a new array with the selected category first
      this.categories = [
        {...currentCategories[categoryIndex]}, // Create new object reference
        ...currentCategories.slice(0, categoryIndex),
        ...currentCategories.slice(categoryIndex + 1)
      ];

      // Update selectedCategory to use the ID
      this.selectedCategory = categoryId;

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

  /**
   * Returns a filtered array of links where hide is not true
   * @param links The array of links to filter
   */
  getRegularLinks(links: LinkItem[]): LinkItem[] {
    return links.filter(link => !link.hide && !link.sponsored);
  }

  getSponsoredLinks(links: LinkItem[]): LinkItem[] {
    return links.filter(link => !link.hide && link.sponsored);
  }

  hasSponsoredLinks(links: LinkItem[]): boolean {
    return links.some(link => !link.hide && link.sponsored);
  }

  getVisibleLinks(links: LinkItem[]): LinkItem[] {
    return links.filter(link => !link.hide);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here if you'd like
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }
}
