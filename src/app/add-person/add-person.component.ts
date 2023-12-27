import { Component, OnInit } from '@angular/core';
import { AddUserService } from '../service/addUser/add-user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent{
  person = {
    name: '',
    dob: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private addUserService: AddUserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }
  

  onClickAdd() {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      this.addUserService.addUser(this.person, accessToken).subscribe(
        (response) => {
          if(response === 'User added successfully.') {

          this.snackBar.open('Thêm mới người dùng thành công', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          console.log('Thêm mới người dùng thành công:', response);
          this.router.navigate(['/get-all-person']);
        } else {
          this.snackBar.open('Thêm mới người dùng thất bại: ' + response, 'Đóng', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          console.error('Đổi mật khẩu thất bại:', response);
        }
        },
        (error) => {
          this.snackBar.open(error.error, 'Đóng', {
            duration: 3000, 
            panelClass: ['error-snackbar'],
          });
          console.error(error.error);
          
        }
      );
    } else {
      console.error('Không tìm thấy accessToken trong cookie');
    }
  }
  

}
