import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Person } from 'src/app/person.model';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  // private baseUrl = 'http://localhost:8080/persons';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // personDetail(id: number, accessToken: string): Observable<Person> {
  //   const url = `${this.baseUrl}/persons/${id}`;

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`,
  //   });

  //   return this.http.get<Person>(url, { headers: headers });  
  // }
  getPersonById(id: number, accessToken: string): Observable<Person> {
    const url = `${this.baseUrl}/persons/${id}`;
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<Person>(url, { headers: headers });
  }
}
