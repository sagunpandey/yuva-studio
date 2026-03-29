import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, timeout } from 'rxjs/operators';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  author?: string;
  tags?: string[];
  file?: string;
}

export type BlogIndexEntry = Omit<BlogPost, 'content'> & {
  file?: string;
};

type BlogIndexFileEntry = string | Partial<BlogIndexEntry>;

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private blogsCache = new Map<string, BlogPost>();
  private blogIndex$?: Observable<BlogIndexEntry[]>;

  /**
   * Get all blog posts
   */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.getBlogIndex().pipe(
      map((entries) =>
        entries
          .map((entry) => ({ ...entry, content: '' }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    );
  }

  /**
   * Get a single blog post by slug
   */
  getBlogPost(slug: string): Observable<BlogPost> {
    const cachedPost = this.blogsCache.get(slug);
    if (cachedPost) {
      return of(cachedPost);
    }

    return this.getBlogIndex().pipe(
      map((entries) => entries.find((entry) => entry.slug === slug)),
      switchMap((entry) => {
        const file = entry?.file ?? `${slug}.md`;
        const url = `/assets/blogs/${file}`;

        return this.http.get(url, { responseType: 'text' }).pipe(
          timeout(5000),
          map((content) => {
            const post = this.parseMarkdownPost(slug, content, entry);
            this.blogsCache.set(slug, post);
            return post;
          }),
          catchError((err) => {
            const fallbackPost = this.createFallbackPost(slug, entry, url, err);
            this.blogsCache.set(slug, fallbackPost);
            return of(fallbackPost);
          })
        );
      })
    );
  }

  /**
   * Get blogs by category
   */
  getBlogsByCategory(category: string): Observable<BlogPost[]> {
    return this.getBlogPosts().pipe(
      map((posts) => posts.filter((post) => post.category === category))
    );
  }

  /**
   * Get blog index from manifest
   */
  private getBlogIndex(): Observable<BlogIndexEntry[]> {
    if (!this.blogIndex$) {
      this.blogIndex$ = this.http.get<BlogIndexFileEntry[]>('/assets/blogs/index.json').pipe(
        timeout(5000),
        map((entries) => entries.map((entry) => this.normalizeIndexEntry(entry)).filter(Boolean) as BlogIndexEntry[]),
        map((entries) =>
          entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        ),
        catchError(() => of([])),
        shareReplay(1)
      );
    }

    return this.blogIndex$;
  }

  /**
   * Normalize index entry from manifest
   */
  private normalizeIndexEntry(entry: BlogIndexFileEntry): BlogIndexEntry | null {
    if (typeof entry === 'string') {
      const file = entry;
      const slug = file.replace(/\.md$/i, '');

      return {
        slug,
        file,
        title: this.slugToTitle(slug),
        date: '1970-01-01',
        category: 'software-engineering',
        excerpt: ''
      };
    }

    const slug = entry.slug ?? (entry.file ? entry.file.replace(/\.md$/i, '') : undefined);
    if (!slug) {
      return null;
    }

    return {
      slug,
      file: entry.file ?? `${slug}.md`,
      title: entry.title ?? this.slugToTitle(slug),
      date: entry.date ?? '1970-01-01',
      category: entry.category ?? 'software-engineering',
      excerpt: entry.excerpt ?? '',
      author: entry.author,
      tags: entry.tags ?? []
    };
  }

  /**
   * Parse markdown content and extract metadata
   */
  private parseMarkdownPost(slug: string, content: string, entry?: BlogIndexEntry): BlogPost {
    const defaultPost: BlogPost = {
      slug,
      file: entry?.file ?? `${slug}.md`,
      title: entry?.title ?? this.slugToTitle(slug),
      date: entry?.date ?? new Date().toISOString().split('T')[0],
      category: entry?.category ?? 'software-engineering',
      excerpt: entry?.excerpt ?? '',
      author: entry?.author,
      tags: entry?.tags ?? [],
      content
    };

    // Extract frontmatter if exists
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      if (!defaultPost.excerpt) {
        defaultPost.excerpt = this.extractExcerpt(content);
      }
      return defaultPost;
    }

    const frontmatter = this.parseFrontmatter(match[1]);
    const bodyContent = match[2];

    const parsedPost: BlogPost = {
      ...defaultPost,
      ...frontmatter,
      slug,
      content: bodyContent
    };

    if (!parsedPost.excerpt) {
      parsedPost.excerpt = this.extractExcerpt(bodyContent);
    }

    return parsedPost;
  }

  /**
   * Parse frontmatter string into metadata object
   */
  private parseFrontmatter(frontmatter: string): Partial<BlogPost> {
    const metadata: Partial<BlogPost> = {};

    frontmatter.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        return;
      }

      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');

      switch (key.trim()) {
        case 'title':
          metadata.title = value;
          break;
        case 'date':
          metadata.date = value;
          break;
        case 'category':
          metadata.category = value;
          break;
        case 'excerpt':
          metadata.excerpt = value;
          break;
        case 'author':
          metadata.author = value;
          break;
        case 'tags':
          metadata.tags = value
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
          break;
      }
    });

    return metadata;
  }

  /**
   * Extract excerpt from content
   */
  private extractExcerpt(content: string): string {
    const paragraph = content
      .split('\n\n')
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk && !chunk.startsWith('#'));

    const excerpt = paragraph ?? content.trim();
    return excerpt.slice(0, 180) + (excerpt.length > 180 ? '...' : '');
  }

  /**
   * Create a fallback post in case of error
   */
  private createFallbackPost(
    slug: string,
    entry: BlogIndexEntry | undefined,
    url: string,
    err: { status?: number; message?: string }
  ): BlogPost {
    return {
      slug,
      file: entry?.file ?? `${slug}.md`,
      title: entry?.title ?? this.slugToTitle(slug),
      date: entry?.date ?? new Date().toISOString().split('T')[0],
      category: entry?.category ?? 'software-engineering',
      excerpt: entry?.excerpt ?? 'Blog post failed to load',
      content: `# Failed to Load\n\nCould not load blog post: ${slug}\n\n- URL: ${url}\n- Status: ${err.status ?? 'unknown'}\n- Message: ${err.message ?? 'unknown error'}`,
      author: entry?.author,
      tags: entry?.tags ?? []
    };
  }

  /**
   * Convert slug to readable title
   */
  private slugToTitle(slug: string): string {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
