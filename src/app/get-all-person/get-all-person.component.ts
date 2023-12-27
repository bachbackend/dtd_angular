import { Component, OnInit } from '@angular/core';
import { GetAllPersonService } from '../service/getAllPerson/get-all-person.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { DeleteUserService } from '../service/deleteUser/delete-user.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-get-all-person',
  templateUrl: './get-all-person.component.html',
  styleUrls: ['./get-all-person.component.css']
})
export class GetAllPersonComponent implements OnInit {
  persons: Person[] = [];
  users: Person[] = [];
  sortOrder: string = 'ascId';
  searchText: string = '';
  totalMoney: number = 0;
  p: number = 1;

  constructor(private getAllPersonService: GetAllPersonService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private deleteUserService: DeleteUserService
  ) { }

  isPositive(totalMoney: number): boolean {
    return totalMoney >= 0;
  }

  ngOnInit() {
    this.loadData();
  }


  loadData(): void {
    const accessToken = this.cookieService.get('accessToken');
    this.getAllPersonService.getAllPerson(accessToken, this.sortOrder).subscribe(
      data => {
        this.users = data;
        this.calculateTotalMoney();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('accessToken hết hạn hoặc không hợp lệ');
          this.router.navigate(['/login']);
        } else {
          console.error(error);
        }
      }
    );
  }

  // Hàm sắp xếp dữ liệu
  sortData(sortOrder: string): void {
    this.sortOrder = sortOrder;
    this.loadData();
  }

  deleteUser(userId: number) {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      if(confirm('Bạn có chắc chắn muốn xóa người dùng này không?'))
      this.deleteUserService.delete(userId, accessToken).subscribe(result => {
        if (result) {
          console.log('Xóa người dùng thành công:', result);
          this.snackBar.open('Xóa người dùng thành công', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.loadData();
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
      this.loadData();
    } else {
      this.users = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  getUsersWithNegativeBalance(): void {
    const accessToken = this.cookieService.get('accessToken');
    this.getAllPersonService.getPersonWithNegativeBalance(accessToken).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  calculateTotalMoney() {
    this.totalMoney = this.users.reduce((total, user) => total + user.totalMoney, 0);
  }
}
