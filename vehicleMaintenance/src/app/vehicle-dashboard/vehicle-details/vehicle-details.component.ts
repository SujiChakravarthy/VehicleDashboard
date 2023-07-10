import { Component } from '@angular/core';
import { VehicleService } from '../../common/services/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent {
  /*This component is for displaying the vehicle details based on MAKE_ID selection */
  constructor(public vehicleSrv: VehicleService) { }
}
