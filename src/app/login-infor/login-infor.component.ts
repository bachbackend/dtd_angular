import { Component, OnInit } from '@angular/core';
import { LoginInforService } from '../service/loginInformation/login-infor.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from '../account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../service/role/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-infor',
  templateUrl: './login-infor.component.html',
  styleUrls: ['./login-infor.component.css']
})
export class LoginInforComponent implements OnInit {
  loginInformation: any[] = [];
  accounts: Account[] = [];
  searchText: string = '';
  users: any[] = [];
  roles: any[] = [];
  p: number = 1;

  roleAssignmentForm!: FormGroup;

  constructor(private loginInforService: LoginInforService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
  ) { this.roleAssignmentForm = this.fb.group({
    userId: [null, Validators.required],
    roleId: [null, Validators.required],
  });}

  ngOnInit() {
    this.loginInfor();
    this.loadUsers();
    this.loadRoles();
  }
  loadRoles() {
    const accessToken = this.cookieService.get('accessToken');
    this.roleService.getRoles(accessToken).subscribe((data) => {
      this.roles = data;
    });
  }

  loadUsers() {
    const accessToken = this.cookieService.get('accessToken');
    this.loginInforService.loginInfor(accessToken).subscribe((data) => {
      this.users = data;
    });
  }

  loginInfor() {
    const accessToken = this.cookieService.get('accessToken');

    this.loginInforService.loginInfor(accessToken).subscribe(
      data => {
        this.loginInformation = data;
      },
      error => {
        console.error('Error fetching login history:', error);
      }
    );
  }

  deleteAccount(accountId: number) {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      if(confirm('Bạn có chắc chắn muốn xóa tài khoản này không?'))
      this.loginInforService.deleteAccount(accountId, accessToken).subscribe(result => {
        if (result) {
          console.log('Xóa người dùng thành công:', result);
          this.snackBar.open('Xóa người dùng thành công', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.loginInfor();
        }
      }, error => {
        console.log('Xóa người dùng thất bại', error);
        this.snackBar.open('Xóa người dùng thất bại', 'Đóng', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

      });
    }
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.loginInfor();
    } else {
      this.loginInformation = this.loginInformation.filter(acc =>
        acc.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  assignRole() {
    const accessToken = this.cookieService.get('accessToken');

    if (this.roleAssignmentForm.valid && accessToken) {
      const userId = this.roleAssignmentForm.get('userId')?.value;
      const roleId = this.roleAssignmentForm.get('roleId')?.value;

      this.roleService.assignRoleToUser(userId, roleId, accessToken).subscribe(
        (response) => {
          console.log('Role assigned successfully');
          this.snackBar.open('Phân quyền thành công', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.loginInfor();
          // this.router.navigate(['/login-infor']);
        },
        (error) => {
          console.error('Error assigning role:', error);
          this.snackBar.open('Phân quyền thất bại', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        }
      );
    } else {
      console.warn('Please select both user and role before assigning.');
    }
  }

  
  
}
