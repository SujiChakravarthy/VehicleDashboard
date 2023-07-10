import { Component } from '@angular/core';
import { VehicleService } from '../common/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /*landing Page component*/
  constructor(private vehicleSrv: VehicleService) {
    this.vehicleSrv.showVehicleModelData = false;
    this.vehicleSrv.showModelDataSpinner = false;
  }
}
