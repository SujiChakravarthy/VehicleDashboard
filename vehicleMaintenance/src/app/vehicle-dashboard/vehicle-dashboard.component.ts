import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { GetVehicleMakersResponse, Results } from '../common/models/GetVehicleMakers.model'
import { VehicleService } from '../common/services/vehicle.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.css']
})

export class VehicleDashboardComponent implements OnInit {

  vehicleAllDetails!: GetVehicleMakersResponse;
  page: any;
  title: string = "Vehicle DashBoard"
  errorMessage: string = "";
  errorFlag: boolean = false;

  constructor(public vehicleSrv: VehicleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    /* If the API response is not present ,then trigger a external API call */
    if (this.vehicleSrv.getAllVehicleDetails() !== null) {
      this.vehicleSrv.showSpinner = false;
      this.vehicleAllDetails = this.vehicleSrv.getAllVehicleDetails()
    } else {
      this.vehicleSrv.getAllVehicles().subscribe(
        {
          next: (response) => {
            this.vehicleSrv.showSpinner = false;
            this.vehicleAllDetails = response;
            /* GET_ALL_MAKES_API returns huge data,to avoid multiple external API calls
               saved the API response in session storage  */
            this.vehicleSrv.storeAllVehicleDetails(this.vehicleAllDetails);
            this.errorFlag = false;
          },
          error: (error) => {
            this.errorFlag = true;
            /* Error response is handled in interceptors as well */
            if (error instanceof HttpErrorResponse) {
              this.errorMessage = "Opps ! Something went wrong"
            }
          }
        });
    }

  }

  /*Selected Vehicle details are passed to display model and vehicle types*/
  onMakeIDClick(vehicle: Results) {
    this.vehicleSrv.showVehicleModelData = false;
    this.vehicleSrv.showModelDataSpinner = true;
    this.vehicleSrv.getvehicleDetails(vehicle);
  }
}
