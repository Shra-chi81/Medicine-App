import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medicine-app';
  isLoginPage: boolean = false;
  currentRoute: string = '';

  constructor(
    private authService: AuthService,
    private router :Router
  ) {
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      this.isLoginPage = this.currentRoute === '/login';
    });
  }

  ngOnInit(): void {
    this.isLoginPage = this.authService.isLoginPage();
  }
}
