import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-device-dialog',
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-new-device-dialog.component.html',
  styleUrls: ['./add-new-device-dialog.component.scss'],
})
export class AddNewDeviceDialogComponent {
  visible: boolean = false;
  deviceForm: FormGroup;

  // IP address validation pattern
  private ipPattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  constructor(private fb: FormBuilder) {
    this.deviceForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      ip: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  showDialog(): void {
    this.visible = true;
    this.deviceForm.reset();
  }

  closeDialog(): void {
    this.visible = false;
    this.deviceForm.reset();
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      const deviceData = this.deviceForm.value;
      console.log('Device data:', deviceData);

      // Here you would typically call a service to save the device
      // this.deviceService.saveDevice(deviceData).subscribe(...)

      this.closeDialog();
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.deviceForm.controls).forEach((key) => {
      const control = this.deviceForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access to form controls
  get name() {
    return this.deviceForm.get('name');
  }
  get type() {
    return this.deviceForm.get('type');
  }
  get ip() {
    return this.deviceForm.get('ip');
  }
  get location() {
    return this.deviceForm.get('location');
  }

  // Helper methods for validation states
  isFieldInvalid(fieldName: string): boolean {
    const field = this.deviceForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.deviceForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.deviceForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${
          field.errors['minlength'].requiredLength
        } characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldDisplayName(fieldName)} cannot exceed ${
          field.errors['maxlength'].requiredLength
        } characters`;
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid IP address';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: 'Name',
      type: 'Type',
      ip: 'IP Address',
      location: 'Location',
    };
    return displayNames[fieldName] || fieldName;
  }
}
