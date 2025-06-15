import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Device } from '../../core/models/device.model';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-device-dashboard-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.scss'],
})
export class DeviceDashboardComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;
  countData: any;

  isRefreshing = false;
  intervalId: any;

  @Input() Devices: Device[] = [];

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );
    this.chartData = {
      labels: [new Date().toLocaleTimeString()],
      datasets: [
        {
          label: 'Active',
          data: [0],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
          tension: 0.4,
        },
        {
          label: 'Error',
          data: [0],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          tension: 0.4,
        },
        {
          label: 'Inactive',
          data: [0],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    this.countData = {
      active: 0,
      error: 0,
      inactive: 0,
    };
  }

  toggleRefresh() {
    this.isRefreshing = !this.isRefreshing;

    if (this.isRefreshing) {
      this.intervalId = setInterval(() => this.updateChart(), 2000);
    } else {
      clearInterval(this.intervalId);
    }
  }

  clearChart(){
  if (this.isRefreshing) {
    this.isRefreshing = false;
    clearInterval(this.intervalId);
  }

  this.countData = {
    active: 0,
    error: 0,
    inactive: 0,
  };

  const { labels, datasets } = this.chartData;
  labels.length = 0;
  datasets.forEach((ds: any) => ds.data.length = 0);

  // Trigger chart update
  this.chartData = { ...this.chartData };
}

  updateChart() {
    const now = new Date().toLocaleTimeString();
    const active = this.Devices.filter((d) => d.status === 'active').length;
    const error = this.Devices.filter((d) => d.status === 'error').length;
    const inactive = this.Devices.filter((d) => d.status === 'inactive').length;

    this.countData = {
      active,
      error,
      inactive,
    };

    const { labels, datasets } = this.chartData;

    labels.push(now);
    datasets[0].data.push(active);
    datasets[1].data.push(error);
    datasets[2].data.push(inactive);

    // Limit history
    if (labels.length > 20) {
      labels.shift();
      datasets.forEach((ds: any) => ds.data.shift());
    }

    // Trigger chart update
    this.chartData = { ...this.chartData };
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
