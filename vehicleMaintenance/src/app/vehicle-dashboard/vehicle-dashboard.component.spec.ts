import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { VehicleDashboardComponent } from './vehicle-dashboard.component';
import { VehicleService } from '../common/services/vehicle.service';
import { GetVehicleMakersResponse, Results } from '../common/models/GetVehicleMakers.model';

describe('VehicleDashboardComponent', () => {
  let component: VehicleDashboardComponent;
  let fixture: ComponentFixture<VehicleDashboardComponent>;
  let vehicleService: VehicleService;
  let routerMock: any;
  let routeMock: any;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    routeMock = {
      snapshot: {
        paramMap: jasmine.createSpyObj('ParamMap', ['get'])
      }
    };

    TestBed.configureTestingModule({
      declarations: [VehicleDashboardComponent],
      providers: [
        VehicleService,
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDashboardComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch vehicle data on initialization', () => {
    const vehicleData: GetVehicleMakersResponse = {
      Count: 2,
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
      ]
    };

    spyOn(vehicleService, 'getAllVehicles').and.returnValue(of(vehicleData));

    fixture.detectChanges();

    expect(vehicleService.getAllVehicles).toHaveBeenCalled();
    expect(component.vehicleAllDetails).toEqual(vehicleData);
    expect(component.errorFlag).toBeFalsy();
  });

  it('should handle error when fetching vehicle data', () => {
    const errorMessage = 'Opps ! Something went wrong';
    const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

    spyOn(vehicleService, 'getAllVehicles').and.returnValue(throwError(errorResponse));

    fixture.detectChanges();

    expect(vehicleService.getAllVehicles).toHaveBeenCalled();
    expect(component.errorFlag).toBeTruthy();
    expect(component.errorMessage).toEqual(errorMessage);
  });

  it('should set vehicle detail and navigate on make ID click', () => {
    const vehicle: Results = {
      Make_ID: 1,
      Make_Name: 'Toyota'
    };
    const navigateSpy = spyOn(routerMock, 'navigate');

    component.onMakeIDClick(vehicle);

    expect(component.vehicleSrv.showVehicleModelData).toBeFalsy();
    expect(component.vehicleSrv.vehicleDetail.Make_ID.value).toEqual(vehicle.Make_ID);
    expect(component.vehicleSrv.vehicleDetail.Make_Name.value).toEqual(vehicle.Make_Name);
    expect(component.vehicleSrv.getvehicleDetails).toHaveBeenCalledWith(vehicle);
    expect(navigateSpy).toHaveBeenCalled();
  });
});
