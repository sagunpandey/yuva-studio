import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
  private cdr = inject(ChangeDetectorRef);
  protected readonly config = inject(ConfigService);

  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  loading = true;
  isDetailView = false;
  categoryFilter = 'all';
  tagFilter = 'all';
  searchTerm = '';
  categories: string[] = [];
  tags: string[] = [];
  private syncingFromQuery = false;

  private readonly categoryMeta: Record<string, { title: string; lead: string }> = {
    programmer: { title: 'Engineering Insights', lead: 'Thoughts and learnings from my journey as a software engineer' },
    'board-gamer': { title: 'Game Design Insights', lead: 'Thoughts on board game design, mechanics, and what makes games great' },
    photographer: { title: 'Photography Journal', lead: 'Perspectives behind the lens — streets, portraits, and moments' },
    singer: { title: 'Music Musings', lead: 'Notes on rhythm, melody, and the joy of making music' },
    life: { title: 'Life', lead: 'Curiosity, balance, and everything in between' },
    all: { title: 'All Posts', lead: 'Everything I have written across all categories' }
  };

  get pageTitle(): string {
    return this.categoryMeta[this.categoryFilter]?.title ?? 'Blog';
  }

  get pageLead(): string {
    return this.categoryMeta[this.categoryFilter]?.lead ?? '';
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.syncingFromQuery = true;
      this.categoryFilter = queryParams.get('category') ?? 'all';
      this.tagFilter = queryParams.get('tag') ?? 'all';
      this.searchTerm = queryParams.get('q') ?? '';
      this.syncingFromQuery = false;
      this.cdr.detectChanges();
    });

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
        this.categories = this.buildCategoryOptions(posts);
        this.tags = this.buildTagOptions(posts);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.blogPosts = [];
        this.loading = false;
        this.cdr.detectChanges();
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.selectedPost = null;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  parseMarkdown(content: string): string {
    return marked.parse(content, { async: false }) as string;
  }

  goBack(): void {
    this.router.navigate(['/blog'], {
      queryParams: this.buildQueryParams()
    });
  }

  get filteredBlogPosts(): BlogPost[] {
    const normalizedSearch = this.searchTerm.trim().toLowerCase();

    return this.blogPosts.filter((post) => {
      const categoryMatches = this.categoryFilter === 'all' || post.category === this.categoryFilter;
      const tagMatches =
        this.tagFilter === 'all' || (post.tags ?? []).some((tag) => tag.toLowerCase() === this.tagFilter);

      if (!normalizedSearch) {
        return categoryMatches && tagMatches;
      }

      const haystack = [post.title, post.excerpt, post.category, ...(post.tags ?? [])]
        .join(' ')
        .toLowerCase();

      return categoryMatches && tagMatches && haystack.includes(normalizedSearch);
    });
  }

  setCategoryFilter(category: string): void {
    this.categoryFilter = category;
    this.syncQueryParams();
  }

  setTagFilter(tag: string): void {
    this.tagFilter = tag;
    this.syncQueryParams();
  }

  setSearchTerm(value: string): void {
    this.searchTerm = value;
    this.syncQueryParams();
  }

  clearFilters(): void {
    this.categoryFilter = 'all';
    this.tagFilter = 'all';
    this.searchTerm = '';
    this.syncQueryParams();
  }

  applyCategoryFilter(category: string): void {
    if (!category) {
      return;
    }

    if (this.isDetailView) {
      this.router.navigate(['/blog'], {
        queryParams: { category }
      });
      return;
    }

    this.categoryFilter = category;
    this.syncQueryParams();
  }

  applyTagFilter(tag: string): void {
    if (!tag) {
      return;
    }

    if (this.isDetailView) {
      this.router.navigate(['/blog'], {
        queryParams: { tag }
      });
      return;
    }

    this.tagFilter = tag;
    this.syncQueryParams();
  }

  private syncQueryParams(): void {
    if (this.syncingFromQuery || this.isDetailView) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.buildQueryParams(),
      replaceUrl: true
    });
  }

  buildQueryParams(): Params {
    return {
      category: this.categoryFilter !== 'all' ? this.categoryFilter : null,
      tag: this.tagFilter !== 'all' ? this.tagFilter : null,
      q: this.searchTerm.trim() ? this.searchTerm.trim() : null
    };
  }

  private buildCategoryOptions(posts: BlogPost[]): string[] {
    return Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort();
  }

  private buildTagOptions(posts: BlogPost[]): string[] {
    return Array.from(
      new Set(
        posts
          .flatMap((post) => post.tags ?? [])
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    ).sort();
  }
}
