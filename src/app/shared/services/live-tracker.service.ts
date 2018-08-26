import {Injectable} from '@angular/core';

@Injectable()
export class LiveTrackerService {

  constructor() {
  }

  createTracker(id: string, player: any) {
    const sessions: any[] = JSON.parse(localStorage.getItem('trackerSessions') || '[]');
    const json: any = {};
    json[id] = [{'user': player.user, 'history': [player], 'games': [], 'totals': {}}];
    sessions.push(json);
    localStorage.setItem('trackerSessions', JSON.stringify(sessions));
    return json;
  }

  addExistingTracker(tracker: any) {
    const sessions: any[] = JSON.parse(localStorage.getItem('trackerSessions') || '[]');
    sessions.push(tracker);
    localStorage.setItem('trackerSessions', JSON.stringify(sessions || '[]'));
  }

  deleteTracker(tracker: any) {
    const sessions: any[] = JSON.parse(localStorage.getItem('trackerSessions') || '[]');
    const index = sessions.indexOf(tracker);
    sessions.splice(index, 1);
    localStorage.setItem('trackerSessions', JSON.stringify(sessions || '[]'));
  }

  addPlayerToTracker(id: string, tracker: any[], player: any): any {
    const old = Object.assign({}, tracker);
    const track = {'user': player.user, 'history': [player], 'games': [], 'totals': {}};
    tracker.push(track);
    const newTracker = {};
    newTracker[id] = tracker;
    const post = this.replaceTrackerInSession(old, newTracker, id);
    return post;
  }

  trackerExists(id: string): boolean {
    const sessions: any[] = JSON.parse(localStorage.getItem('trackerSessions') || '[]');
    let isFound = false;
    sessions.forEach((s) => {
      Object.getOwnPropertyNames(s).forEach((session) => {
        if (!isFound && session === id) {
          isFound = true;
        }
      });
    });
    return isFound;
  }

  findTracker(id: string): any[] {
    const sessions: any[] = JSON.parse(localStorage.getItem('trackerSessions') || '[]');
    let tracker;
    sessions.forEach((s) => {
      Object.getOwnPropertyNames(s).forEach((session) => {
        if (session === id) {
          tracker = s[session];
        }
      });
    });
    return tracker || [];
  }

  updateTracker(tracker: any, data: any, id: string): any {
    const newData = [];
    data.user.forEach((user) => {
      const userRecord = tracker.find((t) => {
        return t.user.id === user.id;
      });
      const player = {};
      player['user'] = user;
      player['stats'] = data.stats.find((stats) => {
        if (stats.id === user.id) {
          return stats;
        }
      });
      player['rank'] = data.rank.find((rank) => {
        if (rank.id === user.id) {
          return rank;
        }
      });
      player['level'] = data.level.find((level) => {
        if (level.id === user.id) {
          return level;
        }
      });
      // only push if they're different
      const lastUpdate = userRecord.history[userRecord.history.length - 1];
      if (JSON.stringify(lastUpdate) !== JSON.stringify(player)) {
        userRecord.history.push(player);
        const game = this.createGame(userRecord.history);
        userRecord.games.push(game);
      }
      newData.push(userRecord);
    });
    const newTracker = {};
    newTracker[id] = newData;
    return this.replaceTrackerInSession(tracker, newTracker, id);
  }

  getStatTotals(userGames: any[]) {
    const generalStats: any[] = [];
    const naRank: any[] = [];
    if (userGames && userGames.length > 1) {
      userGames.forEach((game) => {
        generalStats.push(game.stats.general);
        naRank.push(game.rank.ncsa);
      });
      // sum general
      const summedGeneral = {};
      generalStats.forEach(obj => Object.keys(obj).forEach(k => summedGeneral[k] = (summedGeneral[k] || 0) + obj[k]));
      const summedNARank = {};
      naRank.forEach(obj => Object.keys(obj).forEach(k => summedNARank[k] = (summedNARank[k] || 0) + obj[k]));
      summedNARank['region'] = 'ncsa';
      if (summedGeneral && summedNARank) {
        const summed = {
          stats: {
            general: summedGeneral
          },
          rank: {
            ncsa: {
              summedNARank
            }
          }
        };
        return summed;
      }
      return {};
    }
  }

  private replaceTrackerInSession(oldTracker: any, newTracker: any, id: string): any {
    this.deleteTracker(oldTracker);
    this.addExistingTracker(newTracker);
    return this.findTracker(id);
  }

  private createGame(userHistory: any): any {
    const recent = userHistory[userHistory.length - 1];
    const previous = userHistory[userHistory.length - 2];
    const game: any = {};
    // traverse stats
    game['stats'] = {
      general: {
        bulletsHit: recent.stats.general.bulletsHit - previous.stats.general.bulletsHit,
        headshot: recent.stats.general.headshot - previous.stats.general.headshot,
        deaths: recent.stats.general.deaths - previous.stats.general.deaths,
        assists: recent.stats.general.assists - previous.stats.general.assists,
        kills: recent.stats.general.kills - previous.stats.general.kills,
        lost: recent.stats.general.lost - previous.stats.general.lost,
        played: recent.stats.general.played - previous.stats.general.played,
        won: recent.stats.general.won - previous.stats.general.won,
        penetrationKills: recent.stats.general.penetrationKills - previous.stats.general.penetrationKills,
        timePlayed: recent.stats.general.timePlayed - previous.stats.general.timePlayed,
        dbno: recent.stats.general.dbno - previous.stats.general.dbno,
        dbnoAssists: recent.stats.general.dbnoAssists - previous.stats.general.dbnoAssists,
        gadgetsDestroyed: recent.stats.general.gadgetsDestroyed - previous.stats.general.gadgetsDestroyed,
        hostageRescue: recent.stats.general.hostageRescue - previous.stats.general.hostageRescue,
        suicides: recent.stats.general.suicides - previous.stats.general.suicides,
      }
    };
    // traverse rank
    game['rank'] = {
      ncsa: {
        max_mmr: recent.rank.ncsa.max_mmr - previous.rank.ncsa.max_mmr,
        skill_mean: recent.rank.ncsa.skill_mean - previous.rank.ncsa.skill_mean,
        abandons: recent.rank.ncsa.abandons - previous.rank.ncsa.abandons,
        region: 'ncsa',
        rank: recent.rank.ncsa.rank - previous.rank.ncsa.rank,
        mmr: recent.rank.ncsa.mmr - previous.rank.ncsa.mmr,
        wins: recent.rank.ncsa.wins - previous.rank.ncsa.wins,
        skill_stdev: recent.rank.ncsa.skill_stdev - previous.rank.ncsa.skill_stdev,
        losses: recent.rank.ncsa.losses - previous.rank.ncsa.losses,
        max_rank: recent.rank.ncsa.max_rank - previous.rank.ncsa.max_rank,
      }
    };
    return game;
  }

}
