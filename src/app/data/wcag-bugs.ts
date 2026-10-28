export interface WcagBug {
  id: string;
  area: string;
  title: string;
  wcag: string;
  level: string;
  impact: string;
  flawedBehavior: string;
  testingSteps: {
    keyboard?: string;
    screenReader?: string;
    automated?: string;
    visual?: string;
  };
  remediation: string;
}

export const WCAG_BUGS: WcagBug[] = [
  {
    id: 'bug-1',
    area: 'Product Cards & Catalog',
    title: 'Missing or Non-Descriptive Image Alternative Text',
    wcag: '1.1.1 Non-text Content',
    level: 'A',
    impact: 'Critical',
    flawedBehavior: 'Product images have generic alt="image", alt="stand", or omit alt entirely. Screen readers announce "image" or read raw image filenames (e.g. "IMG_2026.png"), leaving visually impaired users unaware of what the product actually looks like.',
    testingSteps: {
      screenReader: 'Enable VoiceOver (Cmd+F5) and navigate through product cards using VO+Right Arrow. Notice images are read as "image" or silent.',
      keyboard: 'Visual inspection: Turn off images or inspect <img> tags in DevTools.',
      automated: 'Run Live Axe Audit. Flags "image-alt" violation across multiple cards.',
    },
    remediation: 'Provide concise, descriptive alternative text detailing the product type, color, material, and distinctive physical attributes.',
  },
  {
    id: 'bug-2',
    area: 'Checkout & Registration Forms',
    title: 'Missing Semantic Form Labels (Placeholders as Fake Labels)',
    wcag: '1.3.1 Info and Relationships / 3.3.2 Labels or Instructions',
    level: 'A',
    impact: 'Critical',
    flawedBehavior: 'Input fields in Checkout and Newsletter use <input placeholder="..."> without any associated <label> or aria-label. When a user begins typing, the placeholder text disappears, leaving users with memory or cognitive impairments lost. Screen readers announce generic "edit text" without the field name.',
    testingSteps: {
      screenReader: 'Focus the shipping address fields in Checkout. VoiceOver announces "edit text, blank" instead of "Full Name" or "Street Address".',
      keyboard: 'Press Tab through the checkout form. Observe lack of permanent visual labels.',
      automated: 'Run Axe or Lighthouse. Flags "label" rule violations on all inputs.',
    },
    remediation: 'Add explicit <label for="field-id"> tags permanently visible above inputs and programmatically bound to the input element.',
  },
  {
    id: 'bug-3',
    area: 'Product Variants & Stock',
    title: 'Information Conveyed Solely via Color (Stock Status & Color Swatches)',
    wcag: '1.4.1 Use of Color',
    level: 'A',
    impact: 'Serious',
    flawedBehavior: 'Stock status is indicated only by a tiny green dot (in stock) or red dot (low stock) without accompanying text. Color swatches are bare circles with inline background colors with no text or accessible name.',
    testingSteps: {
      screenReader: 'Inspect the color options or stock dot in VoiceOver Rotor. The stock status is completely ignored, and swatches read as empty buttons.',
      visual: 'Simulate protanopia / deuteranopia color blindness using Chrome DevTools (Rendering > Emulate vision deficiencies).',
      automated: 'Axe flags elements lacking accessible names.',
    },
    remediation: 'Accompany color cues with visible text ("In Stock" / "Low Stock - Only 3 left") and add aria-label="Select Matte Black color variant" with aria-pressed.',
  },
  {
    id: 'bug-4',
    area: 'Top Promo Bar & Price Badges',
    title: 'Insufficient Color Contrast Below WCAG Minimum Ratio',
    wcag: '1.4.3 Contrast (Minimum)',
    level: 'AA',
    impact: 'Serious',
    flawedBehavior: 'The announcement ticker uses light gray text on pastel background (#94a3b8 on #fef08a = 2.1:1), and product discount badges use low-contrast text against translucent backgrounds, failing the minimum 4.5:1 ratio.',
    testingSteps: {
      visual: 'Check text readability in bright sunlight or low-brightness screens.',
      automated: 'Run Axe Audit or inspect with Chrome DevTools color picker to view the 2.1:1 failing contrast ratio.',
    },
    remediation: 'Ensure all normal text has at least a 4.5:1 contrast ratio against its background.',
  },
  {
    id: 'bug-5',
    area: 'Navigation & Category Menus',
    title: 'Mouse Hover-Only Dropdown (Inaccessible via Keyboard)',
    wcag: '2.1.1 Keyboard Accessible',
    level: 'A',
    impact: 'Critical',
    flawedBehavior: 'The "Categories" navigation menu opens exclusively via CSS :hover or mouse enter. Pressing Tab skips past the subcategories entirely, making them completely unreachable for keyboard-only users.',
    testingSteps: {
      keyboard: 'Unplug or stop using your mouse. Press Tab from the logo to the navigation bar. Notice the category dropdown never opens.',
    },
    remediation: 'Implement accessible disclosure or flyout pattern with a native <button aria-expanded="false" aria-haspopup="true"> that toggles on Enter or Space.',
  },
  {
    id: 'bug-6',
    area: 'Quick View Modal Dialog',
    title: 'No Keyboard Focus Trap & Focus Bleed to Background Content',
    wcag: '2.1.2 No Keyboard Trap / 2.4.3 Focus Order',
    level: 'A',
    impact: 'Critical',
    flawedBehavior: 'When the "Quick View" product modal opens, focus is NOT redirected into the modal. Pressing Tab moves focus behind the dark modal backdrop into the underlying storefront page! Furthermore, pressing Escape does not close the dialog.',
    testingSteps: {
      keyboard: 'Click "Quick View" on any product. Press Tab repeatedly. Watch the focus ring jump to links on the page underneath the modal rather than inside it!',
    },
    remediation: 'Add role="dialog" aria-modal="true" aria-labelledby="modal-title". Trap Tab and Shift+Tab strictly inside the modal dialog elements, and close on Escape key.',
  },
];
