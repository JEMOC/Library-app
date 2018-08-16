import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from '../../../node_modules/rxjs';

import { search_url } from '../url';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  title: String;

  data;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getData() {
    console.log(this.title.indexOf('.'));
    if (this.title.indexOf('.') >= 0) {
      this.title = null;
    }
    this.http.get(`${search_url}api/books?title=${this.title}`)
      .subscribe(data => this.data = JSON.parse(JSON.stringify(data)).value);
  }
}
