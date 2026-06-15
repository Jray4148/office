import {inject, Injectable} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {environment} from "../../environments/environment";
import {AppConstants} from "@/shared/app-constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = toSignal(
    this.oidcSecurityService.isAuthenticated$.pipe(map(res => res.isAuthenticated)),
    { initialValue: false }
  );

  get token() {
    return localStorage.getItem(AppConstants.API_TOKEN) ?? "";
  }

  constructor() { }

  checkAuth() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((response) => {
        localStorage.setItem(AppConstants.API_TOKEN, response.accessToken);
      });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout() {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    window.location.href = environment.logoutLocation;
    localStorage.removeItem(AppConstants.API_TOKEN);
  }
}
