import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  player: any;
  seasons: any;
  id: string;
  tab: string;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private api: ApiService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tab = params['tab'];
      if (this.id && this.tab) {
        this.load();
      }
    });
  }

  load(refresh: boolean = false) {
    if ((this.player && (this.player.user.id.toLowerCase() !== this.id)) || !this.player || refresh) {
      console.log('run load');
      this.api.getPlayer(this.id).subscribe((player) => {
        this.player = player;
        this.loadLive();
      }, err => console.error('ERROR:', err));

      this.api.getPlayerSeasonRanks(this.id).subscribe((seasons) => {
        this.seasons = seasons;
      }, err => console.error('ERROR:', err));
    }
  }

  loadLive() {
    if (this.tab === 'live') {

    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
