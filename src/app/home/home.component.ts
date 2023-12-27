import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogoutService } from '../service/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient, private logoutService: LogoutService, private router: Router) {}
  ngOnInit(): void {
  }

  logout() {
    this.logoutService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }

  
}
