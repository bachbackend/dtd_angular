import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getRoles(accessToken: string): Observable<any[]> {
    const url = `${this.baseUrl}/roles`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get<any[]>(url, { headers: headers });
  }
  assignRoleToUser(userId: number, roleId: number, accessToken: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/roles/${roleId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    // return this.http.post(url, { headers: headers });
    return this.http.post(url, null, { headers, responseType: 'text' });
  }
}
