import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeviceService } from '../../core/services/device.service';
import { ButtonModule } from 'primeng/button';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-device',
  standalone: true,
  imports: [ButtonModule, SweetAlert2Module],
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss'],
})
export class DeleteDeviceComponent {
  @Input() deviceId!: string;

  @Output() deleteSuccess = new EventEmitter<void>();

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService
  ) {}

  deleteDevice(): void {
    if (this.deviceId) {
      this.deviceService.deleteDevice(this.deviceId).subscribe({
        next: () => {
          console.log('Device deleted successfully');
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Device deleted successfully'
          });
          this.deleteSuccess.emit();
        },
        error: (err) => {
          console.error('Error deleting device', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete device'
          });
        },
      });
    } else {
      console.error('Device ID is missing');
    }
  }
}
