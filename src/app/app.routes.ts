import { Routes } from '@angular/router';
import { LinkTreeComponent } from './features/link-tree/link-tree.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { ConfigService } from './core/services/config.service';

const config = new ConfigService();

export const routes: Routes = [
  {
    path: '',
    component: LinkTreeComponent,
    title: config.appName
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy | ' + config.appName
  },
  {
    path: '**',
    redirectTo: ''
  }
];
