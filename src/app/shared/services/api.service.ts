import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getPlayer(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseApi}/player/${id}`);
  }

  getPlayerSeasonRanks(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseApi}/player/${id}/seasons`);
  }

  getUserByName(name: string): Observable<any> {
    return this.http.get<any>(`${environment.baseApi}/player/${name}/details`);
  }

  getPlayersData(csv: string): Observable<any> {
    return this.http.get<any>(`${environment.baseApi}/players/${csv}`);
  }

