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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  search(value: string) {
    this.router.navigate(['/search', value]);
  }
}
