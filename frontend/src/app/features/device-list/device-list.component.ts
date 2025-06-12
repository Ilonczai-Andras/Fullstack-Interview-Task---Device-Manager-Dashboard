import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { DeleteDeviceComponent } from '../delete-device/delete-device.component';
import { Device } from '../../core/models/device.model';
import { DeviceService } from '../../core/services/device.service';
import { interval, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-device-list',
  imports: [TableModule, BadgeModule, CommonModule, DeleteDeviceComponent],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss',
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  private subscription!: Subscription;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.subscription = interval(4000)
      .pipe(switchMap(() => this.deviceService.getDevices()))
      .subscribe({
        next: (data: Device[]) => (this.devices = data),
        error: (err: any) => console.error('API hiba:', err),
      });
  }

  handleDeviceDeleted(): void {
    this.deviceService.getDevices()
      .subscribe({
        next: (data: Device[]) => (this.devices = data),
        error: (err: any) => console.error('API hiba:', err),
      });
  }
}
