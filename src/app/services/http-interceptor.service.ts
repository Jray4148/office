import {inject, Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable, tap} from "rxjs";
import {AuthService} from "@/services/auth.service";
import {AppConstants} from "@/shared/app-constants";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth header for Cognito/OIDC requests
    console.log('Adding auth header for requests', req.url);
    if (req.url.includes('cognito') || req.url.includes('amazoncognito.com')) {
      console.log('Skipping auth header for Cognito/OIDC requests');
      return next.handle(req);
    }

    // Send auth header to our backend
    // const token = localStorage.getItem(AppConstants.API_TOKEN) ?? "";
    const newReq = req.clone({
      headers: req.headers
        .set("Authorization", "Bearer " + this.authService.token)
    });

    return next.handle(newReq).pipe(
      tap({
        error: (error) => {
          if (error.status === 401) {
            console.error("401 Error detected. Token used:", this.authService.token);
            // Only logout if we actually tried to send a token and it failed
            if (this.authService.token) {
              // Optional: Only logout if you want to force a re-auth
              // this.authService.logout();
            }
          }
        }
      })
    );

    // return next.handle(newReq).pipe(
    //   tap({
    //     error: (error) => {
    //       if (error.status === 401) {
    //         this.authService.logout();
    //       }
    //     }
    //   })
    // );
  }
}
