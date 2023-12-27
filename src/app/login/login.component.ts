import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest = {
    userName: '',
    password: '',
  };

  constructor(private authService: AuthService, 
              private router: Router, 
              private snackBar: MatSnackBar, 
              private cookieService: CookieService
            ) {}

  onClickLogin() {
    this.authService.login(this.authRequest).subscribe(
      (response) => {

        this.cookieService.set('accessToken', response.accessToken);
        
        this.snackBar.open('Đăng nhập thành công', 'Đóng', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        console.log('Đăng nhập thành công:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.snackBar.open('Tài khoản hoặc mật khẩu không đúng', 'Đóng', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        console.error('Đăng nhập thất bại:', error);
      }
    );
  }

}
