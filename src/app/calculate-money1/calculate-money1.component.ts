import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../service/calculate/calculate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-money1',
  templateUrl: './calculate-money1.component.html',
  styleUrls: ['./calculate-money1.component.css']
})
export class CalculateMoney1Component implements OnInit{
  persons: any[] = [];

  totalAmount!: number;
  // selectedUserIds: number[] = [];
  // transactionType: string = '';
  // description: string = '';

  cal = {
    totalAmount: this.totalAmount,
    selectedUserIds: [] as number[],
    transactionType: '',
    description: '',
  };
  isChecked: boolean = false;

  

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private calculateService: CalculateService,
    private fb: FormBuilder
    ) {
    }
  ngOnInit(): void {
    this.loadUsers();
    
  }
  loadUsers() {
    const accessToken = this.cookieService.get('accessToken');
    this.calculateService.getPerson(accessToken).subscribe((data) => {
      this.persons = data;
    });
  }

  selectAllUsers() {
    const areAllSelected = this.persons.every(per => per.isSelected);
    
    this.persons.forEach(per => per.isSelected = !areAllSelected);
    this.updateSelectedUserIds();
    console.log(this.cal)
  }

  updateSelectedUserIds() {
    this.cal.selectedUserIds = this.persons
      .filter(per => per.isSelected)
      .map(per => per.id);
  }
  

  onCheckboxChange(person: any) {
    if (person.isSelected) {
      this.cal.selectedUserIds.push(person.id);
    } else {
      const index = this.cal.selectedUserIds.indexOf(person.id);
      if (index !== -1) {
        this.cal.selectedUserIds.splice(index, 1);
      }
    }
  }
 

  onSubmit() {
    const accessToken = this.cookieService.get('accessToken');
  
    if (!accessToken) {
      console.error('Không tìm thấy accessToken trong cookie');
      return;
    }
  
    if (!this.cal.totalAmount || !this.cal.transactionType || !this.cal.description) {
      console.error('Vui lòng nhập đầy đủ thông tin giao dịch.');
      return;
    }
  
    this.calculateService.calculateMoney1(this.cal, accessToken).subscribe(
      (response) => {
        if(response === 'Transaction processed successfully.') {
          this.snackBar.open('Giao dịch thành công', 'Đóng', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          console.log('Giao dịch thành công:', response);
          this.router.navigate(['/get-all-person']);
        } else {
          this.snackBar.open('Giao dịch thất bại: ' + response, 'Đóng', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          console.error('Giao dịch thất bại:', response);
        }
      },
      (error) => {
        this.snackBar.open('Giao dịch thất bại', 'Đóng', {
          duration: 3000, 
          panelClass: ['error-snackbar'],
        });
        console.error('Giao dịch thất bại:', error);
      }
    );
  }
  
  
}
