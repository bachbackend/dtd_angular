import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TransactionHistory } from 'src/app/transaction-history.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionByIdService {

  // private baseUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

    getTransactionHistoryById(id: number, accessToken: string): Observable<TransactionHistory[]> {
      const url = `${this.baseUrl}/persons/transactionHistory/${id}`;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      });
      return this.http.get<TransactionHistory[]>(url, { headers: headers });
    }
}
