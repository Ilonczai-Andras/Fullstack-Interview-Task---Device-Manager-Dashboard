import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-device-dialog',
  imports: [ButtonModule, DialogModule, FormsModule],
  templateUrl: './add-new-device-dialog.component.html',
  styleUrls: ['./add-new-device-dialog.component.scss'],
})
export class AddNewDeviceDialogComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  hideDialog(): void {
    this.visible = false;
  }
  device = {
    name: '',
    type: '',
    ip: '',
    location: '',
  };
  ipPattern: string =
    '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';

  saveDevice() {
    if (this.isFormValid()) {
      console.log('Device saved:', this.device);
      this.visible = false;
    }
  }

  isFormValid(): boolean {
    return (
      this.device.name !== '' &&
      this.device.type !== '' &&
      this.device.ip !== '' &&
      this.device.location !== '' &&
      this.isValidIP()
    );
  }

  isValidIP(): boolean {
    const ipRegex = new RegExp(this.ipPattern);
    return ipRegex.test(this.device.ip);
  }
}
