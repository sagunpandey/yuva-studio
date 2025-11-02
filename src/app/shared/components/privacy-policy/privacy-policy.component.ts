import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>Last updated: {{ currentDate | date:'longDate' }}</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> When you subscribe to our newsletter or contact us, we may collect your name and email address.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited, time spent, and referring website.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze site traffic. You can disable cookies in your browser settings.</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and maintain our website</li>
          <li>Improve user experience</li>
          <li>Send newsletters and updates (if subscribed)</li>
          <li>Analyze website usage and performance</li>
          <li>Display relevant advertisements (current and future)</li>
        </ul>
      </section>

      <section>
        <h2>3. Third-Party Services</h2>
        <p>We may use third-party services such as:</p>
        <ul>
          <li>Google Analytics for website analytics</li>
          <li>Advertising networks (current or future)</li>
          <li>Email marketing services</li>
        </ul>
        <p>These services may collect information about your use of our website and other websites.</p>
      </section>

      <section>
        <h2>4. Your Data Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Disable cookies in your browser</li>
        </ul>
      </section>

      <section>
        <h2>5. Children's Privacy</h2>
        <p>Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
      </section>

      <section>
        <h2>6. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:sag.pan@gmail.com">sag.pan@gmail.com</a>.</p>
      </section>

      <div class="back-links">
        <button (click)="goBack()" class="back-button">
          <i class="pi pi-arrow-left"></i> Back to Previous
        </button>
        <a href="https://sagunpandey.com" class="home-button">
          <i class="pi pi-home"></i> Back to Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .privacy-policy {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      line-height: 1.8;
      color: var(--text-primary);
      background: var(--bg-secondary);
      border-radius: 12px;
      box-shadow: var(--shadow);
      border: 1px solid var(--border-color);
    }
    
    h1 {
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      font-size: 2rem;
      font-weight: 600;
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 1rem;
    }
    
    h2 {
      color: var(--text-primary);
      margin: 2.5rem 0 1.25rem;
      font-size: 1.5rem;
      font-weight: 500;
      position: relative;
      padding-left: 1rem;
      border-left: 4px solid #60a5fa;
    }

    p, li {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    ul {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    .back-links {
      margin-top: 3rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .back-button,
    .home-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s ease;
      text-decoration: none;
      border: 1px solid var(--border-color);
      cursor: pointer;
    }

    .back-button {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .back-button:hover {
      background: var(--hover-bg);
      border-color: var(--text-secondary);
    }

    .home-button {
      background: #60a5fa;
      color: #1e293b;
    }

    .home-button:hover {
      background: #3b82f6;
      color: white;
      text-decoration: none;
    }

    a {
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #93c5fd;
      text-decoration: underline;
    }
  `]
})
export class PrivacyPolicyComponent {
  currentDate = new Date();

  goBack() {
    window.history.back();
  }
}
