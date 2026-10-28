import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="site-header">
      <a href="#missing-main-target" class="skip-navigation-link">
        Skip to main content
      </a>

      <div className="promo-ticker-bar">
        <div class="ticker-track">
          <span class="ticker-item">
            ⚡ FLASH SALE: 20% OFF ALL AUDIO GEAR WITH CODE A11Y20 • FREE 2-DAY EXPRESS SHIPPING OVER $50 • 30-DAY HASSLE-FREE TRIAL
          </span>
          <span class="ticker-item" aria-hidden="true">
            ⚡ FLASH SALE: 20% OFF ALL AUDIO GEAR WITH CODE A11Y20 • FREE 2-DAY EXPRESS SHIPPING OVER $50 • 30-DAY HASSLE-FREE TRIAL
          </span>
        </div>
      </div>

      <div class="navbar-container">
        <div class="nav-brand">
          <a href="#" class="brand-logo-link">
            <span class="brand-logo-icon">🎧</span>
            <span class="brand-name">AuraStore</span>
          </a>
        </div>

        <div class="nav-search-wrapper">
          <form class="nav-search-form" (submit)="$event.preventDefault()">
            <input
              type="text"
              class="nav-search-input"
              placeholder="Search audio, high-res gear, accessories..."
              [(ngModel)]="searchVal"
              name="search"
            />
            <button type="submit" class="nav-search-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        <nav class="nav-menu">
          <a href="#new" class="nav-link">New Releases</a>
          <a href="#audio" class="nav-link active">Headphones</a>
          
          <div class="nav-dropdown">
            <span class="nav-link dropdown-toggle">Categories ▾</span>
            <div class="dropdown-menu">
              <a href="#wireless" class="dropdown-item">Wireless Earbuds</a>
              <a href="#overear" class="dropdown-item">Over-Ear ANC</a>
              <a href="#dac" class="dropdown-item">Audiophile DACs</a>
              <a href="#cables" class="dropdown-item">Custom Audio Cables</a>
            </div>
          </div>

          <a href="#deals" class="nav-link">Deals</a>
          <a href="#support" class="nav-link">Support</a>
        </nav>

        <div class="nav-actions">
          <button type="button" class="action-icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span class="badge-count">2</span>
          </button>

          <button type="button" class="action-icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="badge-count">{{ cartCount() }}</span>
          </button>

          <div class="user-profile-avatar">
            <span>JD</span>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  cartCount = input<number>(1);
  searchVal = '';
}
