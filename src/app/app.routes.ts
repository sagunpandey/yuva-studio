import { Routes } from '@angular/router';
import { LinkTreeComponent } from './features/link-tree/link-tree.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './features/home/home.component';
import { ConfigService } from './core/services/config.service';
import { BlogComponent } from './features/blog/blog.component';
import { SoftwareEngineerComponent } from './features/software-engineer/software-engineer.component';
import { BoardGamerComponent } from './features/board-gamer/board-gamer.component';
import {MusicComponent} from './features/music/music.component';
const config = new ConfigService();

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: config.appName
  },
  {
    path: 'software-engineer',
    component: SoftwareEngineerComponent,
    title: 'Software Engineer | ' + config.appName
  },
  {
    path: 'board-gamer',
    component: BoardGamerComponent,
    title: 'Board Gamer | ' + config.appName
  },
  {
    path: 'music',
    component: MusicComponent,
    title: 'Music | ' + config.appName
  },
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Blog | ' + config.appName
  },
  {
    path: 'blog/:slug',
    component: BlogComponent,
    title: 'Blog | ' + config.appName
  },
  {
    path: 'links',
    component: LinkTreeComponent,
    title: 'Links | ' + config.appName
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy | ' + config.appName
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
