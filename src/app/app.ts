import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axe from 'axe-core';
import { Product, PRODUCTS, CATEGORIES, COMPARISON_PRODUCTS, STORE_FAQS } from './data/products';
import { WcagBug, WCAG_BUGS } from './data/wcag-bugs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedColor: string;
  quantity: number;
}

export interface ToastItem {
  id: number;
  message: string;
  type: 'info' | 'success';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // A11y State (default false = Inaccessible for testing)
  isAccessible = signal<boolean>(false);
  highlightIssues = signal<boolean>(false);

  // Navigation Routing: 'home' | 'products' | 'product-detail'
  currentPage = signal<'home' | 'products' | 'product-detail'>('home');
  selectedProduct = signal<Product>(PRODUCTS[0]);

  // Catalog Filtering
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  sortBy = signal<string>('featured');
  inStockOnly = signal<boolean>(false);
  categoryDropdownOpen = signal<boolean>(false);

  // Product Detail State
  detailColor = signal<string>(PRODUCTS[0].colors[0]?.name || 'Standard');
  detailQuantity = signal<number>(1);
  detailTab = signal<string>('overview');

  // FAQ Accordion
  openFaqId = signal<string | null>(null);

  // Cart State
  cartItems = signal<CartItem[]>([
    {
      id: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      price: PRODUCTS[0].price,
      image: PRODUCTS[0].image,
      selectedColor: 'Matte Black',
      quantity: 1,
    },
  ]);
  discountPercent = signal<number>(0);
  couponInput = signal<string>('');
  couponFeedback = signal<string>('');

  // Wishlist
  wishlistIds = signal<string[]>(['prod-1', 'prod-4']);

  // Modals & Panels
  isCartOpen = signal<boolean>(false);
  isCheckoutOpen = signal<boolean>(false);
  isBugExplorerOpen = signal<boolean>(false);
  isLiveAxeOpen = signal<boolean>(false);
  isScanningAxe = signal<boolean>(false);
  axeResults = signal<any>(null);

  // Focus Tracker
  focusedInfo = signal<{ tag: string; id: string; role: string; label: string; hasNoName: boolean } | null>(null);

  // Toasts
  toasts = signal<ToastItem[]>([]);

  // Static Data
  readonly products = PRODUCTS;
  readonly categories = CATEGORIES;
  readonly comparisonRows = COMPARISON_PRODUCTS;
  readonly storeFaqs = STORE_FAQS;
  readonly wcagBugs: WcagBug[] = WCAG_BUGS;

