import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl;
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/persons/logout`, {responseType: 'text'});
  }

  // logout(): Observable<any> {
  //   return this.http.post(this.baseUrl, {}).pipe(
  //     tap(() => localStorage.removeItem('accessToken'))
  //   );
  // }
}
