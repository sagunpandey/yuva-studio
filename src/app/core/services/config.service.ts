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
