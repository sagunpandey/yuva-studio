import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  posts = [
    { title: 'Hello, world', date: '2026-01-01', summary: 'Kickstarting the blog. Replace with your real post.' },
    { title: 'Another thought', date: '2026-01-15', summary: 'A short take on something interesting.' },
    { title: 'Deep dive TBD', date: '2026-02-01', summary: 'Placeholder for a longer write-up.' }
  ];
}
