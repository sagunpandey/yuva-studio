import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SocialLink } from '../../shared/components/social-links/social-links.component';
import { BlogPost, BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-board-gamer',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SocialLinksComponent],
  templateUrl: './board-gamer.component.html',
  styleUrls: ['./board-gamer.component.scss']
})
export class BoardGamerComponent implements OnInit {
  protected readonly config = inject(ConfigService);
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  gameInsights: BlogPost[] = [];
  insightsLoading = true;

  socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: 'pi pi-instagram',
      url: 'https://instagram.com/your-handle'
    },
    {
      name: 'TikTok',
      icon: 'pi pi-video',
      url: 'https://tiktok.com/@your-handle'
    },
    {
      name: 'YouTube',
      icon: 'pi pi-youtube',
      url: 'https://youtube.com/@your-channel'
    },
    {
      name: 'Links',
      icon: 'pi pi-share-alt',
      url: '/links'
    }
  ];

  ngOnInit() {
    this.blogService.getPostsByCategory('board-gamer').subscribe({
      next: (posts) => {
        this.gameInsights = posts.slice(0, 6);
        this.insightsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.insightsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToBoardGameGeekProfile() {
    window.open('https://boardgamegeek.com/user/your-username', '_blank');
  }
}

