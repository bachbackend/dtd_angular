import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private baseUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(authRequest: any): Observable<any> {
    const url = `${this.baseUrl}/persons/login`;
    return this.http.post(url, authRequest);
  }
}
