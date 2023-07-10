import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VehicleService } from './common/services/vehicle.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [VehicleService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sidebar visible', () => {
    expect(component.sidebarCollapsed).toBe(false);
  });

  it('should toggle sidebar visibility', () => {
    const initialHideSideBar = component.sidebarCollapsed;
    component.collapseSidebar();
    expect(component.sidebarCollapsed).toBe(!initialHideSideBar);
  });

  it('should show vehicle model component if showVehicleModelData is true', () => {
    spyOnProperty(vehicleService, 'showVehicleModelData', 'get').and.returnValue(true);
    fixture.detectChanges();
    const vehicleModelComponent = fixture.nativeElement.querySelector('app-vehicle-model-component');
    expect(vehicleModelComponent).toBeTruthy();
  });

  it('should not show vehicle model component if showVehicleModelData is false', () => {
    spyOnProperty(vehicleService, 'showVehicleModelData', 'get').and.returnValue(false);
    fixture.detectChanges();
    const vehicleModelComponent = fixture.nativeElement.querySelector('app-vehicle-model-component');
    expect(vehicleModelComponent).toBeNull();
  });
});
