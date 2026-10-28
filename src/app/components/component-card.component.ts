import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comp-card" [class.comp-card-accessible]="isAccessible()" [class.comp-card-inaccessible]="!isAccessible()">
      <div class="comp-card-header">
        <div class="comp-header-main">
          <div class="comp-index-badge">#{{ index() }}</div>
          <div>
            <h2 class="comp-title">{{ title() }}</h2>
            <div class="comp-tags-row">
              @for (tag of wcagTags(); track tag) {
                <span class="wcag-badge">{{ tag }}</span>
              }
            </div>
          </div>
        </div>

        <div class="comp-controls">
          <div class="toggle-mode-group">
            <span class="mode-label" [class.mode-active-bad]="!isAccessible()">
              Inaccessible
            </span>
            <button
              type="button"
              class="mode-switch-btn"
              [class.switch-accessible]="isAccessible()"
              [class.switch-inaccessible]="!isAccessible()"
              [attr.aria-label]="'Toggle accessibility mode for ' + title() + '. Currently ' + (isAccessible() ? 'Accessible' : 'Inaccessible')"
              (click)="toggleAccessible.emit()"
            >
              <span class="mode-switch-handle"></span>
            </button>
            <span class="mode-label" [class.mode-active-good]="isAccessible()">
              Accessible
            </span>
          </div>

          <button
            type="button"
            class="btn btn-outline-info btn-xs"
            [attr.aria-expanded]="showDetails()"
            (click)="showDetails.set(!showDetails())"
          >
            {{ showDetails() ? 'Hide Guide' : 'A11y Breakdown' }}
          </button>
        </div>
      </div>

      <!-- Guide Drawer -->
      @if (showDetails()) {
        <div class="comp-guide-drawer">
          <div class="guide-grid">
            <div class="guide-column guide-bad">
              <h4>❌ Inaccessible Flaws (Violations)</h4>
              <ul>
                @for (item of issuesSummary(); track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
            <div class="guide-column guide-good">
              <h4>✅ Accessible Implementation (Fixes)</h4>
              <ul>
                @for (item of fixSummary(); track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          </div>
          @if (keyboardTips()) {
            <div class="guide-keyboard-tips">
              <strong>⌨️ Testing Tips:</strong> {{ keyboardTips() }}
            </div>
          }
        </div>
      }

      <div class="comp-card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ComponentCardComponent {
  title = input<string>('');
  index = input<number>(1);
  wcagTags = input<string[]>([]);
  issuesSummary = input<string[]>([]);
  fixSummary = input<string[]>([]);
  keyboardTips = input<string>('');
  isAccessible = input<boolean>(false);

  toggleAccessible = output<void>();

  showDetails = signal<boolean>(false);
}
