import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionTestService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  calculateIndividual(data: any, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/calculateIndividual`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    });

    const formData = new URLSearchParams();
    for (const key of Object.keys(data)) {
      formData.set(key, data[key]);
    }
    console.log('Data sent to server:', formData.toString());
    return this.http.post(url, data, { headers: headers });
  }
}
