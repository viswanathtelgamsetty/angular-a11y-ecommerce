import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-demo">
      <p class="demo-description">
        Tests form control labeling, error association (\`aria-describedby\`), \`aria-invalid\`, required field announcements, and autocomplete semantics.
      </p>

      @if (submitted()) {
        <div class="alert alert-success" [attr.role]="isAccessible() ? 'status' : null">
          Registration successful! Form passed all checks.
        </div>
      } @else {
        <form class="form-stack" (submit)="handleSubmit($event)" novalidate>
          <!-- 1. Name Field -->
          <div class="form-group">
            @if (isAccessible()) {
              <label for="ng-user-name" class="form-label">
                Full Name <span aria-hidden="true" class="required-star">*</span>
              </label>
              <input
                id="ng-user-name"
                type="text"
                name="name"
                autocomplete="name"
                class="form-input"
                [class.input-error]="errors().name"
                [value]="name()"
                (input)="name.set($any($event.target).value)"
                aria-required="true"
                [attr.aria-invalid]="errors().name ? 'true' : 'false'"
                [attr.aria-describedby]="errors().name ? 'ng-name-error' : null"
              />
              @if (errors().name) {
                <span id="ng-name-error" class="form-error-text" role="alert">
                  {{ errors().name }}
                </span>
              }
            } @else {
              <div class="form-label-fake">Full Name *</div>
              <input
                type="text"
                placeholder="Enter full name"
                class="form-input"
                [value]="name()"
                (input)="name.set($any($event.target).value)"
              />
              @if (errors().name) {
                <div style="color: red; font-size: 13px; margin-top: 4px;">
                  {{ errors().name }}
                </div>
              }
            }
          </div>

          <!-- 2. Email Field -->
          <div class="form-group">
            @if (isAccessible()) {
              <label for="ng-user-email" class="form-label">
                Email Address <span aria-hidden="true" class="required-star">*</span>
              </label>
              <input
                id="ng-user-email"
                type="email"
                name="email"
                autocomplete="email"
                class="form-input"
                [class.input-error]="errors().email"
                [value]="email()"
                (input)="email.set($any($event.target).value)"
                aria-required="true"
                [attr.aria-invalid]="errors().email ? 'true' : 'false'"
                [attr.aria-describedby]="errors().email ? 'ng-email-error ng-email-hint' : 'ng-email-hint'"
              />
              <span id="ng-email-hint" class="form-hint-text">We will never share your email address.</span>
              @if (errors().email) {
                <span id="ng-email-error" class="form-error-text" role="alert">
                  {{ errors().email }}
                </span>
              }
            } @else {
              <input
                type="text"
                placeholder="Email Address (required)"
                class="form-input"
                [value]="email()"
                (input)="email.set($any($event.target).value)"
              />
              <div style="color: #888; font-size: 12px; margin-top: 4px;">We will never share your email address.</div>
              @if (errors().email) {
                <div style="color: red; font-size: 13px; margin-top: 4px;">
                  {{ errors().email }}
                </div>
              }
            }
          </div>

          <!-- 3. Password Field -->
          <div class="form-group">
            @if (isAccessible()) {
              <label for="ng-user-password" class="form-label">
                Create Password <span aria-hidden="true" class="required-star">*</span>
              </label>
              <input
                id="ng-user-password"
                type="password"
                name="password"
                autocomplete="new-password"
                class="form-input"
                [class.input-error]="errors().password"
                [value]="password()"
                (input)="password.set($any($event.target).value)"
                aria-required="true"
                [attr.aria-invalid]="errors().password ? 'true' : 'false'"
                [attr.aria-describedby]="errors().password ? 'ng-pwd-error ng-pwd-hint' : 'ng-pwd-hint'"
              />
              <span id="ng-pwd-hint" class="form-hint-text">Must be at least 8 characters long.</span>
              @if (errors().password) {
                <span id="ng-pwd-error" class="form-error-text" role="alert">
                  {{ errors().password }}
                </span>
              }
            } @else {
              <div class="form-label-fake">Create Password *</div>
              <input
                type="password"
                placeholder="••••••••"
                class="form-input"
                [value]="password()"
                (input)="password.set($any($event.target).value)"
              />
              @if (errors().password) {
                <div style="color: red; font-size: 13px; margin-top: 4px;">
                  {{ errors().password }}
                </div>
              }
            }
          </div>

          <div style="margin-top: 12px;">
            <button type="submit" class="btn btn-primary">Register Account</button>
          </div>
        </form>
      }
    </div>
  `
})
export class RegistrationFormComponent {
  isAccessible = input<boolean>(false);
  name = signal('');
  email = signal('');
  password = signal('');
  errors = signal<{ name?: string; email?: string; password?: string }>({});
  submitted = signal(false);

  handleSubmit(e: Event) {
    e.preventDefault();
    const errs: { name?: string; email?: string; password?: string } = {};

    if (!this.name().trim()) errs.name = 'Full Name is required.';
    if (!this.email().includes('@')) errs.email = 'Please provide a valid email address.';
    if (this.password().length < 8) errs.password = 'Password must be at least 8 characters.';

    this.errors.set(errs);
    if (Object.keys(errs).length === 0) {
      this.submitted.set(true);
    }
  }
}
