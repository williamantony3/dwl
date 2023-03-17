import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './component/admin/game/game.component';
import { SegmentComponent } from './component/admin/segment/segment.component';
import { TeamComponent } from './component/admin/team/team.component';
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
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'admin', canActivate: [AuthGuardService], children: [
    {path: 'game', component: GameComponent,},
    {path: 'team', component: TeamComponent},
    {path: 'segment', component: SegmentComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
