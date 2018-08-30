import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSync, faSearch, faHome, faChartLine, faStar} from '@fortawesome/free-solid-svg-icons';
import {FavoritesService} from '../../../shared/services/favorites.service';

@Component({
  selector: 'app-player-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() player: any;
  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();
  isFavorited = false;
  refreshIcon = faSync;
  searchIcon = faSearch;
  homeIcon = faHome;
  chartIcon = faChartLine;
  starIcon = faStar;
  constructor(
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    this.isFavorited = !!this.favoritesService.findFavorite(this.player.user.id);
  }

  refreshPlayer() {
    this.refresh.emit(true);
  }

  favoriteUnfavorite() {
    if (this.isFavorited) {
      this.favoritesService.deleteFavorite(this.player.user.id);
    } else {
      this.favoritesService.addFavorite(this.player.user.id);
    }
    this.isFavorited = !!this.favoritesService.findFavorite(this.player.user.id);
  }

}
