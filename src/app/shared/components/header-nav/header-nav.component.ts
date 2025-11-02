import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ButtonModule, 
    ToolbarModule, 
    MenuModule,
    RippleModule
  ],
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  private config = inject(ConfigService);
  isMobile = false;
  menuVisible = false;
  gravatarUrl = this.config.gravatarUrl;
  
  menuItems: MenuItem[] = [
    { label: 'Links', icon: 'pi pi-share-alt', routerLink: '/links', styleClass: 'menu-item' }
  ];

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.menuVisible = false;
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
