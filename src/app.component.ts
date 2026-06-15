import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from "@/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.checkAuth();
  }
}
