import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import flatpickr from 'flatpickr';
import { German } from 'flatpickr/dist/l10n/de';

/**
 * Main form component for travel requests.
 * Handles form initialization, validation, and submission.
 * Uses reactive forms for data management and validation.
 */
@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RequestFormComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  years: number[] = [];
  submitted = false;

  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the component:
   * 1. Generates year options for date selections (1920 to current)
   * 2. Creates reactive form with validation rules
   * 3. Sets up form structure for travel period, adults, children, and contact info
   */
  ngOnInit(): void {
    // Generate selectable years from current year back to 1920
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1920; y--) {
      this.years.push(y);
    }

    // Initialize reactive form with validation rules
    this.form = this.fb.group({
      reisezeitraum: ['', Validators.required], // Travel period (required)
      erwachsene: ['', [Validators.required, Validators.min(1)]], // Adults count (min 1)
      kinder: this.fb.array([
        this.createChildFormGroup(), // Initialize with two child entries
        this.createChildFormGroup(),
      ]),
      kontakt: this.fb.group({
        // Contact information group with validations
        vorname: ['', Validators.required],
        nachname: ['', Validators.required],
        geschlecht: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]], // Email format validation
        land: ['', Validators.required],
        plz: ['', Validators.required],
        stadt: ['', Validators.required],
        strasse: ['', Validators.required],
        telefon: [''], // Optional field
        wunsch: [''], // Optional field
      }),
    });
  }

  /**
   * Sets up the date picker after view initialization:
   * 1. Configures flatpickr with German localization
   * 2. Handles responsive calendar display (1 or 2 months)
   * 3. Sets up window resize handling for calendar
   * 4. Enables calendar icon interaction
   */
  ngAfterViewInit() {
    const input = document.querySelector('#reisezeitraum') as HTMLElement;
    if (!input) return;

    // Configure responsive calendar display
    const isMobile = window.innerWidth < 768;
    this.initializeFlatpickr(input, isMobile);

    // Handle window resizing for calendar responsiveness
    window.addEventListener('resize', () => {
      const currentInstance = (input as any)._flatpickr;
      if (currentInstance) {
        const shouldBeMobile = window.innerWidth < 768;
        if (
          (shouldBeMobile && currentInstance.config.showMonths !== 1) ||
          (!shouldBeMobile && currentInstance.config.showMonths !== 2)
        ) {
          // Recreate the instance with new settings
          currentInstance.destroy();
          flatpickr(input, {
            mode: 'range',
            dateFormat: 'd.m.Y',
            locale: German,
            minDate: 'today',
            showMonths: shouldBeMobile ? 1 : 2,
            monthSelectorType: 'static',
            onChange: (selectedDates, dateStr) => {
              this.form.patchValue({ reisezeitraum: dateStr });
            },
          });
        }
      }
    });

    // Enable calendar icon click interaction
    const icon = document.querySelector('.calendar-icon');
    if (icon) {
      icon.addEventListener('click', () => input.click());
    }
  }

  /**
   * Creates a form group for a child entry with required fields:
   * - name
   * - birth day, month, and year
   */
  createChildFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      tag: ['', Validators.required],
      monat: ['', Validators.required],
      jahr: ['', Validators.required],
    });
  }

  /**
   * Getter for the children FormArray.
   * Provides type-safe access to the children form controls.
   */
  get kinder() {
    return this.form.get('kinder') as FormArray;
  }

  /**
   * Adds a new child form group to the children array.
   * Prevents default link behavior.
   */
  addChild(event: Event) {
    event.preventDefault();
    this.kinder.push(this.createChildFormGroup());
  }

  /**
   * Removes the last child form group if more than one exists.
   * Prevents default link behavior.
   */
  removeChild(event: Event) {
    event.preventDefault();
    if (this.kinder.length > 1) {
      this.kinder.removeAt(this.kinder.length - 1);
    }
  }

  /**
   * Handles form submission:
   * 1. Marks form as submitted
   * 2. Validates all fields
   * 3. Shows validation errors if invalid
   * 4. Displays success message if valid
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Trigger validation display
      const form = document.querySelector('form');
      if (form) form.classList.add('was-validated');
      return;
    }

    alert('Form is valid 🎉');
  }

  /**
   * Checks if a form field is invalid and has been touched.
   * Used for displaying validation errors in the template.
   */
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  /**
   * Checks if a number input is invalid:
   * - Has been touched
   * - Is required but empty
   * - Is below minimum value
   * - Is zero or negative
   */
  isNumberInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return (
      !!control &&
      control.touched &&
      (control.hasError('required') ||
        control.hasError('min') ||
        control.value <= 0)
    );
  }

  /**
   * Helper method to initialize flatpickr with given configuration
   * @param input The input element to attach flatpickr to
   * @param isMobile Whether to use mobile configuration
   */
  private initializeFlatpickr(input: HTMLElement, isMobile: boolean) {
    flatpickr(input, {
      mode: 'range',
      dateFormat: 'd.m.Y',
      locale: German,
      minDate: 'today',
      showMonths: isMobile ? 1 : 2,
      monthSelectorType: 'static',
      onChange: (selectedDates, dateStr) => {
        this.form.patchValue({ reisezeitraum: dateStr });
      },
    });
  }
}
