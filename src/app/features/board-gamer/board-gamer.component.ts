import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SocialLink } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-board-gamer',
  standalone: true,
  imports: [CommonModule, ButtonModule, SocialLinksComponent],
  templateUrl: './board-gamer.component.html',
  styleUrls: ['./board-gamer.component.scss']
})
export class BoardGamerComponent {
  protected readonly config = inject(ConfigService);

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

  gameInsights = [
    {
      title: 'The Beauty of Asymmetric Game Design',
      date: '2026-01-15',
      summary: 'Exploring games where players have different abilities and goals. How asymmetry creates engaging and replayable experiences.'
    },
    {
      title: 'Engine Building Mechanics Explained',
      date: '2026-01-10',
      summary: 'Understanding engine building through the lens of successful games. How to design systems that grow in complexity and power.'
    },
    {
      title: 'The Art of Cooperative Storytelling',
      date: '2025-12-20',
      summary: 'How modern board games weave narrative and mechanics together. Legacy games and persistent storytelling in tabletop design.'
    },
    {
      title: 'Solo Gaming: Playing Alone Together',
      date: '2025-12-10',
      summary: 'The rise of solo modes in board games and how designers create engaging single-player experiences.'
    },
    {
      title: 'Theme vs Mechanics: Finding the Balance',
      date: '2025-11-25',
      summary: 'When theme serves mechanics and vice versa. Great games where story and systems work in harmony.'
    },
    {
      title: 'Gateway Games That Changed Everything',
      date: '2025-11-15',
      summary: 'The games that introduced millions to modern board gaming. What makes a game accessible yet engaging.'
    }
  ];

  goToBoardGameGeekProfile() {
    window.open('https://boardgamegeek.com/user/your-username', '_blank');
  }
}

