import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { GetVehicleMakersResponse } from '../models/GetVehicleMakers.model';
import { GetByMakeIDResponse } from '../models/GetModelByMakeID';
import { GetVehicleTypeResponse } from 'src/app/common/models/GetVehicleType';

describe('VehicleService', () => {
  let vehicleService: VehicleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });
    vehicleService = TestBed.inject(VehicleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(vehicleService).toBeTruthy();
  });

  it('should get all vehicles', () => {
    const mockResponse: GetVehicleMakersResponse = { Count: 2,
      Message: "Mock data",
      SearchCriteria: null,
      Results: [
        {
          Make_ID: 1,
          Make_Name: "Toyota"
        },
        {
          Make_ID: 2,
          Make_Name: "Honda"
        }
      ] };

    vehicleService.getAllVehicles().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should store and retrieve all vehicle details', () => {
    const mockVehicleDetails: GetVehicleMakersResponse = {Count: 2,
      Message: "Mock data",
      SearchCriteria: null,
      Results: [
        {
          Make_ID: 1,
          Make_Name: "Toyota"
        },
        {
          Make_ID: 2,
          Make_Name: "Honda"
        }
      ] };

    vehicleService.storeAllVehicleDetails(mockVehicleDetails);

    const retrievedDetails = vehicleService.getAllVehicleDetails();
    expect(retrievedDetails).toEqual(mockVehicleDetails);
  });

  it('should get vehicle details', () => {
    const mockVehicle = {   Count: 2,
      Message: "Mock data",
      SearchCriteria: "",
      Results: [
        {
          Make_ID: 1,
          Make_Name: "Toyota"
        },
        {
          Make_ID: 2,
          Make_Name: "Honda"
        }
      ] };
    const mockByMakeIDResponse: GetByMakeIDResponse = {   Count: 2,
      Message: "Mock data",
      SearchCriteria: "Mock search criteria",
      Results: [
        {
          Make_ID: 1,
          Make_Name: "Toyota",
          Model_ID: 101,
          Model_Name: "Camry"
        },
        {
          Make_ID: 1,
          Make_Name: "Toyota",
          Model_ID: 102,
          Model_Name: "Corolla"
        }
      ]
     };
    const mockVehicleTypeResponse: GetVehicleTypeResponse = { Count: 2,
      Message: "Mock data",
      SearchCriteria: "Mock search criteria",
      Results: [
        {
          VehicleTypeId: 1,
          VehicleTypeName: "Sedan"
        },
        {
          VehicleTypeId: 2,
          VehicleTypeName: "SUV"
        }
      ]};

    vehicleService.getvehicleDetails(mockVehicle);

    const req1 = httpTestingController.expectOne("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/1?format=json");
    expect(req1.request.method).toBe('GET');
    req1.flush(mockByMakeIDResponse);

    const req2 = httpTestingController.expectOne("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/1?format=json");
    expect(req2.request.method).toBe('GET');
    req2.flush(mockVehicleTypeResponse);

    expect(vehicleService.vehicleDetail.Model_ID.value).toBe(mockByMakeIDResponse.Results[0].Model_ID);
    expect(vehicleService.vehicleDetail.Model_Name.value).toBe(mockByMakeIDResponse.Results[0].Model_Name);
    expect(vehicleService.vehicleDetail.VehicleTypeId.value).toBe(mockVehicleTypeResponse.Results[0].VehicleTypeId);
    expect(vehicleService.vehicleDetail.VehicleTypeName.value).toBe(mockVehicleTypeResponse.Results[0].VehicleTypeName);
    expect(vehicleService.showVehicleModelData).toBe(true);
  });
});
