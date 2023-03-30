import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './component/layout/layout.component';
import { HeaderInterceptorService } from './service/header-interceptor/header-interceptor.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamComponent } from './component/admin/team/team.component';
import { GameComponent } from './component/admin/game/game.component';
import { SegmentComponent } from './component/admin/segment/segment.component';
import { UserComponent } from './component/admin/user/user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeadminComponent } from './component/admin/homeadmin/homeadmin.component';
import { SegmentuserComponent } from './component/segmentuser/segmentuser.component';
import { GameuserComponent } from './component/gameuser/gameuser.component';
import { HistoryComponent } from './component/history/history.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    TeamComponent,
    GameComponent,
    SegmentComponent,
    UserComponent,
    DialogComponent,
    HomeadminComponent,
    SegmentuserComponent,
    GameuserComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
