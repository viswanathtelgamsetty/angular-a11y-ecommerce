# 🛒 AuraStore — Angular 21 E-Commerce Accessibility Testbed

A realistic, full-featured **Angular 21** e-commerce storefront designed specifically for accessibility (a11y) auditing and testing. It contains deliberate, real-world **WCAG 2.1 & 2.2 violations** (Level A & AA) across navigation, forms, modals, tables, and media for manual screen-reader testing (VoiceOver/NVDA) and automated testing (Axe, Lighthouse, Wave).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
# Server running at http://localhost:4200

# Build production bundle
npm run build
```

---

## 🛍️ Included Pages & Features

1. **🏠 Home Page**:
   - Auto-scrolling flash sale announcement bar (`A11Y20` coupon).
   - Hero showcase banner with CTA and promotional discounts.
   - Featured categories grid (Audio, Wearables, Computing, Accessories).
   - Best seller hardware products grid.
   - Value propositions strip.
   - Hardware comparison benchmark table.
   - Frequently Asked Questions (FAQ) accordion.
2. **📦 Products List Page**:
   - Breadcrumbs navigation (`Home / Products / [Category]`).
   - Category filter pills, in-stock checkbox, sort options, live search bar.
   - Responsive product cards grid with stock indicators, star ratings, and prices.
3. **🔍 Product Details Page**:
   - Full product photography, description, specifications, and warranty badges.
   - Interactive color swatches and quantity steppers (+ / -).
   - "Add to Cart" and "Add to Wishlist".
   - Tabbed sections (Features, Technical Specs, Customer Reviews).
4. **🛒 Slide-Over Cart Drawer**:
   - Flyout drawer showing item quantities, promo code box, price breakdown, and checkout trigger.
5. **💳 3-Step Checkout Flow**:
   - Customer shipping address form with validation errors, payment info, and simulated order confirmation invoice.
6. **📄 Footer**:
   - Newsletter subscription form, category links, customer support, and social icons.

---

## 🪲 Deliberate WCAG Violations Planted for Testing

- **WCAG 1.1.1 Non-text Content**: Generic `alt="image"` or missing `alt` attributes; star ratings lack text alternative.
- **WCAG 1.3.1 Info & Relationships**: Inputs lack `<label>` tags (using only disappearing placeholders); comparison specs built with `<div>` flexbox instead of semantic `<table>`.
- **WCAG 1.4.1 Use of Color**: Stock status indicated solely by a red/green dot with no text; color swatches lack text or accessible names.
- **WCAG 1.4.3 Contrast (Minimum)**: Low-contrast ticker text (#94a3b8 on #fef08a = 2.1:1 ratio, failing AA 4.5:1).
- **WCAG 2.1.1 Keyboard Accessible**: Category dropdown menu opens only on mouse `:hover`; fake `<div>` stepper buttons.
- **WCAG 2.1.2 No Keyboard Trap**: Modal dialogs and cart drawer do not trap focus (Tab escapes into background page); Escape key disabled.
- **WCAG 2.2.2 Pause, Stop, Hide**: Auto-rotating promotional ticker without pause/stop control.
- **WCAG 2.4.3 Focus Order**: Hidden ghost links inside collapsed accordion panels remain in the keyboard Tab order.
- **WCAG 2.4.4 Link Purpose (In Context)**: Ambiguous repeated "Learn More" and "Buy Now" links without context.
- **WCAG 2.4.7 Focus Visible**: Custom CSS removing `:focus` outlines (`outline: none`) on interactive buttons and swatches.
- **WCAG 2.5.3 Label in Name**: Interactive buttons where visible text does not match programmatic accessible name.
- **WCAG 3.2.2 On Input**: Auto-advancing dropdown / checkbox filters triggering layout shifts without warning.
- **WCAG 3.3.1 Error Identification**: Form errors indicated only by red borders with no error text or `aria-invalid`.
- **WCAG 3.3.2 Labels or Instructions**: Missing required field indicators and format hints for credit card expiry/CVV.
- **WCAG 4.1.2 Name, Role, Value**: Custom buttons created with `<div>` without `role="button"` or `tabindex="0"`; tabs lack `role="tablist"` / `role="tab"`.
- **WCAG 4.1.3 Status Messages**: Dynamic cart additions and coupon code notifications lack `aria-live` polite announcements.

---

## 🧪 Accessibility Testing Checklist

You can test this repository using:
- **Automated Scanners**:
  - [Axe DevTools Extension](https://www.deque.com/axe/devtools/)
  - Chrome Lighthouse Accessibility Audit
  - WAVE Web Accessibility Evaluation Tool
- **Screen Readers**:
  - VoiceOver (macOS / iOS)
  - NVDA / JAWS (Windows)
  - TalkBack (Android)
- **Manual Keyboard Audit**:
  - Test keyboard Tab, Shift+Tab, Enter, Space, and Esc throughout all interactive workflows.
