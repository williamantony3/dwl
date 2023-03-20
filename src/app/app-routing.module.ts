import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './component/admin/game/game.component';
import { HomeadminComponent } from './component/admin/homeadmin/homeadmin.component';
import { SegmentComponent } from './component/admin/segment/segment.component';
import { TeamComponent } from './component/admin/team/team.component';
import { UserComponent } from './component/admin/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './service/authGuard/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'user', canActivate: [AuthGuardService], children: [
      {path: 'home', component: HomeComponent},
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'admin', canActivate: [AuthGuardService], children: [
    {path: 'game', component: GameComponent,},
    {path: 'team', component: TeamComponent},
    {path: 'segment', component: SegmentComponent},
    {path: 'user', component: UserComponent},
    {path: 'home', component: HomeadminComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
