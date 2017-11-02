import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable()
export class TeamService {
  public url: string;

  constructor(private _userService: UserService,
              private _http: Http) {
    this.url = GLOBAL.url;
  }

  getTeams(position) {
    // const params = JSON.stringify(user_register);

    const headers = new Headers({
      'Authorization': this._userService.getToken()
    });

    return this._http
                .get(this.url + 'teams/' + position, {headers: headers})
                .map(res => res.json());

  }
}
