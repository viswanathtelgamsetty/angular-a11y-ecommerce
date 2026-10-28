import { Component, input, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests keyboard focus containment, ARIA dialog roles, modal labeling, and Escape key handling.
      </p>

      <!-- Trigger Button -->
      @if (isAccessible()) {
        <button
          #openBtn
          type="button"
          class="btn btn-primary"
          aria-haspopup="dialog"
          (click)="openModal()"
        >
          Open Account Deletion Modal
        </button>
      } @else {
        <div
          #openBtn
          class="btn btn-primary"
          style="display: inline-block; cursor: pointer"
          (click)="openModal()"
        >
          Open Account Deletion Modal
        </div>
      }

      <!-- Modal Dialog -->
      @if (isOpen()) {
        @if (isAccessible()) {
          <!-- ACCESSIBLE MODAL -->
          <div class="modal-backdrop" (click)="closeModal()">
            <div
              #modalRef
              class="modal-container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ng-modal-title"
              aria-describedby="ng-modal-desc"
              (click)="$event.stopPropagation()"
            >
              <div class="modal-header">
                <h3 id="ng-modal-title" class="modal-title">Confirm Account Deletion</h3>
                <button
                  #closeBtn
                  type="button"
                  class="modal-close-btn"
                  aria-label="Close confirmation dialog"
                  (click)="closeModal()"
                >
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <p id="ng-modal-desc">
                  Are you sure you want to permanently delete your account? This action cannot be undone.
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
                <button type="button" class="btn btn-danger" (click)="deleteAccount()">
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          </div>
        } @else {
          <!-- INACCESSIBLE MODAL -->
          <div class="modal-backdrop">
            <div class="modal-container">
              <div class="modal-header">
                <div class="modal-title" style="font-size: 1.25rem; font-weight: 600">
                  Confirm Account Deletion
                </div>
                <span class="modal-close-btn" style="cursor: pointer" (click)="closeModal()">
                  &times;
                </span>
              </div>
              <div class="modal-body">
                <div>
                  Are you sure you want to permanently delete your account? This action cannot be undone.
                </div>
              </div>
              <div class="modal-footer">
                <div class="btn btn-secondary" style="cursor: pointer" (click)="closeModal()">Cancel</div>
                <div class="btn btn-danger" style="cursor: pointer" (click)="deleteAccount()">
                  Yes, Delete My Account
                </div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `
})
export class ModalDialogComponent {
  isAccessible = input<boolean>(false);
  isOpen = signal<boolean>(false);

  @ViewChild('openBtn') openBtnRef?: ElementRef;
  @ViewChild('closeBtn') closeBtnRef?: ElementRef;
  @ViewChild('modalRef') modalRef?: ElementRef;

  openModal() {
    this.isOpen.set(true);
    if (this.isAccessible()) {
      setTimeout(() => {
        this.closeBtnRef?.nativeElement.focus();
      }, 50);
    }
  }

  closeModal() {
    this.isOpen.set(false);
    if (this.isAccessible()) {
      this.openBtnRef?.nativeElement.focus();
    }
  }

  deleteAccount() {
    alert('Account deleted.');
    this.closeModal();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent) {
    if (!this.isAccessible() || !this.isOpen()) return;

    if (e.key === 'Escape') {
      this.closeModal();
    }

    if (e.key === 'Tab' && this.modalRef) {
      const focusable = this.modalRef.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
}
