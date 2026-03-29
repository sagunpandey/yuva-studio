import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SocialLink } from '../../shared/components/social-links/social-links.component';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogPost, BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-software-engineer',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, DialogModule, SocialLinksComponent],
  templateUrl: './software-engineer.component.html',
  styleUrls: ['./software-engineer.component.scss']
})
export class SoftwareEngineerComponent implements OnInit {
  protected readonly config = inject(ConfigService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private blogService = inject(BlogService);
  private cdr = inject(ChangeDetectorRef);

  displayResumeDialog = false;
  resumeHtml: SafeHtml = '';
  engineeringBlogs: BlogPost[] = [];
  blogsLoading = true;

  socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      icon: 'pi pi-linkedin',
      url: 'https://linkedin.com/in/your-profile'
    },
    {
      name: 'GitHub',
      icon: 'pi pi-github',
      url: 'https://github.com/your-username'
    },
    {
      name: 'Links',
      icon: 'pi pi-share-alt',
      url: '/links'
    }
  ];


  engineeringProjects: { title: string; description: string; tech: string }[] = [];

  ngOnInit() {
    this.loadResume();
    this.blogService.getPostsByCategory('programmer').subscribe({
      next: (posts) => {
        this.engineeringBlogs = posts.slice(0, 6);
        this.blogsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.blogsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadResume() {
    this.http.get('/resume.md', { responseType: 'text' }).subscribe({
      next: (markdown) => {
        const html = marked.parse(markdown);
        this.resumeHtml = this.sanitizer.bypassSecurityTrustHtml(html as string);
      },
      error: (err) => {
        console.error('Error loading resume:', err);
        this.resumeHtml = this.sanitizer.bypassSecurityTrustHtml('<p>Error loading resume. Please try again later.</p>');
      }
    });
  }

  showResumeDialog() {
    this.displayResumeDialog = true;
  }

  downloadResume() {
    // Get the actual resume HTML from the modal (parsed from markdown)
    const modalElement = document.querySelector('.resume-content');

    if (!modalElement) {
      console.error('Resume content not found');
      return;
    }

    // Clone the element to avoid modifying the original
    const resumeElement = modalElement.cloneNode(true) as HTMLElement;

    // Wrap it in a proper HTML document for PDF conversion
    const resumeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sagun Pandey - Resume</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.5;
            color: #000;
            font-size: 12px;
            overflow: visible;
          }
          h1 {
            font-size: 20px;
            margin: 0 0 3px 0;
            font-weight: bold;
            line-height: 1.2;
          }
          h2 {
            font-size: 14px;
            margin: 12px 0 6px 0;
            border-bottom: 2px solid #000;
            padding-bottom: 4px;
            font-weight: bold;
            line-height: 1.2;
          }
          h3 {
            font-size: 12px;
            margin: 8px 0 2px 0;
            font-weight: bold;
            line-height: 1.2;
          }
          p {
            margin: 2px 0 4px 0;
            line-height: 1.4;
            font-size: 12px;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          ul {
            margin: 4px 0 8px 20px;
            padding-left: 0;
            list-style-position: outside;
          }
          li {
            margin: 2px 0;
            line-height: 1.4;
            font-size: 12px;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          strong {
            font-weight: 700;
          }
          a {
            color: #0066cc;
            text-decoration: none;
          }
          .resume-content {
            padding: 0;
            width: 100%;
          }
          hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 8px 0;
          }
          code {
            font-family: 'Courier New', monospace;
            background: #f5f5f5;
            padding: 2px 4px;
            font-size: 11px;
          }
          blockquote {
            margin-left: 20px;
            border-left: 3px solid #ccc;
            padding-left: 10px;
          }
          /* Ensure no overflow */
          div, section, article {
            overflow: visible;
          }
          /* Prevent breaking in the middle of elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }
          ul, ol {
            page-break-inside: avoid;
          }
          li {
            page-break-inside: avoid;
          }
          p {
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        <div class="resume-content">
          ${resumeElement.innerHTML}
        </div>
      </body>
      </html>
    `;

    // Use html2pdf to convert to PDF with optimized settings
    const opt = {
      margin: [12, 12, 12, 12] as [number, number, number, number],
      filename: 'Sagun_Pandey_Resume.pdf',
      image: { type: 'png' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowHeight: 1400
      },
      jsPDF: {
        orientation: 'portrait' as const,
        unit: 'mm' as const,
        format: 'a4',
        compress: false
      }
    };

    // Dynamically import and use html2pdf
    import('html2pdf.js').then((module) => {
      const html2pdf = module.default;
      const element = document.createElement('div');
      element.innerHTML = resumeHtml;
      element.style.width = '210mm';
      element.style.padding = '0';
      element.style.margin = '0';
      html2pdf().set(opt).from(element).save().catch((err) => {
        console.error('PDF generation error:', err);
      });
    }).catch((err) => {
      console.error('Error importing html2pdf:', err);
    });
  }
}

