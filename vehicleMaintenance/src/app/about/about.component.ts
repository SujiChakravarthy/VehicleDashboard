import { Component } from '@angular/core';
import { VehicleService } from '../common/services/vehicle.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private vehicleSrv: VehicleService) {
    this.vehicleSrv.showVehicleModelData = false;
    this.vehicleSrv.showModelDataSpinner = false;
  }
}
