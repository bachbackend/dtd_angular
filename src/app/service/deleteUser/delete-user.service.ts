import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  // private apiUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  delete(id: number, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.delete(url, { headers: headers, responseType: 'text' }); 
  }
}
