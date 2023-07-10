import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from './common/services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sidebarCollapsed: boolean = false;
  headingText: string = "Welcome Customer";

  constructor(public vehicleSrv: VehicleService) { }

  collapseSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

}
