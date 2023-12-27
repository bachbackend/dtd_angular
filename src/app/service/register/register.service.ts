import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // private baseUrl = 'http://localhost:8080/persons';
  // private environment: environment;
   
    private baseUrl = environment.apiUrl
  

  constructor(private http: HttpClient) {}
  
  register(authRequest: any): Observable<any> {
    const url = `${this.baseUrl}/persons/register`;
    return this.http.post(url, authRequest);
  }
}
