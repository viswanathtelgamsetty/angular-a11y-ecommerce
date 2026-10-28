import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-button-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests icon-only buttons (WCAG 4.1.2 accessible name), visible focus rings (WCAG 2.4.7), and decorative icon handling (\`aria-hidden\`).
      </p>

      <div class="icon-toolbar">
        @if (isAccessible()) {
          <!-- ACCESSIBLE ICON BUTTONS -->
          <button
            type="button"
            class="icon-btn-accessible"
            [class.is-active]="liked()"
            [attr.aria-label]="liked() ? 'Remove from favorites' : 'Add to favorites'"
            [attr.aria-pressed]="liked()"
            (click)="liked.update(v => !v)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" [attr.fill]="liked() ? '#ef4444' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            type="button"
            class="icon-btn-accessible"
            [class.is-active]="saved()"
            [attr.aria-label]="saved() ? 'Remove bookmark' : 'Bookmark this article'"
            [attr.aria-pressed]="saved()"
            (click)="saved.update(v => !v)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" [attr.fill]="saved() ? '#3b82f6' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            type="button"
            class="icon-btn-accessible"
            aria-label="Share article via link"
            (click)="shareLink()"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        } @else {
          <!-- INACCESSIBLE ICON BUTTONS -->
          <button
            type="button"
            class="icon-btn-inaccessible"
            (click)="liked.update(v => !v)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            type="button"
            class="icon-btn-inaccessible"
            (click)="saved.update(v => !v)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            type="button"
            class="icon-btn-inaccessible"
            (click)="shareLink()"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        }
      </div>
    </div>
  `
})
export class IconButtonBarComponent {
  isAccessible = input<boolean>(false);
  liked = signal<boolean>(false);
  saved = signal<boolean>(false);

  shareLink() {
    alert('Link copied to clipboard!');
  }
}
