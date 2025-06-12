import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss'],
})
export class DeleteDeviceComponent implements OnInit {
  @Input() deviceId!: string;
  localDeviceId: string | null = null;

  @Output() deleteSuccess = new EventEmitter<void>();

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.localDeviceId = this.deviceId;
  }

  deleteDevice(): void {
    if (this.localDeviceId) {
      this.deviceService.deleteDevice(this.localDeviceId).subscribe({
        next: () => {
          console.log('Device deleted successfully');
          this.deleteSuccess.emit();
        },
        error: (err) => {
          console.error('Error deleting device', err);
        },
      });
    } else {
      console.error('Device ID is missing');
    }
  }
}
