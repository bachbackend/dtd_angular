import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPerson(accessToken: string): Observable<any[]> {
    const url = `${this.baseUrl}/persons`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<any[]>(url, { headers: headers });
  }

  calculateMoney1(cal: any, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/calculate`;

    const body = new HttpParams()
      .set('totalAmount', cal.totalAmount)
      .set('selectedUserIds', cal.selectedUserIds.join(','))
      .set('transactionType', cal.transactionType)
      .set('description', cal.description);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    });
  
    console.log('Data sent to server:', body.toString());
    console.log('Selected User Ids:', cal.selectedUserIds);
  
    return this.http.post(url, body.toString(), { headers: headers, responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          console.error('Lỗi xử lý giao dịch:', error);
  
          if (error instanceof ErrorEvent) {
            // Lỗi xảy ra ở phía client
            console.error('Lỗi:', error.message);
          } else {
            // Lỗi xảy ra ở phía server
            console.error('Lỗi server:', error);
          }
  
          // Rethrow the error as an observable
          return throwError('Đã xảy ra lỗi khi xử lý giao dịch.');
        })
      );
  }

  calculateMoney2(cal: any, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/calculateIndividual`;

    const filteredUserIds: number[] = cal.selectedUserIds.filter((id: number | undefined) => id !== undefined && id !== null) as number[];
    const filteredAmounts: number[] = cal.individualAmounts.filter((amount: number | undefined) => amount !== undefined && amount !== null) as number[];
    
    const body = new HttpParams()
      .set('totalAmount', cal.totalAmount)
      // .set('selectedUserIds', cal.selectedUserIds.join(','))
      // .set('individualAmounts', cal.individualAmounts.join(','))
      .set('selectedUserIds', filteredUserIds.join(','))
      .set('individualAmounts', filteredAmounts.join(','))
      .set('transactionType', cal.transactionType)
      .set('description', cal.description);
      
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    });
  
    console.log('Data sent to server:', body.toString());
    console.log('Selected User Ids:', cal.selectedUserIds);
    console.log('Individual Amount:', cal.individualAmounts);
  
    return this.http.post(url, body.toString(), { headers: headers, responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          console.error('Lỗi xử lý giao dịch:', error);
  
          if (error instanceof ErrorEvent) {
            console.error('Lỗi:', error.message);
          } else {
            console.error('Lỗi server:', error);
          }
  
          return throwError('Đã xảy ra lỗi khi xử lý giao dịch.');
        })
      );
  }


}
 