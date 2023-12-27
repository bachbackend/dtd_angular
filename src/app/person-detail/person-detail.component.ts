import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { PersonDetailsService } from '../service/personDetails/person-details.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit{
  person!: Person;

  constructor(private route: ActivatedRoute, private personDetailsService: PersonDetailsService,
    private cookieService:CookieService
    ) {}


    ngOnInit(): void {
      const accessToken = this.cookieService.get('accessToken');
      this.route.params.subscribe((params) => {
        const id = +params['id'];
        this.personDetailsService.getPersonById(id, accessToken).subscribe(
          (data) => {
            this.person = data;
          },
          (error) => {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
          }
        );
      });
    }
    
    
    
}
