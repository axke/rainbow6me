import {Component, OnInit} from '@angular/core';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  notFound = false;
  goIcon = faChevronRight;
  showSearch: boolean;

  constructor(private router: Router,
              private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((val: NavigationEnd) => {
      // see also
      if (val && val.url && (val.url.indexOf('/player') > -1 || val.url.indexOf('/live') > -1)) {
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    });
  }

  search(value: string) {
    this.apiService.getUserByName(value).subscribe(
      (users) => {
        if (users[0]) {
          this.router.navigate(['/player', users[0].id, 'summary']);
        } else {
          this.notFound = true;
        }
      },
      error => console.error('ERROR:', error)
    );
  }
}
