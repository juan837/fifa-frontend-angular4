import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass'],
  providers: [
    TeamService
  ]
})

export class TeamComponent implements OnInit {
  public teams: Array<Team>;

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this._teamService.getTeams('').subscribe(
      resp => {
        console.log('Lista de Equipos', resp);
        this.teams = resp.teams;
      },
      err => {

      }
    );
  }

}
