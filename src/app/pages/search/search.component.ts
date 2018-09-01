import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    ApiService
  ]
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('user') private elementRef: ElementRef;
  notFound = false;

  constructor(private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
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
