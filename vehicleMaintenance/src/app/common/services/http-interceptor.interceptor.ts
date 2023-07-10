import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { VehicleService } from './vehicle.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private vehicleSrv:VehicleService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if(event.status == 401) {
             this.vehicleSrv.errorMessage="Unauthorize access!!!";
            }
          }
          return event;
        },
        error: (error) => {
          if(error.status == 401) {
            this.vehicleSrv.errorMessage="Unauthorize access!!!";
          }
          if(error.status == 404) {
            this.vehicleSrv.errorMessage="Page Not Found!!!";
          }
        }
      }
      )
    );
  }
}
