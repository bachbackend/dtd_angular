import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role/role.service';
import { LoginInforService } from '../service/loginInformation/login-infor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];

  roleAssignmentForm!: FormGroup;

  // constructor(private roleService: RoleService,
  //   private fb: FormBuilder, 
  //   private loginInforService: LoginInforService,
  //   private cookieService:CookieService) {}

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private cookieService: CookieService,
    private loginInforService: LoginInforService,) {
    this.roleAssignmentForm = this.fb.group({
      userId: [null, Validators.required],
      roleId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
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
  // assignRole() {
  //   const userId = 17; 
  //   const roleId = 2; 

  //   this.roleService.assignRoleToUser(userId, roleId).subscribe(
  //     (response) => {
  //       console.log('Role assigned successfully');
  //     },
  //     (error) => {
  //       console.error('Error assigning role:', error);
  //     }
  //   );
  // }
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
          this.router.navigate(['/login-infor']);
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
      // Handle the case where user or role is not selected
    }
  }

}
