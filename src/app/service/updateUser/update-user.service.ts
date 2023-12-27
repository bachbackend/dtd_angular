import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/person.model';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,  private cookieService: CookieService) {}

  getPersonById(id: number, accessToken: string): Observable<Person> {
    const url = `${this.baseUrl}/persons/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<Person>(url, { headers: headers });
  }

  updatePartialPerson(id: number, updatedPerson: Person, accessToken: string): Observable<Person> {
    const url = `${this.baseUrl}/persons/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.patch<Person>(url, updatedPerson, { headers: headers });
  }
}
