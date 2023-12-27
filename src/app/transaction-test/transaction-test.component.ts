
import { TransactionTestService } from '../service/transactionTest/transaction-test.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-test',
  templateUrl: './transaction-test.component.html',
  styleUrls: ['./transaction-test.component.css']
})
export class TransactionTestComponent implements OnInit{
  transactionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private transactionTestService: TransactionTestService,
    private cookieService:CookieService) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      totalAmount: [null, Validators.required],
      selectedUserIds: [null, Validators.required],
      individualAmounts: [null, Validators.required],
      transactionType: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  processTransaction(): void {
    const accessToken = this.cookieService.get('accessToken');
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;

      const data = {
        totalAmount: formValue.totalAmount,
        selectedUserIds: formValue.selectedUserIds.split(',').map((id: string) => Number(id.trim())),
        individualAmounts: formValue.individualAmounts.split(',').map((amount: string) => Number(amount.trim())),
        transactionType: formValue.transactionType,
        description: formValue.description,
      };

      this.transactionTestService.calculateIndividual(data, accessToken).subscribe(
        (response) => {
          console.log('Giao dịch được xử lý thành công:', response);
        },
        (error) => {
          console.error('Có lỗi xảy ra trong quá trình xử lý giao dịch:', error);
        }
      );
    }
  }

}
