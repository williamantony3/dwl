import { HttpEventType } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { history } from 'src/app/model/history.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RestService } from 'src/app/service/rest/rest.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit{
  displayedColumns: string[] = ['game_name', 'home', 'away', 'option', 'result', 'user_claim', 'detail'];
  dataSource = new MatTableDataSource<history>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private rest: RestService,
    private authS:AuthService
    
  ) {
    this.getAllHistory();
  }

  
  getAllHistory() {
    this.rest.getHistoryGameUser("fc7384d6-c8fd-4b75-9b13-95c69dcad150").subscribe((event) => {
      if (event.type == HttpEventType.Response && event.ok) {
        this.dataSource.data = Object(event.body)['data'] ;
      }
    });
  }

}