import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { DeleteDeviceComponent } from '../delete-device/delete-device.component';
import { Device } from '../../core/models/device.model';
import { DeviceService } from '../../core/services/device.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { AddNewDeviceDialogComponent } from '../add-new-device-form/add-new-device-dialog.component';

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-device-list',
  imports: [
    TableModule,
    BadgeModule,
    CommonModule,
    DeleteDeviceComponent,
    ButtonModule,
    AddNewDeviceDialogComponent,
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss',
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  first = 0;

  rows = 10;
  private subscription!: Subscription;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.getDevicesAfter4s();
  }

  getDevicesAfter4s(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = interval(4000)
      .pipe(switchMap(() => this.deviceService.getDevices()))
      .subscribe({
        next: (data: Device[]) => (this.devices = data),
        error: (err: any) => console.error('API hiba:', err),
      });
  }

  getDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (data: Device[]) => (this.devices = data),
      error: (err: any) => console.error('API hiba:', err),
    });
  }

  handleDeviceDeleted(): void {
    this.deviceService.getDevices().subscribe({
      next: (data: Device[]) => (this.devices = data),
      error: (err: any) => console.error('API hiba:', err),
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.devices ? this.first + this.rows >= this.devices.length : true;
  }

  isFirstPage(): boolean {
    return this.devices ? this.first === 0 : true;
  }
}
