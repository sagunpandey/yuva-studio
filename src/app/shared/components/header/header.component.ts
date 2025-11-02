import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  template: `
    <div class="header">
      <div class="profile">
        <p-avatar
          icon="pi pi-user"
          size="xlarge"
          shape="circle"
          styleClass="profile-avatar"
        ></p-avatar>
        <h1>{{ author }}</h1>
        <p class="bio">{{ bio }}</p>
      </div>
    </div>
  `,
  styles: [`
    .header {
      text-align: center;
      margin-bottom: 2rem;

      .profile {
        .profile-avatar {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          margin-bottom: 1rem;
        }

        h1 {
          margin: 0.5rem 0;
          color: #e0e0e0;
          font-size: 2rem;
          font-weight: 600;
        }

        .bio {
          color: #a0a0a0;
          margin: 0.5rem 0 0;
          font-size: 1.1rem;
        }
      }
    }
  `]
})
export class HeaderComponent {
  @Input() author: string = '';
  @Input() bio: string = 'Software Engineer • Photographer • Gamer';
}
