import { Component, input, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests custom interactive controls: keyboard navigation (Arrow Up/Down, Enter, Esc), ARIA combobox pattern, focus management, and screen reader announcements.
      </p>

      <div class="custom-select-container">
        @if (isAccessible()) {
          <!-- ACCESSIBLE COMBOBOX -->
          <label id="ng-select-label" class="form-label">Select Your Country Region</label>
          <div class="select-wrapper">
            <button
              #triggerRef
              id="ng-select-btn"
              type="button"
              role="combobox"
              [attr.aria-expanded]="isOpen()"
              aria-haspopup="listbox"
              aria-labelledby="ng-select-label ng-select-btn"
              aria-controls="ng-select-listbox"
              class="select-trigger"
              (click)="toggleOpen()"
              (keydown)="handleKeyDown($event)"
            >
              <span>{{ selectedOption().label }}</span>
              <span aria-hidden="true" class="select-arrow">{{ isOpen() ? '▲' : '▼' }}</span>
            </button>

            @if (isOpen()) {
              <ul
                id="ng-select-listbox"
                role="listbox"
                aria-labelledby="ng-select-label"
                tabindex="-1"
                class="select-options-list"
              >
                @for (opt of options; track opt.value; let idx = $index) {
                  <li
                    [id]="'ng-opt-' + idx"
                    role="option"
                    [attr.aria-selected]="idx === selectedIdx()"
                    class="select-option"
                    [class.option-highlighted]="idx === highlightedIdx()"
                    [class.option-selected]="idx === selectedIdx()"
                    (click)="selectOption(idx)"
                    (mouseenter)="highlightedIdx.set(idx)"
                  >
                    {{ opt.label }}
                    @if (idx === selectedIdx()) {
                      <span aria-hidden="true"> ✓</span>
                    }
                  </li>
                }
              </ul>
            }
          </div>
        } @else {
          <!-- INACCESSIBLE DIV DROPDOWN -->
          <div class="form-label-fake">Select Your Country Region</div>
          <div class="select-wrapper">
            <div
              class="select-trigger"
              style="cursor: pointer"
              (click)="toggleOpen()"
            >
              <span>{{ selectedOption().label }}</span>
              <span class="select-arrow">{{ isOpen() ? '▲' : '▼' }}</span>
            </div>

            @if (isOpen()) {
              <div class="select-options-list">
                @for (opt of options; track opt.value; let idx = $index) {
                  <div
                    class="select-option"
                    style="cursor: pointer"
                    (click)="selectOption(idx)"
                  >
                    {{ opt.label }}
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class CustomSelectComponent {
  isAccessible = input<boolean>(false);
  isOpen = signal<boolean>(false);
  selectedIdx = signal<number>(0);
  highlightedIdx = signal<number>(0);

  @ViewChild('triggerRef') triggerRef?: ElementRef;

  options: Option[] = [
    { value: 'us', label: 'United States (+1)' },
    { value: 'uk', label: 'United Kingdom (+44)' },
    { value: 'ca', label: 'Canada (+1)' },
    { value: 'de', label: 'Germany (+49)' },
    { value: 'in', label: 'India (+91)' },
    { value: 'jp', label: 'Japan (+81)' },
  ];

  selectedOption = computed(() => this.options[this.selectedIdx()]);

  toggleOpen() {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.highlightedIdx.set(this.selectedIdx());
    }
  }

  selectOption(idx: number) {
    this.selectedIdx.set(idx);
    this.isOpen.set(false);
    if (this.isAccessible()) {
      this.triggerRef?.nativeElement.focus();
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!this.isAccessible()) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.isOpen()) {
          this.selectOption(this.highlightedIdx());
        } else {
          this.toggleOpen();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen()) {
          this.toggleOpen();
        } else if (this.highlightedIdx() < this.options.length - 1) {
          this.highlightedIdx.update(i => i + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen() && this.highlightedIdx() > 0) {
          this.highlightedIdx.update(i => i - 1);
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          e.preventDefault();
          this.isOpen.set(false);
        }
        break;
      case 'Tab':
        this.isOpen.set(false);
        break;
    }
  }
}
