import { Component, OnInit } from '@angular/core';
import { TransactionHisService } from '../service/transactionHis/transaction-his.service';
import { CookieService } from 'ngx-cookie-service';
import { TransactionHistory } from '../transaction-history.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactionHistories: any[] = [];
  tranHis: TransactionHistory[] = [];
  searchText1!: number;
  searchText2: string = '';

  // Phân trang
  // page: number = 1;
  // pageSize: number = 10; // Số lượng mục trên mỗi trang
  // totalItems: number = 0;
  p: number = 1;

  constructor(private transactionHisService: TransactionHisService,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.transactionHistory();
  }

  transactionHistory() {
    const accessToken = this.cookieService.get('accessToken');

    this.transactionHisService.transactionHistory(accessToken).subscribe(
      data => {
        this.transactionHistories = data;
      },
      error => {
        console.error('Error fetching login history:', error);
      }
    );
  }

  searchById(): void {
    if (this.searchText1 === undefined || this.searchText1 === null) {
      this.transactionHistory();
    } else {
      const searchTextString = this.searchText1.toString().toLowerCase();

      this.transactionHistories = this.transactionHistories.filter(user =>
        user.person.id.toString().toLowerCase().includes(searchTextString)
      );
    }
  }

  searchByDes(): void {
    if (this.searchText2.trim() === '') {
      this.transactionHistory();
    } else {
      this.transactionHistories = this.transactionHistories.filter(user =>
        user.description.toLowerCase().includes(this.searchText2.toLowerCase())
      );
    }
  }

  getTransactionTypeClasses(transactionType: string): { [key: string]: boolean } {
    return {
      'add-type': transactionType === 'ADD',
      'pay-type': transactionType === 'PAY',
    };
  }

  

}
