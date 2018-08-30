import {Component, OnInit} from '@angular/core';
import {FavoritesService} from '../../shared/services/favorites.service';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: any[];

  constructor(private apiService: ApiService,
              private favoritesService: FavoritesService) {
  }

  ngOnInit() {
    const favoriteIds = this.favoritesService.getFavorites();
    if (favoriteIds) {
      this.apiService.getPlayersData(favoriteIds.map((id) => {
          return id;
        }).join(',')
      ).subscribe((data) => {
        this.favorites = data.user;
        console.log(this.favorites);
      });
    }
  }

}
