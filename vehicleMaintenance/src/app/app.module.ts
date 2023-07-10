import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VehicleService } from './common/services/vehicle.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpInterceptorInterceptor } from './common/services/http-interceptor.interceptor';
import { VehicleDetailsComponent } from './vehicle-dashboard/vehicle-details/vehicle-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    SidebarComponent,
    VehicleDetailsComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    VehicleService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
