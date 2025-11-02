import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig = {
    appName: 'Yuva Studio',
    author: 'Sagun Pandey',
    bio: 'Board Gamer • Photographer • Musician • Developer',
    socialLinks: {
      // Professional
      github: 'https://github.com/sagunpandey',
      linkedin: 'https://linkedin.com/in/sagunpandey',
      // Personal
      facebook: 'https://facebook.com/yourusername',
      tiktok: 'https://tiktok.com/@yourusername',
      youtube: 'https://youtube.com/yourchannel',
      instagram: 'https://instagram.com/yourusername',
      x: 'https://x.com/yourusername',
      threads: 'https://threads.net/@yourusername',
      // Board Gaming
      boardGaming: {
        instagram: 'https://instagram.com/yourboardgaming',
        threads: 'https://threads.net/@yourboardgaming'
      },
      // Photography
      photography: {
        street: {
          instagram: 'https://instagram.com/yourstreetphoto',
          threads: 'https://threads.net/@yourstreetphoto'
        },
        portrait: {
          instagram: 'https://instagram.com/yourportraitphoto',
          threads: 'https://threads.net/@yourportraitphoto'
        }
      }
    },
    footer: {
      privacyPolicy: '#',
      termsOfService: '#',
      contact: '#'
    }
  };

  get appName(): string {
    return this.appConfig.appName;
  }

  get author(): string {
    return this.appConfig.author;
  }

  get socialLinks() {
    return this.appConfig.socialLinks;
  }

  get footerLinks() {
    return this.appConfig.footer;
  }
}
