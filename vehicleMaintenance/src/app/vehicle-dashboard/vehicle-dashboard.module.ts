import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDashboardComponent } from './vehicle-dashboard.component';
import { AboutComponent } from '../about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from './spinner/spinner.component';

const routes: Routes = [
  { path: '', component: VehicleDashboardComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    VehicleDashboardComponent,
    AboutComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ]
})
export class VehicleDashboardModule { }
