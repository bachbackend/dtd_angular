import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  // private baseUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  changePass(authRequest: any, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/changePassword`;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
  
    return this.http.post(url, authRequest, { headers: headers, responseType: 'text' });
  }
  // changePass(authRequest: any): Observable<any> {
  //   const url = `${this.baseUrl}/persons/changePassword`;
  //   const accessToken = this.cookieService.get('accessToken');
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   };

  //   return this.http.post(url, authRequest, { headers: headers });
  // }
}
