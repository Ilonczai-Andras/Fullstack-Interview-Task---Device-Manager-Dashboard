import { Component } from '@angular/core';
import { DeviceListComponent } from './features/device-list/device-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [DeviceListComponent]
})
export class AppComponent {
  title = 'Device-Manager-Dashboard';
}
