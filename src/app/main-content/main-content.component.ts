import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  booksdata;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://111.230.63.173:3002/api/books?state=top5').subscribe(data => this.booksdata = data);
  }

}
