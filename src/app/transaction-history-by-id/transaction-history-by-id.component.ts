import { Component, OnInit } from '@angular/core';
import { TransactionByIdService } from '../service/transactionHistoryById/transaction-by-id.service';
import { CookieService } from 'ngx-cookie-service';
import { TransactionHistory } from '../transaction-history.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-history-by-id',
  templateUrl: './transaction-history-by-id.component.html',
  styleUrls: ['./transaction-history-by-id.component.css']
})
export class TransactionHistoryByIdComponent implements OnInit{
  transactionHistories: TransactionHistory[] = [];
  userId: number = 0;
  userName!: string;
  p: number = 1;


  constructor(private transactionByIdService: TransactionByIdService,
    private cookieService:CookieService,
    private route: ActivatedRoute
    ) {}
  

  // ngOnInit(): void {
  //   const accessToken = this.cookieService.get('accessToken');
  //     this.route.params.subscribe((params) => {
  //       const id = +params['id'];
  //       this.transactionByIdService.getTransactionHistoryById(id, accessToken).subscribe(
  //         (data) => {
  //           this.transactionHistories = data;
  //         },
  //         (error) => {
  //           console.error('Lỗi khi lấy thông tin giao dịch của người dùng:', error);
  //         }
  //       );
  //     });

  //     this.route.paramMap.subscribe(params => {
  //       const userIdString = params.get('id');
  //       const userId = userIdString ? parseInt(userIdString, 10) : 0;
  //       const user = this.transactionHistories.find(user => user.person.id === userId);
  //       this.userName = user ? user.person.name : "";
  //     });
    
  // }

  ngOnInit(): void {
    const accessToken = this.cookieService.get('accessToken');

    this.route.params.subscribe((params) => {
      const id = +params['id'];

      // Lấy dữ liệu giao dịch theo userId
      this.transactionByIdService.getTransactionHistoryById(id, accessToken).subscribe(
        (data) => {
          this.transactionHistories = data;
        },
        (error) => {
          console.error('Lỗi khi lấy thông tin giao dịch của người dùng:', error);
        }
      );

      // Lấy thông tin người dùng từ dữ liệu giao dịch
      const user = this.transactionHistories.find(transaction => transaction.person.id === id);

      // Lấy tên người dùng và gán cho biến userName
      this.userName = user ? user.person.name : "";
    });
  }


  getTransactionTypeClass(type: string): string {
    if (type === 'ADD') {
      return 'add-transaction';
    } else if (type === 'PAY') {
      return 'pay-transaction';
    } else {
      return ''; // Trường hợp khác, không áp dụng class
    }
  }


}
