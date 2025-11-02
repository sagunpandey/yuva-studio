import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig = {
    appName: 'Sagun Pandey | Professional Nerd',
    author: 'Sagun Pandey',
    email: 'sag.pan@gmail.com',
    bio: 'while (true) { geek_out(); }',
    socialLinks: {
      // Personal
      personal: {
        facebook: 'https://www.facebook.com/sagun.pandey',
        tiktok: 'https://tiktok.com/@sagun.pandey',
        youtube: 'https://www.youtube.com/@withyuva',
        instagram: 'https://www.instagram.com/sagun.pandey',
        x: 'https://x.com/sagunpandey',
        threads: 'https://threads.net/@sagun.pandey',
        website: 'https://sagunpandey.com',
      },
      programming: {
        github: 'https://github.com/sagunpandey',
        linkedin: 'https://www.linkedin.com/in/sagunpandey',
      },
      boardGaming: {
        instagram: 'https://instagram.com/rollpasa',
        tiktok: 'https://tiktok.com/@rollpasa',
        youtube: 'https://www.youtube.com/@rollpasa',
        threads: 'https://threads.net/@rollpasa',
        bgg: 'https://boardgamegeek.com/user/withyuva',
        bga: 'https://boardgamearena.com/player?id=97163770'
      },
      music: {
        soundcloud: 'https://soundcloud.com/sagunpandey'
      },
      photography: {
        street: {
          instagram: 'https://instagram.com/withyuva',
          threads: 'https://www.threads.com/@withyuva'
        },
        portrait: {
          instagram: 'https://instagram.com/timelessbyyuva',
          threads: 'https://threads.net/@timelessbyyuva'
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

  get bio(): string {
    return this.appConfig.bio;
  }

  get author(): string {
    return this.appConfig.author;
  }

  get email(): string {
    return this.appConfig.email;
  }

  get gravatarUrl(): string {
    // 1. Trim and lowercase the email
    const email = this.email.trim().toLowerCase();

    // 2. Generate the SHA256 hash
    const hash = SHA256(email).toString();

    // 3. Return the full URL
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  }

  get socialLinks() {
    return this.appConfig.socialLinks;
  }

  get footerLinks() {
    return this.appConfig.footer;
  }
}
