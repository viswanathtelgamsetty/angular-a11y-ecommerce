import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests ARIA switch pattern (WCAG 4.1.2), keyboard interaction (Space/Enter), and state indication (\`aria-checked\`).
      </p>

      <div class="toggle-wrapper">
        @if (isAccessible()) {
          <!-- ACCESSIBLE SWITCH -->
          <div class="toggle-row">
            <span id="ng-airplane-label" class="toggle-label-text">
              Enable Offline Airplane Mode
            </span>
            <button
              id="ng-airplane-switch"
              type="button"
              role="switch"
              [attr.aria-checked]="isOn()"
              aria-labelledby="ng-airplane-label"
              class="toggle-track"
              [class.track-on]="isOn()"
              [class.track-off]="!isOn()"
              (click)="toggle()"
              (keydown)="handleKeyDown($event)"
            >
              <span class="toggle-thumb" [class.thumb-on]="isOn()" [class.thumb-off]="!isOn()"></span>
            </button>
            <span class="toggle-state-text" aria-hidden="true">{{ isOn() ? 'ON' : 'OFF' }}</span>
          </div>
        } @else {
          <!-- INACCESSIBLE SWITCH -->
          <div class="toggle-row">
            <div class="toggle-label-text">Enable Offline Airplane Mode</div>
            <div
              class="toggle-track"
              [class.track-on]="isOn()"
              [class.track-off]="!isOn()"
              style="cursor: pointer;"
              (click)="toggle()"
            >
              <div class="toggle-thumb" [class.thumb-on]="isOn()" [class.thumb-off]="!isOn()"></div>
            </div>
            <div style="font-size: 13px; color: #666;">{{ isOn() ? 'ON' : 'OFF' }}</div>
          </div>
        }
      </div>
    </div>
  `
})
export class ToggleSwitchComponent {
  isAccessible = input<boolean>(false);
  isOn = signal<boolean>(false);

  toggle() {
    this.isOn.update(v => !v);
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  }
}
