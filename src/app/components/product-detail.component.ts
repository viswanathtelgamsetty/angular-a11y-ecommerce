import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="product-detail-main">
      @if (showToast) {
        <div class="cart-toast-banner">
          <span class="toast-icon">✓</span>
          <span class="toast-msg">Aura SoundMax Pro added to your cart!</span>
        </div>
      }

      <div class="product-breadcrumbs">
        <span class="breadcrumb-item">Home</span>
        <span class="breadcrumb-divider">/</span>
        <span class="breadcrumb-item">Audio</span>
        <span class="breadcrumb-divider">/</span>
        <span class="breadcrumb-current">Aura SoundMax Pro</span>
      </div>

      <div class="product-layout-grid">
        <div class="product-gallery-col">
          <div class="main-image-container">
            <img [src]="selectedImage" alt="image" class="main-image" />
          </div>

          <div class="thumbnails-row">
            @for (img of productData.images; track $index) {
              <div [class]="'thumb-wrapper ' + (selectedImage === img ? 'thumb-active' : '')" (click)="selectedImage = img" (keydown.enter)="selectedImage = img" (keydown.space)="$event.preventDefault(); selectedImage = img" tabindex="0" role="button">
                <img [src]="img" class="thumbnail-img" alt="Thumbnail" />
              </div>
            }
          </div>
        </div>

        <div class="product-info-col">
          <h1 class="product-title">{{ productData.name }}</h1>
          <h4 class="product-tagline">{{ productData.tagline }}</h4>

          <div class="rating-container">
            <span class="rating-stars">★★★★☆</span>
            <span class="rating-score">4.8</span>
            <span class="rating-count">({{ productData.reviewCount }} customer reviews)</span>
          </div>

          <div class="pricing-box">
            <span class="price-current">\${{ productData.price }}</span>
            <span class="price-original">\${{ productData.originalPrice }}</span>
            <span class="price-badge">Save $50</span>
          </div>

          <div class="stock-status-row">
            <span class="stock-status-dot dot-green"></span>
            <span class="stock-status-text">In Stock & Ready to Ship</span>
          </div>

          <hr class="divider-line" />

          <div class="color-section">
            <div class="section-label">Color: {{ selectedColor }}</div>
            <div class="swatches-list">
              @for (c of productData.colors; track c.name) {
                <div [class]="'color-swatch ' + (selectedColor === c.name ? 'swatch-selected' : '')" [style.background-color]="c.hex" (click)="selectedColor = c.name"></div>
              }
            </div>
          </div>

          <div class="quantity-section">
            <div class="section-label">Quantity:</div>
            <div class="stepper-box">
              <div class="stepper-btn" (click)="decrementQty()">-</div>
              <span class="stepper-value">{{ quantity }}</span>
              <div class="stepper-btn" (click)="incrementQty()">+</div>
            </div>
          </div>

          <div class="action-buttons-group">
            <button type="button" class="btn-add-cart" (click)="handleAddToCart()">
              Add to Cart • \${{ (productData.price * quantity).toFixed(2) }}
            </button>

            <button type="button" class="btn-buy-now">
              Buy Now
            </button>
          </div>

          <div class="secondary-actions">
            <button type="button" class="btn-text-action" (click)="isModalOpen = true">
              ✍️ Write a Customer Review
            </button>
            <span class="action-dot">•</span>
            <a href="#warranty" class="btn-text-link">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div class="product-tabs-wrapper">
        <div class="tabs-nav-bar">
          <a href="#overview" [class]="'tab-btn ' + (activeTab === 'overview' ? 'active' : '')" (click)="$event.preventDefault(); activeTab = 'overview'">
            Overview & Features
          </a>
          <a href="#specs" [class]="'tab-btn ' + (activeTab === 'specs' ? 'active' : '')" (click)="$event.preventDefault(); activeTab = 'specs'">
            Technical Specifications
          </a>
          <a href="#reviews" [class]="'tab-btn ' + (activeTab === 'reviews' ? 'active' : '')" (click)="$event.preventDefault(); activeTab = 'reviews'">
            Customer Reviews ({{ productData.reviewCount }})
          </a>
        </div>

        <div class="tab-panels-container">
          <div [class]="'tab-panel ' + (activeTab === 'overview' ? 'panel-visible' : 'panel-ghost')">
            <h3 class="tab-heading">Architected for Acoustic Perfection</h3>
            <p class="tab-paragraph">
              The Aura SoundMax Pro sets a new benchmark for wireless consumer audio. Engineered with custom 40mm beryllium-coated dynamic transducers, it yields visceral sub-bass depth while preserving pristine high-frequency shimmer with under 0.05% total harmonic distortion.
            </p>
            <ul class="features-checklist">
              <li>✓ Quad-microphone hybrid Active Noise Cancellation silences up to 45dB of ambient noise</li>
              <li>✓ Advanced multipoint pairing keeps you connected to your laptop and mobile device simultaneously</li>
              <li>✓ Memory foam ear cushions upholstered in breathable protein leather for all-day comfort</li>
              <li>✓ 55 hours continuous playback on single charge; fast charge gives 5 hours in 10 minutes</li>
            </ul>
            <div class="tab-links-row">
              <a href="#download" class="ambiguous-link">Click Here</a>
              <a href="#manual" class="ambiguous-link">Download</a>
              <a href="#compare" class="ambiguous-link">Details</a>
            </div>
          </div>

          <div [class]="'tab-panel ' + (activeTab === 'specs' ? 'panel-visible' : 'panel-ghost')">
            <h3 class="tab-heading">Hardware Benchmark & Specifications</h3>
            
            <div class="div-table-wrapper">
              <div class="div-table-header">
                <div class="div-th-cell col-feature">Hardware Feature</div>
                <div class="div-th-cell col-aura">Aura SoundMax Pro</div>
                <div class="div-th-cell col-comp">Industry Competitors</div>
              </div>

              @for (s of productData.specs; track s.label) {
                <div class="div-table-row">
                  <div class="div-td-cell col-feature">{{ s.label }}</div>
                  <div class="div-td-cell col-aura">{{ s.aura }}</div>
                  <div class="div-td-cell col-comp">{{ s.competitor }}</div>
                </div>
              }
            </div>
          </div>

          <div [class]="'tab-panel ' + (activeTab === 'reviews' ? 'panel-visible' : 'panel-ghost')">
            <div class="reviews-header-strip">
              <div>
                <h3 class="tab-heading">Verified Buyer Testimonials</h3>
                <p class="reviews-sub">Average Rating: 4.8 / 5.0 based on 128 verified purchases</p>
              </div>
              <button type="button" class="btn-secondary-action" (click)="isModalOpen = true">
                Write a Review
              </button>
            </div>

            <div class="reviews-list">
              @for (r of productData.reviews; track r.author) {
                <div class="review-card">
                  <div class="review-top-line">
                    <span class="reviewer-name">{{ r.author }}</span>
                    <span class="review-date">{{ r.date }}</span>
                  </div>
                  <div class="review-stars">★★★★★</div>
                  <h4 class="review-title">{{ r.title }}</h4>
                  <p class="review-body">{{ r.comment }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      @if (isModalOpen) {
        <div class="modal-backdrop">
          <div class="modal-dialog-box">
            <div class="modal-header">
              <span class="modal-heading-text">Write a Customer Review</span>
              <div class="modal-close-icon" (click)="isModalOpen = false">
                ✕
              </div>
            </div>

            @if (reviewSubmitted) {
              <div class="modal-success-state">
                <span class="success-icon">✓</span>
                <p>Thank you! Your verified review has been submitted for approval.</p>
              </div>
            } @else {
              <form class="modal-form" (submit)="handleReviewSubmit($event)">
                <div class="modal-field">
                  <input type="text" [class]="'modal-input ' + (formErrors && !reviewerName.trim() ? 'input-error' : '')" placeholder="Your Full Name *" [(ngModel)]="reviewerName" name="name" aria-label="Name" />
                </div>

                <div class="modal-field">
                  <input type="email" [class]="'modal-input ' + (formErrors && !reviewerEmail.trim() ? 'input-error' : '')" placeholder="Your Email Address *" [(ngModel)]="reviewerEmail" name="email" aria-label="Email" />
                </div>

                <div class="modal-field">
                  <textarea rows="4" [class]="'modal-textarea ' + (formErrors && !reviewText.trim() ? 'input-error' : '')" placeholder="Share your thoughts on sound quality, comfort, and battery life... *" [(ngModel)]="reviewText" name="review" aria-label="Review"></textarea>
                </div>

                <div class="modal-actions-row">
                  <button type="button" class="btn-modal-cancel" (click)="isModalOpen = false">
                    Cancel
                  </button>
                  <button type="submit" class="btn-modal-submit">
                    Submit Review
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      }
    </main>
  `,
})
export class ProductDetailComponent {
  addToCart = output<void>();

  readonly productData = {
    id: 'soundmax-pro',
    name: 'Aura SoundMax Pro Wireless ANC Headphones',
    tagline: 'Studio-Grade 40mm Beryllium Drivers with Hybrid 45dB Active Noise Cancellation',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    ],
    colors: [
      { name: 'Matte Black', hex: '#1e293b' },
      { name: 'Platinum Silver', hex: '#cbd5e1' },
      { name: 'Midnight Navy', hex: '#1e3a8a' },
    ],
    specs: [
      { label: 'Acoustic Driver', aura: '40mm Custom Beryllium', competitor: '40mm Standard Mylar' },
      { label: 'Active Noise Cancellation', aura: 'Hybrid 4-Mic (45dB)', competitor: 'Standard 2-Mic (28dB)' },
      { label: 'Battery Life', aura: '55 Hours (ANC On)', competitor: '30 Hours' },
      { label: 'Wireless Connectivity', aura: 'Bluetooth 5.3 + LDAC', competitor: 'Bluetooth 5.0 (SBC only)' },
      { label: 'Fast Charge', aura: '10 min = 5 hours', competitor: '15 min = 2 hours' },
      { label: 'Weight & Ergonomics', aura: '250g Memory Foam', competitor: '290g Synthetic Foam' },
    ],
    reviews: [
      {
        author: 'Marcus Vance',
        date: 'October 14, 2026',
        rating: 5,
        title: 'Flawless soundstage and incredible isolation',
        comment: 'The noise cancellation completely blocks subway rumble and chatter. Beryllium drivers make classical strings and deep bass crisp.',
      },
      {
        author: 'Elena Rostova',
        date: 'October 21, 2026',
        rating: 5,
        title: 'Best productivity headset for remote work',
        comment: 'Multipoint Bluetooth switches seamlessly between my MacBook and iPhone. Battery lasts over a full week of daily Zoom meetings.',
      },
      {
        author: 'David Chen',
        date: 'October 24, 2026',
        rating: 4,
        title: 'Remarkable comfort, very plush ear cushions',
        comment: 'No clamping pressure on glasses. Highly recommend picking up the travel hardcase as well.',
      },
    ],
  };

  selectedImage = this.productData.images[0];
  selectedColor = this.productData.colors[0].name;
  quantity = 1;
  activeTab = 'overview';
  showToast = false;

  isModalOpen = false;
  reviewerName = '';
  reviewerEmail = '';
  reviewText = '';
  formErrors = false;
  reviewSubmitted = false;

  decrementQty() {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  incrementQty() {
    this.quantity++;
  }

  handleAddToCart() {
    this.addToCart.emit();
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  handleReviewSubmit(e: Event) {
    e.preventDefault();
    if (!this.reviewerName.trim() || !this.reviewerEmail.trim() || !this.reviewText.trim()) {
      this.formErrors = true;
      return;
    }
    this.formErrors = false;
    this.reviewSubmitted = true;
    setTimeout(() => {
      this.isModalOpen = false;
      this.reviewSubmitted = false;
      this.reviewerName = '';
      this.reviewerEmail = '';
      this.reviewText = '';
    }, 1800);
  }
}
