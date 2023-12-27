import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/person.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAllPersonService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllPerson(accessToken: string, sortOrder: string): Observable<any> {
    const url = `${this.baseUrl}/persons?sortOrder=${sortOrder}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(url, { headers: headers }); 
  }

  getPersonWithNegativeBalance(accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/negativebalance`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(url, { headers: headers }); 
  }


}
