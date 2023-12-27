import { Component, OnInit } from '@angular/core';
import { LoginHistoryService } from '../service/loginHis/login-history.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Account } from '../account.model';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.css'],
  providers: [DatePipe]
})
export class LoginHistoryComponent implements OnInit {
  loginHistories: any[] = [];
  accounts: Account[] = [];
  searchText: string = '';
  p: number = 1;

  constructor(private loginHistoryService: LoginHistoryService,
              private cookieService:CookieService, 
              private router: Router
              ) {}

  ngOnInit() {
    this.loginHistory();
  }

  loginHistory(){
    const accessToken = this.cookieService.get('accessToken');

    this.loginHistoryService.loginHistory(accessToken).subscribe(
      data => {
        this.loginHistories = data;
      },
      error => {
        console.error('Error fetching login history:', error);
      }
    );
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.loginHistory();
    } else {
      this.loginHistories = this.loginHistories.filter(user =>
        user.account.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  
  
}
