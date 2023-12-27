import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addUser(person: any, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/persons/add`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    console.log('Data sent to server:', person);
    return this.http.post(url, person, { headers: headers, responseType: 'text' });
  }
}
