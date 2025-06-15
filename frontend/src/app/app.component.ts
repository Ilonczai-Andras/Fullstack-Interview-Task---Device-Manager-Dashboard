import { Component } from '@angular/core';
import { DeviceListComponent } from './features/device-list/device-list.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DeviceListComponent, ToastModule],
})
export class AppComponent {
  title = 'Device-Manager-Dashboard';
}
