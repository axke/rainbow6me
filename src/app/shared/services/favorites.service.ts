import { Injectable } from '@angular/core';

@Injectable()
export class FavoritesService {

  constructor() { }

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  findFavorite(id: string) {
    const favorites = this.getFavorites();
    return favorites.find((f) => f === id);
  }

  addFavorite(id: string): string[] {
    const favorites: string[] = this.getFavorites();
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return this.getFavorites();
  }

  deleteFavorite(id: string): string[] {
    const favorites: string[] = this.getFavorites();
    favorites.splice(favorites.indexOf(id), 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return this.getFavorites();
  }

}
