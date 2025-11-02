import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soundcloud-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M0 10.9c0 1.1.4 1.9 1.2 2.5.8.6 1.6.8 2.5.6 1.1-.2 1.8-.5 2.3-1 .4-.4.6-1.2.6-2.2V9.1c0-.9-.3-1.6-1-2.2-.6-.6-1.3-.9-2.2-.9-.8 0-1.5.3-2.1.9C.3 7.5 0 8.3 0 9.2v1.7zm9.4 5.1c0 .8.3 1.4.9 1.8.6.4 1.3.6 2.1.6.9 0 1.6-.2 2.2-.6.6-.4.9-1 .9-1.8V7.3c0-.8-.3-1.5-.9-2.1-.6-.6-1.3-.9-2.1-.9-.8 0-1.5.3-2.1.9s-.9 1.3-.9 2.1v8.7zm9.3 1.3c0 .8.3 1.4.9 1.8.6.4 1.3.6 2.2.6.9 0 1.6-.2 2.1-.6.6-.4.9-1 .9-1.8V9.9c0-.9-.3-1.6-.9-2.2-.6-.6-1.3-.9-2.1-.9-.9 0-1.6.3-2.2.9s-.9 1.3-.9 2.2v8.5zm9.3.1c0 .8.3 1.4.9 1.8.6.4 1.3.6 2.2.6.9 0 1.7-.2 2.2-.6.6-.4.9-1 .9-1.8V10c0-.9-.3-1.6-.9-2.2-.6-.6-1.3-.9-2.2-.9-.9 0-1.6.3-2.2.9s-.9 1.3-.9 2.2v7.7z"/>
    </svg>
  `,
  styles: [`:host { display: inline-flex; }`]
})
export class SoundcloudIconComponent { }
