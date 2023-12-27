import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../service/calculate/calculate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface Person {
  id: number;
  name: string;
  isSelected: boolean;
  amount: number;
}

@Component({
  selector: 'app-calculate-money2',
  templateUrl: './calculate-money2.component.html',
  styleUrls: ['./calculate-money2.component.css']
})
export class CalculateMoney2Component implements OnInit {
  // persons: any[] = [];
  persons: Person[] = [];

  totalAmount!: number;

  cal = {
    totalAmount: this.totalAmount,
    selectedUserIds: [] as number[],
    individualAmounts: [] as number[],
    transactionType: '',
    description: '',
  };
  isChecked: boolean = false;

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService,
    private calculateService: CalculateService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  // loadUsers() {
  //   const accessToken = this.cookieService.get('accessToken');
  //   this.calculateService.getPerson(accessToken).subscribe((data) => {
  //     this.persons = data;
  //   });
  // }

  loadUsers() {
    const accessToken = this.cookieService.get('accessToken');
    this.calculateService.getPerson(accessToken).subscribe((data) => {
      this.persons = data.map((person: any) => ({
        id: person.id,
        name: person.name,
        isSelected: false,
        amount: 0,
      }));
    });
  }

  onSubmit() {
    const accessToken = this.cookieService.get('accessToken');

    if (!accessToken) {
      console.error('Không tìm thấy accessToken trong cookie');
      return;
    }

    if (!this.cal.totalAmount || !this.cal.individualAmounts || !this.cal.transactionType || !this.cal.description) {
      console.error('Vui lòng nhập đầy đủ thông tin giao dịch.');
      return;
    }

    this.calculateService.calculateMoney2(this.cal, accessToken).subscribe(
      (response) => {
        if (response === 'Transaction processed successfully.') {
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
        console.error('Giao dịch thất bại', error.error);
      }
    );
  }


  onCheckboxChange(event: any, person: any) {
    const personId = person.id;
    if (event.target.checked) {
      person.isSelected = true;
      if (!this.cal.selectedUserIds.includes(personId)) {
        this.cal.selectedUserIds.push(personId);
      }
    } else {
      person.isSelected = false;
      const index = this.cal.selectedUserIds.indexOf(personId);
    if (index !== -1) {
      this.cal.selectedUserIds.splice(index, 1);
      this.cal.individualAmounts.splice(index, 1);
    }
    }
    event.stopPropagation();
  }

  onIndividualAmountChange(personId: number, event: any) {
    const newValue = event.target.value;
    const parsedValue = parseFloat(newValue);
  
    if (!isNaN(parsedValue)) {
      if (parsedValue !== null && parsedValue !== undefined) {
        this.cal.individualAmounts[personId] = parsedValue;
      } else {
        console.error('Invalid number entered');
      }
    } else {
      console.error('Invalid number entered');
    }
  }

  // onAmountChange(amount: number, person: any) {
  //   person.isSelected = amount > 0;

  //   if (person.isSelected) {
  //     this.cal.selectedUserIds.push(person.id);
  //     this.cal.individualAmounts.push(amount);
  //   } else {
  //     const indexId = this.cal.selectedUserIds.indexOf(person.id);
  //     if (indexId !== -1) {
  //       this.cal.selectedUserIds.splice(indexId, 1);
  //       this.cal.individualAmounts.splice(indexId, 1);
  //     }
  //   }
  // }
  onAmountChange(amount: number, person: any) {
    person.isSelected = amount > 0;
    
    const indexId = this.cal.selectedUserIds.indexOf(person.id);
    if (person.isSelected) {
      if (indexId === -1) {
        this.cal.selectedUserIds.push(person.id);
        this.cal.individualAmounts.push(amount);
      } else {
        this.cal.individualAmounts[indexId] = amount;
      }
    } else {
      if (indexId !== -1) {
        this.cal.selectedUserIds.splice(indexId, 1);
        this.cal.individualAmounts.splice(indexId, 1);
      }
    }
  }

  

}


