import { Component } from '@angular/core';
import { ChangePassService } from '../service/changePassword/change-pass.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  authRequest = {
    userName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  constructor(private changePassService: ChangePassService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  // onClickChangePass() {
  //   const accessToken = this.cookieService.get('accessToken');

  //   if (accessToken) {
  //     // Gọi API hoặc thực hiện các hành động khác với accessToken
  //     this.changePassService.changePass(this.authRequest, accessToken).subscribe(
  //       (response) => {
  //         // Xử lý phản hồi thành công
  //         this.snackBar.open('Đổi mật khẩu thành công', 'Đóng', {
  //           duration: 3000,
  //           panelClass: ['success-snackbar'],
  //         });
  //         console.log('Đổi mật khẩu thành công:', response);
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         // Xử lý lỗi
  //         this.snackBar.open('Đổi mật khẩu thất bại', 'Đóng', {
  //           duration: 3000,
  //           panelClass: ['error-snackbar'],
  //         });
  //         console.error('Đổi mật khẩu thất bại:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Không tìm thấy accessToken trong cookie');
  //     // Xử lý khi không tìm thấy accessToken
  //   }
  // }

  // onClickChangePass() {
  //   const accessToken = this.cookieService.get('accessToken');

  //   if (accessToken) {
  //     this.changePassService.changePass(this.authRequest, accessToken).subscribe(
  //       (response) => {
  //         // Xử lý phản hồi thành công
  //         if (response === 'Password changed successfully') {
  //           this.snackBar.open('Đổi mật khẩu thành công', 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['success-snackbar'],
  //           });
  //           console.log('Đổi mật khẩu thành công:', response);
  //           this.router.navigate(['/login']);
  //         } else {
  //           this.snackBar.open('Đổi mật khẩu thất bại: ' + response, 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['error-snackbar'],
  //           });
  //           console.error('Đổi mật khẩu thất bại:', response);
  //         }
  //       },
  //       (error) => {
  //         // Xử lý lỗi
  //         this.snackBar.open('Đổi mật khẩu thất bại', 'Đóng', {
  //           duration: 3000,
  //           panelClass: ['error-snackbar'],
  //         });
  //         console.error('Đổi mật khẩu thất bại:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Không tìm thấy accessToken trong cookie');
  //     // Xử lý khi không tìm thấy accessToken
  //   }
  // }

  // onClickChangePass() {
  //   const accessToken = this.cookieService.get('accessToken');
  
  //   if (accessToken) {
  //     this.changePassService.changePass(this.authRequest, accessToken).subscribe(
  //       (response: any) => {
  //         // Xử lý phản hồi thành công
  //         if (response === 'Password changed successfully') {
  //           this.snackBar.open('Đổi mật khẩu thành công', 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['success-snackbar'],
  //           });
  //           console.log('Đổi mật khẩu thành công:', response);
  //           this.router.navigate(['/login']);
  //         } else {
  //           this.snackBar.open('Đổi mật khẩu thất bại: ' + response, 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['error-snackbar'],
  //           });
  //           console.error('Đổi mật khẩu thất bại:', response);
  //         }
  //       },
  //       (error: any) => {
  //         // Xử lý lỗi
  //         if (error.error && error.error.error) {
  //           const errorMessage = error.error.error;
            
  //           this.snackBar.open('Đổi mật khẩu thất bại: ' + errorMessage, 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['error-snackbar'],
  //           });
  //           console.error('Đổi mật khẩu thất bại:', errorMessage);
  //         } else {
  //           // Xử lý các trường hợp lỗi khác nếu cần thiết
  //           this.snackBar.open('Đổi mật khẩu thất bại', 'Đóng', {
  //             duration: 3000,
  //             panelClass: ['error-snackbar'],
  //           });
  //           console.error('Đổi mật khẩu thất bại:', error);
  //         }
  //       }
  //     );
  //   } else {
  //     console.error('Không tìm thấy accessToken trong cookie');
  //     // Xử lý khi không tìm thấy accessToken
  //   }
  // }

  onClickChangePass() {
    const accessToken = this.cookieService.get('accessToken');
  
    if (accessToken) {
      this.changePassService.changePass(this.authRequest, accessToken).subscribe(
        (response: any) => {
          // Xử lý phản hồi thành công
          if (response === 'Password changed successfully') {
            this.snackBar.open('Đổi mật khẩu thành công', 'Đóng', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            console.log('Đổi mật khẩu thành công:', response);
            this.router.navigate(['/login']);
          } else {
            // Thêm ký tự xuống dòng (\n) vào chuỗi thông báo lỗi
            const errorMessage = response.replace(/\\n/g, '\n');
  
            this.snackBar.open('Đổi mật khẩu thất bại:\n' + errorMessage.error, 'Đóng', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
            console.error('Đổi mật khẩu thất bại:', errorMessage.error);
          }
        },
        (error: any) => {
          // Xử lý lỗi
          if (error.error && error.error.error) {
            // Thêm ký tự xuống dòng (\n) vào chuỗi thông báo lỗi
            const errorMessage = error.error.error.replace(/\\n/g, '\n');
  
            this.snackBar.open('Đổi mật khẩu thất bại:\n' + errorMessage, 'Đóng', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
            console.error('Đổi mật khẩu thất bại:', errorMessage.error);
          } else {
            // Xử lý các trường hợp lỗi khác nếu cần thiết
            this.snackBar.open(error.error, 'Đóng', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
            console.error('Đổi mật khẩu thất bại:', error.error);
          }
        }
      );
    } else {
      console.error('Không tìm thấy accessToken trong cookie');
      // Xử lý khi không tìm thấy accessToken
    }
  }
  }


