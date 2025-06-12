import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AddDeviceComponent } from "../add-device/add-device.component";
import { Device } from '../../core/models/device.model';
import { DeviceService } from '../../core/services/device.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-device-list',
  imports: [TableModule, BadgeModule, CommonModule, AddDeviceComponent],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = [];
  private subscription!: Subscription;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.subscription = interval(4000).pipe(
      switchMap(() => this.deviceService.getDevices())
    )
    .subscribe({
      next: (data: Device[]) => this.devices = data,
      error: (err: any) => console.error('API hiba:', err)
});
  }

  stockSeverity(product: Product): 'success' | 'info' | 'warning' | 'danger' | null | undefined {
    if (product.quantity > 50) {
      return 'success'; // Green
    } else if (product.quantity > 0) {
      return 'warning'; // Orange
    } else {
      return 'danger'; // Red
    }
  }

  // ... rest of your component code (rowClass, rowStyle, etc.)
  rowClass(product: Product): string {
    if (product.code === 'zz1cz3c1') {
      return 'highlighted-row';
    }
    if (product.code === 'av223jfwg') {
      return 'zero-quantity-row';
    }
    return '';
  }

  rowStyle(product: Product): { [key: string]: string } {
    return {};
  }
}
