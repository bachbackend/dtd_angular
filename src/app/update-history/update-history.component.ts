import { Component, OnInit } from '@angular/core';
import { UpdateHisService } from '../service/updateHis/update-his.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-history',
  templateUrl: './update-history.component.html',
  styleUrls: ['./update-history.component.css']
})
export class UpdateHistoryComponent implements OnInit{
  updateHistories: any[] = [];
  searchText1!: number;
  p: number = 1;

  constructor(private updateHisService: UpdateHisService,
    private cookieService:CookieService,
    private router: Router
    ) {}

    ngOnInit() {
      this.updateHistory();
    }

    updateHistory(){
      const accessToken = this.cookieService.get('accessToken');
  
      this.updateHisService.updateHistory(accessToken).subscribe(
        data => {
          this.updateHistories = data;
        },
        error => {
          console.error('Error fetching login history:', error);
        }
      );
    }
    searchById(): void {
      if (this.searchText1 === undefined || this.searchText1 === null) {
        this.updateHistory();
      } else {
        const searchTextString = this.searchText1.toString().toLowerCase();
    
        this.updateHistories = this.updateHistories.filter(user =>
          user.person.id.toString().toLowerCase().includes(searchTextString)
        );
      }
    }

    
    
}
