import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import axe from 'axe-core';

@Component({
  selector: 'app-axe-audit-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="axe-panel-wrapper">
      <div class="axe-toolbar">
        <div class="axe-toolbar-left">
          <span class="axe-logo-icon">🔍</span>
          <div>
            <strong>Automated Axe-Core A11y Scanner (Angular)</strong>
            <p class="axe-subtitle">Audit the current page in real time with rules from WCAG 2.1 &amp; 2.2</p>
          </div>
        </div>

        <div class="axe-toolbar-right">
          <button
            type="button"
            class="btn btn-audit"
            [disabled]="isRunning()"
            (click)="runAudit()"
          >
            {{ isRunning() ? 'Auditing DOM...' : '⚡ Run Live Axe Audit' }}
          </button>
          @if (results()) {
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              (click)="isOpen.set(!isOpen())"
            >
              {{ isOpen() ? 'Collapse Report' : 'View Report (' + violations().length + ')' }}
            </button>
          }
        </div>
      </div>

      <!-- Summary Stats Bar -->
      @if (results()) {
        <div class="axe-summary-bar">
          <div class="summary-stat stat-total">
            <span class="stat-num">{{ violations().length }}</span>
            <span class="stat-label">Total Violations</span>
          </div>
          <div class="summary-stat stat-critical">
            <span class="stat-num">{{ criticalCount() }}</span>
            <span class="stat-label">Critical</span>
          </div>
          <div class="summary-stat stat-serious">
            <span class="stat-num">{{ seriousCount() }}</span>
            <span class="stat-label">Serious</span>
          </div>
          <div class="summary-stat stat-moderate">
            <span class="stat-num">{{ moderateCount() }}</span>
            <span class="stat-label">Moderate</span>
          </div>
          <div class="summary-stat stat-minor">
            <span class="stat-num">{{ minorCount() }}</span>
            <span class="stat-label">Minor</span>
          </div>
        </div>
      }

      <!-- Results List -->
      @if (isOpen() && results()) {
        <div class="axe-results-container">
          @if (violations().length === 0) {
            <div class="axe-empty-state">
              🎉 No accessibility violations detected! All active components comply with WCAG standards.
            </div>
          } @else {
            <div class="axe-violation-list">
              @for (violation of violations(); track violation.id) {
                <div class="axe-violation-card">
                  <div class="violation-header">
                    <span class="impact-badge" [class]="getImpactBadgeClass(violation.impact)">
                      {{ violation.impact ? violation.impact.toUpperCase() : 'INFO' }}
                    </span>
                    <span class="violation-id">{{ violation.id }}</span>
                    <a
                      [href]="violation.helpUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="violation-link"
                    >
                      Axe Rule Docs &rarr;
                    </a>
                  </div>
                  <h4 class="violation-help">{{ violation.help }}</h4>
                  <p class="violation-desc">{{ violation.description }}</p>

                  <div class="violation-nodes">
                    <div class="nodes-title">Failing Elements ({{ violation.nodes.length }}):</div>
                    @for (node of violation.nodes; track node.html) {
                      <div class="node-item">
                        <code class="node-selector">{{ node.target.join(' ') }}</code>
                        <div class="node-html-snippet">
                          <code>{{ node.html }}</code>
                        </div>
                        @if (node.failureSummary) {
                          <div class="node-failure-summary">{{ node.failureSummary }}</div>
                        }
                      </div>
                    }
                  </div>

                  <div class="violation-tags">
                    @for (tag of violation.tags; track tag) {
                      <span class="wcag-tag">#{{ tag }}</span>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `
})
export class AxeAuditPanelComponent {
  isRunning = signal<boolean>(false);
  results = signal<axe.AxeResults | null>(null);
  isOpen = signal<boolean>(false);

  violations = computed(() => this.results()?.violations || []);
  criticalCount = computed(() => this.violations().filter(v => v.impact === 'critical').length);
  seriousCount = computed(() => this.violations().filter(v => v.impact === 'serious').length);
  moderateCount = computed(() => this.violations().filter(v => v.impact === 'moderate').length);
  minorCount = computed(() => this.violations().filter(v => v.impact === 'minor').length);

  async runAudit() {
    this.isRunning.set(true);
    try {
      const res = await axe.run(document.body, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      });
      this.results.set(res);
      this.isOpen.set(true);
    } catch (err) {
      console.error('Axe audit failed:', err);
    } finally {
      this.isRunning.set(false);
    }
  }

  getImpactBadgeClass(impact?: string | null) {
    switch (impact) {
      case 'critical': return 'badge-critical';
      case 'serious': return 'badge-serious';
      case 'moderate': return 'badge-warning';
      default: return 'badge-minor';
    }
  }
}
