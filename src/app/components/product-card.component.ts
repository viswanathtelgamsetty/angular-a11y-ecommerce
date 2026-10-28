import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests image alternative text (WCAG 1.1.1), color contrast ratio (WCAG 1.4.3), ambiguous link wording (WCAG 2.4.4), and nested interactive elements.
      </p>

      <div style="max-width: 360px;">
        @if (isAccessible()) {
          <!-- ACCESSIBLE PRODUCT CARD -->
          <div class="product-card card-accessible">
            <svg
              width="100%"
              height="140"
              viewBox="0 0 200 140"
              xmlns="http://www.w3.org/2000/svg"
              style="background: #f1f5f9; border-radius: 8px;"
              role="img"
              aria-label="Studio Pro noise-cancelling wireless headphones in obsidian black"
            >
              <path
                d="M50 80 C50 35 150 35 150 80"
                stroke="#475569"
                stroke-width="10"
                fill="none"
                stroke-linecap="round"
              />
              <rect x="40" y="70" width="20" height="35" rx="8" fill="#334155" />
              <rect x="140" y="70" width="20" height="35" rx="8" fill="#334155" />
              <circle cx="100" cy="115" r="4" fill="#64748b" />
              <text x="100" y="130" text-anchor="middle" font-size="10" fill="#64748b">AudioPro 900</text>
            </svg>

            <div class="card-content">
              <span class="badge badge-success">In Stock</span>
              <h3 class="card-title">Studio Pro Wireless Headphones</h3>
              <p class="card-desc high-contrast">
                Active noise cancellation with 40-hour battery life and spatial audio support.
              </p>
              <div class="card-price-row">
                <span class="card-price">$249.00</span>
                <span class="visually-hidden">Original price was </span>
                <span class="card-price-strike">$299.00</span>
              </div>
              <button
                type="button"
                class="btn btn-primary btn-block"
                aria-label="Add Studio Pro Wireless Headphones to Cart"
                (click)="addToCart()"
              >
                Add to Cart
              </button>
            </div>
          </div>
        } @else {
          <!-- INACCESSIBLE PRODUCT CARD -->
          <div class="product-card card-inaccessible">
            <div class="inaccessible-image-wrapper">
              <img
                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23cbd5e1'/></svg>"
                alt="image"
                style="width: 100%; height: 120px; object-fit: cover;"
              />
            </div>
            <div class="card-content">
              <div style="color: #aaa; font-size: 12px;">In Stock</div>
              <div style="font-size: 1.1rem; font-weight: bold; color: #888;">
                Studio Pro Wireless Headphones
              </div>
              <p style="color: #b5b5b5; font-size: 13px; margin: 8px 0;">
                Active noise cancellation with 40-hour battery life and spatial audio support.
              </p>
              <div style="color: #999; font-size: 14px; margin-bottom: 10px;">
                $249.00 <span style="text-decoration: line-through; color: #ccc;">$299.00</span>
              </div>
              <!-- Nested interactive anchor wrapping button -->
              <a href="#buy" style="text-decoration: none;">
                <button type="button" class="btn btn-primary btn-block">Click here</button>
              </a>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProductCardComponent {
  isAccessible = input<boolean>(false);

  addToCart() {
    alert('Added to cart!');
  }
}
