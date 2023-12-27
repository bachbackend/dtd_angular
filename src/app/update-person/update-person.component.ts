import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserService } from '../service/updateUser/update-user.service';
import { Person } from '../person.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit{
  // updateUserForm: FormGroup = new FormGroup({});
  userForm: FormGroup = new FormGroup({});
  userId: number = 0;

  constructor(
    private updateUserService: UpdateUserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.loadCurrentPerson();
    });

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('0\\d{9}')]],
    });
    
  }

  loadCurrentPerson(): void {
    const accessToken = this.cookieService.get('accessToken');
    this.updateUserService.getPersonById(this.userId, accessToken).subscribe(
      (response: Person) => {
        this.userForm.patchValue(response);
      },
      (error) => {
        console.error('Lỗi khi tải thông tin người dùng:', error);
      }
    );
  }

  updatePerson(): void {
    const accessToken = this.cookieService.get('accessToken');
    if (this.userForm.valid) {
      const updatedPerson: Person = this.userForm.value;
      this.updateUserService.updatePartialPerson(this.userId, updatedPerson, accessToken).subscribe(
        (response: Person) => {
          this.snackBar.open('Cập nhật thông tin người dùng thành công', 'Đóng', {
            duration: 3000, // Đóng thông báo sau 3 giây
            panelClass: ['success-snackbar'], // Tùy chỉnh class cho thông báo thành công
          });
          console.log('Cập nhật thông tin người dùng thành công:', response);
          this.router.navigate(['/get-all-person']);
        },
        (error) => {
          this.snackBar.open('Lỗi khi cập nhật thông tin người dùng', 'Đóng', {
            duration: 3000, // Đóng thông báo sau 3 giây
            panelClass: ['success-snackbar'], // Tùy chỉnh class cho thông báo thành công
          });
          console.error('Lỗi khi cập nhật thông tin người dùng:', error);
          this.router.navigate(['/get-all-person']);
        }
      );
    }
  }

  

  // updatedPerson: Person = {
  //   id: 18,
  //   name: '',
  //   age: 0,
  //   email: '',
  //   phoneNumber: '',
  //   dob: '',
  // };
  

  // ngOnInit(): void{
  //   this.loadCurrentPerson();
  // }

  // loadCurrentPerson(): void {
  //   this.updateUserService.getPersonById(this.updatedPerson.id).subscribe(
  //     (response: Person) => {
  //       this.updatedPerson = response;
  //     },
  //     (error) => {
  //       console.error('Lỗi khi tải thông tin người dùng:', error);
  //     }
  //   );
  // }

  // updatePerson(): void {
  //   this.updateUserService.updatePartialPerson(this.updatedPerson.id, this.updatedPerson).subscribe(
  //     (response: Person) => {
  //       console.log('Cập nhật thông tin người dùng thành công:', response);
  //     },
  //     (error) => {
  //       console.error('Lỗi khi cập nhật thông tin người dùng:', error);
  //     }
  //   );
  // }
}
