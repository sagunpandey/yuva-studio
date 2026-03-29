import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SocialLink } from '../../shared/components/social-links/social-links.component';
import { SanitizeUrlPipe } from '../../shared/pipes/sanitize-url.pipe';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, SocialLinksComponent, SanitizeUrlPipe],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {
  protected readonly config = inject(ConfigService);

  socialLinks: SocialLink[] = [
    {
      name: 'SoundCloud',
      icon: 'pi pi-music',
      url: 'https://soundcloud.com/your-username'
    },
    {
      name: 'YouTube',
      icon: 'pi pi-youtube',
      url: 'https://youtube.com/@your-channel'
    },
    {
      name: 'Links',
      icon: 'pi pi-share-alt',
      url: '/links',
      queryParams: { category: 'music' }
    }
  ];

  soundcloudTracks = [
    {
      trackUrl: 'https://soundcloud.com/sagunpandey/dhatera-pani',
      title: 'Dhatera Pani',
      description: 'A Soulful Melody'
    },
    {
      trackUrl: 'https://soundcloud.com/sagunpandey/timile-chhodi-gaye-ni',
      title: 'Timile Chhodi Gaye Ni',
      description: 'Emotional and Heartfelt'
    },
    {
      trackUrl: 'https://soundcloud.com/sagunpandey/kehi-mitho-cover-pnb-productions',
      title: 'Kehi Mitho (Pringles Cover)',
      description: 'PNB Productions Cover'
    }
  ];

  youtubeVideos = [
    {
      videoId: 'pwxoL_UlZvU',
      title: 'Music Video',
      artist: 'YouTube'
    }
  ];
}

