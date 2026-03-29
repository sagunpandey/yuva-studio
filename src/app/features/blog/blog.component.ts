import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { marked } from 'marked';
import { BlogPost, BlogService } from '../../core/services/blog.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly config = inject(ConfigService);

  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  loading = true;
  isDetailView = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadBlogPost(slug);
        return;
      }

      this.loadBlogs();
    });
  }

  loadBlogs(): void {
    this.loading = true;
    this.isDetailView = false;
    this.selectedPost = null;

    this.blogService.getBlogPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.loading = false;
      },
      error: () => {
        this.blogPosts = [];
        this.loading = false;
      }
    });
  }

  loadBlogPost(slug: string): void {
    this.loading = true;
    this.isDetailView = true;

    this.blogService.getBlogPost(slug).subscribe({
      next: (post) => {
        this.selectedPost = post;
        this.loading = false;
      },
      error: () => {
        this.selectedPost = null;
        this.loading = false;
      }
    });
  }

  parseMarkdown(content: string): string {
    return marked.parse(content, { async: false }) as string;
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }
}