  // Checkout Form State
  checkoutForm = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
  };
  checkoutErrors: { [key: string]: string } = {};
  checkoutSuccess = signal<boolean>(false);

  // Computed signals
  filteredProducts = computed(() => {
    let list = [...this.products];
    const cat = this.selectedCategory();
    if (cat !== 'All') {
      list = list.filter((p) => p.category === cat);
    }
    if (this.inStockOnly()) {
      list = list.filter((p) => p.stockStatus === 'in-stock');
    }
    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    const sort = this.sortBy();
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  });

  cartTotalCount = computed(() => this.cartItems().reduce((sum, i) => sum + i.quantity, 0));
  cartSubtotal = computed(() => this.cartItems().reduce((sum, i) => sum + i.price * i.quantity, 0));
  cartDiscount = computed(() => (this.cartSubtotal() * this.discountPercent()) / 100);
  cartShipping = computed(() => (this.cartSubtotal() > 50 || this.cartSubtotal() === 0 ? 0 : 9.99));
  cartGrandTotal = computed(() => Math.max(0, this.cartSubtotal() - this.cartDiscount() + this.cartShipping()));

  // Navigation
  navigate(page: 'home' | 'products' | 'product-detail', cat?: string) {
    if (cat) this.selectedCategory.set(cat);
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openProductDetail(prod: Product) {
    this.selectedProduct.set(prod);
    this.detailColor.set(prod.colors[0]?.name || 'Standard');
    this.detailQuantity.set(1);
    this.currentPage.set('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleFaq(id: string) {
    this.openFaqId.set(this.openFaqId() === id ? null : id);
  }

  // Cart operations
  addToCart(prod: Product, color: string = 'Standard', qty: number = 1) {
    const items = [...this.cartItems()];
    const existing = items.find((i) => i.id === prod.id && i.selectedColor === color);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        selectedColor: color,
        quantity: qty,
      });
    }
    this.cartItems.set(items);
    this.addToast(`Added ${qty}x "${prod.name}" (${color}) to your cart!`, 'success');
  }

  updateCartQty(id: string, color: string, delta: number) {
    let items = [...this.cartItems()];
    const item = items.find((i) => i.id === id && i.selectedColor === color);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        items = items.filter((i) => !(i.id === id && i.selectedColor === color));
        this.addToast('Item removed from cart.', 'info');
      }
      this.cartItems.set(items);
    }
  }

  removeFromCart(id: string, color: string) {
    this.cartItems.set(this.cartItems().filter((i) => !(i.id === id && i.selectedColor === color)));
    this.addToast('Item removed from cart.', 'info');
  }

  toggleWishlist(id: string) {
    const list = [...this.wishlistIds()];
    if (list.includes(id)) {
      this.wishlistIds.set(list.filter((x) => x !== id));
      this.addToast('Removed item from wishlist.', 'info');
    } else {
      list.push(id);
      this.wishlistIds.set(list);
      this.addToast('Saved item to wishlist!', 'info');
    }
  }

  applyCoupon() {
    if (this.couponInput().trim().toUpperCase() === 'A11Y20') {
      this.discountPercent.set(20);
      this.couponFeedback.set('✅ 20% Discount applied successfully!');
    } else {
      this.couponFeedback.set('❌ Invalid code. Try "A11Y20"');
    }
  }

  handleCheckoutSubmit() {
    const errs: { [key: string]: string } = {};
    if (!this.checkoutForm.fullName.trim()) errs['fullName'] = 'Full Name is required';
    if (!this.checkoutForm.email.trim()) errs['email'] = 'Email Address is required';
    if (!this.checkoutForm.address.trim()) errs['address'] = 'Street Address is required';
    if (!this.checkoutForm.city.trim()) errs['city'] = 'City is required';
    if (!this.checkoutForm.zip.trim()) errs['zip'] = 'Postal / Zip code is required';
    if (!this.checkoutForm.cardNumber.trim()) errs['cardNumber'] = 'Card number is required';

    if (Object.keys(errs).length > 0) {
      this.checkoutErrors = errs;
      return;
    }
    this.checkoutSuccess.set(true);
    this.cartItems.set([]);
    this.discountPercent.set(0);
    this.addToast('Order confirmed! Receipt sent to your email.', 'success');
  }

  async runAxe() {
    this.isScanningAxe.set(true);
    try {
      const res = await axe.run(document.body, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      });
      this.axeResults.set(res);
      this.isLiveAxeOpen.set(true);
    } catch (e) {
      console.error('Axe error:', e);
    } finally {
      this.isScanningAxe.set(false);
    }
  }

  addToast(msg: string, type: 'info' | 'success' = 'info') {
    const id = Date.now() + Math.random();
    this.toasts.set([...this.toasts(), { id, message: msg, type }]);
    setTimeout(() => {
      this.toasts.set(this.toasts().filter((t) => t.id !== id));
    }, 4000);
  }

  removeToast(id: number) {
    this.toasts.set(this.toasts().filter((t) => t.id !== id));
  }

  @HostListener('window:focusin', ['$event'])
  onFocusIn(e: FocusEvent) {
    const el = e.target as HTMLElement;
    if (!el || el === document.body) {
      this.focusedInfo.set(null);
      return;
    }
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute('role') || 'implicit';
    const id = el.id ? `#${el.id}` : '';
    const label =
      el.getAttribute('aria-label') ||
      el.innerText?.slice(0, 30) ||
      (el as HTMLInputElement).placeholder ||
      'None';
    this.focusedInfo.set({
      tag,
      id,
      role,
      label,
      hasNoName: !el.getAttribute('aria-label') && !el.innerText?.trim() && !el.title,
    });
  }
}
