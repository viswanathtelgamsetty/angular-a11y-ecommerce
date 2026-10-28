import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
  id: number;
  type: 'success' | 'warning';
  message: string;
}

@Component({
  selector: 'app-toast-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests dynamic status notifications (WCAG 4.1.3), \`aria-live\` regions, timing adjustments (WCAG 2.2.1), and dismissible controls.
      </p>

      <div class="btn-group">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          (click)="showToast('success')"
        >
          Trigger Success Toast
        </button>
        <button
          type="button"
          class="btn btn-warning btn-sm"
          (click)="showToast('warning')"
        >
          Trigger Warning Toast
        </button>
      </div>

      <!-- ACCESSIBLE LIVE REGION -->
      @if (isAccessible()) {
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="toast-container"
        >
          @if (toast(); as t) {
            <div [class]="'toast toast-' + t.type">
              <div class="toast-body">
                <strong>{{ t.type === 'success' ? 'Success: ' : 'Warning: ' }}</strong>
                {{ t.message }}
              </div>
              <button
                type="button"
                class="toast-close-btn"
                [attr.aria-label]="'Dismiss ' + t.type + ' notification'"
                (click)="toast.set(null)"
              >
                &times;
              </button>
            </div>
          }
        </div>
      } @else {
        <!-- INACCESSIBLE TOAST CONTAINER -->
        <div class="toast-container">
          @if (toast(); as t) {
            <div [class]="'toast toast-' + t.type">
              <div class="toast-body">{{ t.message }}</div>
              <span
                class="toast-close-btn"
                style="cursor: pointer;"
                (click)="toast.set(null)"
              >
                &times;
              </span>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class ToastAlertComponent {
  isAccessible = input<boolean>(false);
  toast = signal<Toast | null>(null);

  showToast(type: 'success' | 'warning') {
    const newToast: Toast = {
      id: Date.now(),
      type,
      message:
        type === 'success'
          ? 'Payment processed successfully! Transaction ID: #88219'
          : 'Security Warning: Unusual login detected from new IP address.',
    };
    this.toast.set(newToast);

    if (!this.isAccessible()) {
      setTimeout(() => {
        this.toast.set(null);
      }, 2000);
    }
  }
}
