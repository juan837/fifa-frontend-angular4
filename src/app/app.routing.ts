import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team/team.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: TeamComponent,
        children: [
            // {
            //     path: '',
            //     component: ResumeComponent,
            // },
            // {
            //     path: 'calendar',
            //     component: CalendarComponent,
            // }
        ]
    }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
