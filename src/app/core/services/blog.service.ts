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

export type BlogIndexEntry = Omit<BlogPost, 'content'> & { file?: string };

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private blogsCache = new Map<string, BlogPost>();
  private categoryIndexCache = new Map<string, Observable<BlogIndexEntry[]>>();

  /** All known blog categories that have posts */
  readonly categories = ['programmer', 'board-gamer'] as const;

  /** Get all posts across all categories, sorted by date desc */
  getBlogPosts(): Observable<BlogPost[]> {
    const all$ = this.categories.map((cat) => this.getCategoryIndex(cat));
    return new Observable((observer) => {
      const results: BlogIndexEntry[][] = [];
      let completed = 0;
      all$.forEach((obs$, i) => {
        obs$.subscribe({
          next: (entries) => { results[i] = entries; },
          error: () => { results[i] = []; },
          complete: () => {
            completed++;
            if (completed === all$.length) {
              const flat = results.flat().map((e) => ({ ...e, content: '' }));
              flat.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              observer.next(flat);
              observer.complete();
            }
          }
        });
      });
    });
  }

  /** Get posts for a single category, sorted by date desc */
  getPostsByCategory(category: string): Observable<BlogPost[]> {
    return this.getCategoryIndex(category).pipe(
      map((entries) =>
        entries
          .map((e) => ({ ...e, content: '' }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    );
  }

  /** Get a single post by category + slug */
  getBlogPost(slug: string, category?: string): Observable<BlogPost> {
    const cacheKey = `${category ?? 'any'}:${slug}`;
    if (this.blogsCache.has(cacheKey)) {
      return of(this.blogsCache.get(cacheKey)!);
    }

    const resolve$ = category
      ? this.getCategoryIndex(category).pipe(map((entries) => entries.find((e) => e.slug === slug)))
      : this.getBlogPosts().pipe(map((posts) => posts.find((p) => p.slug === slug) as BlogIndexEntry | undefined));

    return resolve$.pipe(
      switchMap((entry) => {
        const cat = entry?.category ?? category ?? 'programmer';
        const file = entry?.file ?? `${slug}.md`;
        const url = `/assets/blogs/${cat}/${file}`;

        return this.http.get(url, { responseType: 'text' }).pipe(
          timeout(5000),
          map((content) => {
            const post = this.parseMarkdownPost(slug, content, entry);
            this.blogsCache.set(cacheKey, post);
            return post;
          }),
          catchError((err) => {
            const fallback = this.createFallbackPost(slug, entry, url, err);
            this.blogsCache.set(cacheKey, fallback);
            return of(fallback);
          })
        );
      })
    );
  }

  private getCategoryIndex(category: string): Observable<BlogIndexEntry[]> {
    if (!this.categoryIndexCache.has(category)) {
      const obs$ = this.http.get<BlogIndexEntry[]>(`/assets/blogs/${category}/index.json`).pipe(
        timeout(5000),
        map((entries) => entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
        catchError(() => of([])),
        shareReplay(1)
      );
      this.categoryIndexCache.set(category, obs$);
    }
    return this.categoryIndexCache.get(category)!;
  }

  private parseMarkdownPost(slug: string, content: string, entry?: BlogIndexEntry): BlogPost {
    const normalized = content.replace(/\r\n/g, '\n');
    const defaultPost: BlogPost = {
      slug,
      file: entry?.file ?? `${slug}.md`,
      title: entry?.title ?? this.slugToTitle(slug),
      date: entry?.date ?? new Date().toISOString().split('T')[0],
      category: entry?.category ?? 'programmer',
      excerpt: entry?.excerpt ?? '',
      author: entry?.author,
      tags: entry?.tags ?? [],
      content: normalized
    };

    const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      if (!defaultPost.excerpt) defaultPost.excerpt = this.extractExcerpt(normalized);
      return defaultPost;
    }

    const frontmatter = this.parseFrontmatter(match[1]);
    const body = match[2];
    const post: BlogPost = { ...defaultPost, ...frontmatter, slug, content: body };
    if (!post.excerpt) post.excerpt = this.extractExcerpt(body);
    return post;
  }

  private parseFrontmatter(frontmatter: string): Partial<BlogPost> {
    const metadata: Partial<BlogPost> = {};
    for (const line of frontmatter.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
      switch (key.trim()) {
        case 'title': metadata.title = value; break;
        case 'date': metadata.date = value; break;
        case 'category': metadata.category = value; break;
        case 'excerpt': metadata.excerpt = value; break;
        case 'author': metadata.author = value; break;
        case 'tags': metadata.tags = value.split(',').map((t) => t.trim()).filter(Boolean); break;
      }
    }
    return metadata;
  }

  private extractExcerpt(content: string): string {
    const para = content.split('\n\n').map((c) => c.trim()).find((c) => c && !c.startsWith('#'));
    const text = para ?? content.trim();
    return text.slice(0, 180) + (text.length > 180 ? '...' : '');
  }

  private createFallbackPost(slug: string, entry: BlogIndexEntry | undefined, url: string, err: { status?: number; message?: string }): BlogPost {
    return {
      slug,
      file: entry?.file ?? `${slug}.md`,
      title: entry?.title ?? this.slugToTitle(slug),
      date: entry?.date ?? new Date().toISOString().split('T')[0],
      category: entry?.category ?? 'programmer',
      excerpt: entry?.excerpt ?? 'Failed to load',
      content: `# Failed to Load\n\n- URL: ${url}\n- Status: ${err.status ?? 'unknown'}\n- Message: ${err.message ?? 'unknown'}`,
      author: entry?.author,
      tags: entry?.tags ?? []
    };
  }

  private slugToTitle(slug: string): string {
    return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}
