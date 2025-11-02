import { Routes } from '@angular/router';
import { LinkTreeComponent } from './features/link-tree/link-tree.component';
import { ConfigService } from './core/services/config.service';

const config = new ConfigService();

export const routes: Routes = [
  {
    path: '',
    component: LinkTreeComponent,
    title: config.appName
  },
  {
    path: '**',
    redirectTo: ''
  }
];
