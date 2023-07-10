import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from './../../../environments/environment';
import { GetVehicleMakersResponse } from '../models/GetVehicleMakers.model';
import { GetByMakeIDResponse } from '../models/GetModelByMakeID';
import { GetVehicleTypeResponse } from '../../common/models/GetVehicleType';
import { VehicleDetail } from '../models/globals';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  showVehicleModelData: boolean = false;
  showModelDataSpinner:boolean = false;
  showSpinner: boolean = true;
  errorMessage: string = "";

  vehicleDetail: VehicleDetail = {
    Make_ID: { label: "Make_ID", value: 0 },
    Make_Name: { label: "Make_Name", value: '' },
    Model_ID: { label: "Model_ID", value: 0 },
    Model_Name: { label: "Model_Name", value: '' },
    VehicleTypeId: { label: "VehicleTypeId", value: 0 },
    VehicleTypeName: { label: "VehicleTypeName", value: '' }
  }

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<GetVehicleMakersResponse> {
    return this.http.get<GetVehicleMakersResponse>(environment.GET_ALL_MAKES_API);
  }

  storeAllVehicleDetails(vehicleDetail: GetVehicleMakersResponse) {
    sessionStorage.setItem('vehicleAllDetails', JSON.stringify(vehicleDetail));
  }

  getAllVehicleDetails() {
    const vehicleAllDetails = sessionStorage.getItem('vehicleAllDetails');
    return vehicleAllDetails !== null ? JSON.parse(vehicleAllDetails) : null;
  }

  getvehicleDetails(vehicle: any) {

    this.vehicleDetail.Make_ID.value = vehicle.Make_ID;
    this.vehicleDetail.Make_Name.value = vehicle.Make_Name;

    forkJoin(
      [
        this.http.get<GetByMakeIDResponse>(`${environment.GET_MODEL_FOR_MAKEID_API}/${vehicle.Make_ID}?format=json`),
        this.http.get<GetVehicleTypeResponse>(`${environment.GET_VEHICLETYPES_API}/${vehicle.Make_ID}?format=json`)
      ]
    )
      .subscribe({
        next: (result) => {

          this.showSpinner = false

          if (result?.length > 0 && result[0]?.Results?.length > 0 && result[1]?.Results?.length > 0) {

            this.vehicleDetail.Model_ID.value = result[0].Results[0].Model_ID
            this.vehicleDetail.Model_Name.value = result[0].Results[0].Model_Name
            this.vehicleDetail.VehicleTypeId.value = result[1].Results[0].VehicleTypeId
            this.vehicleDetail.VehicleTypeName.value = result[1].Results[0].VehicleTypeName

            this.showVehicleModelData = true;
            this.showModelDataSpinner = false;
          }
        },
        error: (error) => {

          this.showVehicleModelData = false;

          if (error instanceof HttpErrorResponse) {
            this.errorMessage = "Opps ! Something went wrong"
          }

        }
      })
  }
}
