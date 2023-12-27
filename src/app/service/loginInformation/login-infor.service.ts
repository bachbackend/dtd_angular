import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginInforService {

  // private baseUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  loginInfor(accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/loginInfor`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(url, { headers: headers });  
  }


  deleteAccount(id: number, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/account/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.delete(url, { headers: headers, responseType: 'text' }); 
  }
}
