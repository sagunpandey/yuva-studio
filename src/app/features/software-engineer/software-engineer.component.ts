import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfigService } from '../../core/services/config.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { SocialLink } from '../../shared/components/social-links/social-links.component';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-software-engineer',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, SocialLinksComponent],
  templateUrl: './software-engineer.component.html',
  styleUrls: ['./software-engineer.component.scss']
})
export class SoftwareEngineerComponent {
  protected readonly config = inject(ConfigService);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  displayResumeDialog = false;
  resumeHtml: SafeHtml = '';

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

  engineeringBlogs = [
    {
      title: 'Building Scalable Architectures',
      date: '2026-01-15',
      summary: 'Lessons learned from designing systems that grow with your business. Exploring microservices, event-driven architectures, and cloud-native solutions.'
    },
    {
      title: 'The Art of Clean Code',
      date: '2026-01-10',
      summary: 'Why code readability matters and practical tips for writing code that your future self will thank you for. SOLID principles, design patterns, and more.'
    },
    {
      title: 'TypeScript Best Practices',
      date: '2025-12-20',
      summary: 'Mastering TypeScript to catch bugs early and write safer code. Advanced types, generics, and how to leverage the type system effectively.'
    },
    {
      title: 'Performance Optimization Guide',
      date: '2025-12-10',
      summary: 'Practical techniques for identifying and fixing performance bottlenecks in web applications. Profiling, caching, and optimization strategies.'
    },
    {
      title: 'Testing Strategies for Reliable Code',
      date: '2025-11-25',
      summary: 'Unit testing, integration testing, and end-to-end testing. Building confidence in your code with comprehensive test coverage and best practices.'
    },
    {
      title: 'DevOps Essentials for Developers',
      date: '2025-11-15',
      summary: 'Understanding CI/CD pipelines, Docker containerization, and cloud deployment. Making your development and deployment process smooth and efficient.'
    }
  ];

  engineeringProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution built with Angular and Node.js. Features include product catalog, shopping cart, payment integration, and admin dashboard.',
      tech: 'Angular, Node.js, MongoDB, Stripe'
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Web app enabling teams to collaborate in real-time. Includes live document editing, comments, and presence indicators using WebSockets.',
      tech: 'React, WebSockets, Firebase, Tailwind'
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for analyzing and visualizing complex datasets. Built with responsive design and advanced charting capabilities.',
      tech: 'TypeScript, D3.js, PostgreSQL, Express'
    },
    {
      title: 'Mobile App Framework',
      description: 'Cross-platform mobile framework for rapid app development. Streamlines common patterns and provides reusable components.',
      tech: 'React Native, Redux, TypeScript'
    },
    {
      title: 'API Gateway Service',
      description: 'Microservices API gateway handling authentication, rate limiting, and request routing. Built for high availability and scalability.',
      tech: 'Node.js, Express, Redis, Docker'
    },
    {
      title: 'Machine Learning Pipeline',
      description: 'End-to-end ML pipeline for data processing and model training. Includes data validation, feature engineering, and automated retraining.',
      tech: 'Python, TensorFlow, Apache Spark'
    }
  ];

  ngOnInit() {
    this.loadResume();
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

