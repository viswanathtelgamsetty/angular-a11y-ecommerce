import { Component, input, signal, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests ARIA tabs pattern: roving tabIndex, Arrow Left/Right key navigation, \`role="tablist"\`, \`role="tab"\`, and \`role="tabpanel"\`.
      </p>

      @if (isAccessible()) {
        <!-- ACCESSIBLE TABS -->
        <div class="tabs-container">
          <div role="tablist" aria-label="Account Settings Sections" class="tabs-list">
            @for (tab of tabs; track tab.id; let idx = $index) {
              <button
                #tabBtn
                [id]="'ng-tab-' + tab.id"
                type="button"
                role="tab"
                [attr.aria-selected]="tab.id === activeTab()"
                [attr.aria-controls]="'ng-panel-' + tab.id"
                [tabindex]="tab.id === activeTab() ? 0 : -1"
                class="tab-btn"
                [class.tab-btn-active]="tab.id === activeTab()"
                (click)="activeTab.set(tab.id)"
                (keydown)="handleKeyDown($event, idx)"
              >
                {{ tab.label }}
              </button>
            }
          </div>

          @for (tab of tabs; track tab.id) {
            <div
              [id]="'ng-panel-' + tab.id"
              role="tabpanel"
              [attr.aria-labelledby]="'ng-tab-' + tab.id"
              tabindex="0"
              [hidden]="tab.id !== activeTab()"
              class="tab-panel"
            >
              <h4>{{ tab.label }}</h4>
              <p>{{ tab.content }}</p>
              <button type="button" class="btn btn-secondary btn-sm" style="margin-top: 8px;">
                Edit {{ tab.label }}
              </button>
            </div>
          }
        </div>
      } @else {
        <!-- INACCESSIBLE TABS -->
        <div class="tabs-container">
          <ul class="tabs-list-inaccessible">
            @for (tab of tabs; track tab.id) {
              <li style="display: inline-block;">
                <a
                  href="#dummy"
                  class="tab-btn"
                  [class.tab-btn-active]="tab.id === activeTab()"
                  (click)="$event.preventDefault(); activeTab.set(tab.id)"
                >
                  {{ tab.label }}
                </a>
              </li>
            }
          </ul>

          <div class="tab-panel">
            <h4>{{ getCurrentTab()?.label }}</h4>
            <p>{{ getCurrentTab()?.content }}</p>
            <div
              class="btn btn-secondary btn-sm"
              style="display: inline-block; margin-top: 8px; cursor: pointer"
            >
              Edit {{ getCurrentTab()?.label }}
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class TabsComponent {
  isAccessible = input<boolean>(false);
  activeTab = signal<string>('general');

  @ViewChildren('tabBtn') tabButtons!: QueryList<ElementRef>;

  tabs = [
    {
      id: 'general',
      label: 'General Profile',
      content: 'Manage your public display name, email preferences, and personal biography.',
    },
    {
      id: 'security',
      label: 'Security & Auth',
      content: 'Two-factor authentication (2FA), active login sessions, and password management.',
    },
    {
      id: 'billing',
      label: 'Billing & Plans',
      content: 'Current subscription tier, payment methods, downloadable invoices, and usage quotas.',
    },
  ];

  getCurrentTab() {
    return this.tabs.find(t => t.id === this.activeTab());
  }

  handleKeyDown(e: KeyboardEvent, index: number) {
    if (!this.isAccessible()) return;

    let target = index;
    if (e.key === 'ArrowRight') {
      target = (index + 1) % this.tabs.length;
    } else if (e.key === 'ArrowLeft') {
      target = (index - 1 + this.tabs.length) % this.tabs.length;
    } else if (e.key === 'Home') {
      target = 0;
    } else if (e.key === 'End') {
      target = this.tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    this.activeTab.set(this.tabs[target].id);
    const btnArray = this.tabButtons.toArray();
    btnArray[target]?.nativeElement.focus();
  }
}
