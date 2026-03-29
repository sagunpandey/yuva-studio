import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
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
export class HeaderNavComponent implements OnInit {
  private config = inject(ConfigService);
  private hostElement = inject(ElementRef<HTMLElement>);
  isMobile = false;
  menuVisible = false;
  gravatarUrl = this.config.gravatarUrl;

  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home', styleClass: 'menu-item' },
    { label: 'Blog', icon: 'pi pi-book', routerLink: '/blog', styleClass: 'menu-item' },
    { label: 'Technology', icon: 'pi pi-code', routerLink: '/software-engineer', styleClass: 'menu-item' },
    { label: 'Photography', icon: 'pi pi-camera', routerLink: '/photographer', styleClass: 'menu-item' },
    { label: 'Board Gaming', icon: 'pi pi-th-large', routerLink: '/board-gamer', styleClass: 'menu-item' },
    { label: 'Music', icon: 'pi pi-headphones', routerLink: '/music', styleClass: 'menu-item' },
    { label: 'Links', icon: 'pi pi-share-alt', routerLink: '/links', styleClass: 'menu-item' }
  ];

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMobile || !this.menuVisible) {
      return;
    }

    const target = event.target;
    if (target instanceof Node && !this.hostElement.nativeElement.contains(target)) {
      this.menuVisible = false;
    }
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
