import { Component } from '@angular/core';
import { RegisterService } from '../service/register/register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  authRequest = {
    userName: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onClickRegister() {
    this.registerService.register(this.authRequest).subscribe(
      (response) => {

        this.snackBar.open('Đăng ký thành công', 'Đóng', {
          duration: 3000, // Đóng thông báo sau 3 giây
          panelClass: ['success-snackbar'], // Tùy chỉnh class cho thông báo thành công
        });
        // Xử lý phản hồi đăng nhập thành công, ví dụ: chuyển hướng đến trang khác
        console.log('Đăng ký thành công:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackBar.open(error.error, 'Đóng', {
          duration: 3000, // Đóng thông báo sau 3 giây
          panelClass: ['error-snackbar'], // Tùy chỉnh class cho thông báo lỗi
        });
        // Xử lý lỗi đăng nhập, ví dụ: hiển thị thông báo lỗi
        console.error(error.error);
      }
    );
  }
}
