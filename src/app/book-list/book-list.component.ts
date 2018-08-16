import {
  Component,
  OnInit,
  OnChanges
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { url,
  img_url
} from '../url';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})


export class BookListComponent implements OnInit {

  list: object;
  index: any = 1;
  pageindex = 1;
  index_length: number;
  des_url: String = img_url;
  page_arr;
  arr;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLength();
    this.getList(this.index);
  }



  getList(index) {
    this.http.get(`${url}api/books?state=q&q=list&start=${(index - 1) * 8 || 0}`).subscribe((data) => (
      this.list = JSON.parse(JSON.stringify(data)).data
    ));
  }

  initPageArr() {
    if (this.pageindex >= (this.index_length - 5)) {
      this.arr = this.page_arr.slice(this.index_length - 5 , this.index_length);
    } else {
      this.arr = this.page_arr.slice(this.pageindex - 1, this.pageindex + 4);
    }
  }

  changePageArr(ctl) {
    if (ctl === 1) {
      this.pageindex += 5;
    } else {
      if (this.pageindex <= 5) {
        this.pageindex = 1;
      } else {
        this.pageindex -= 5;
      }
    }
    this.initPageArr();
  }


  getLength() {
    this.http.get(`${url}api/books?state=q&q=length`).subscribe(
      (data) => {
        this.index_length = Math.ceil(JSON.parse(JSON.stringify(data)).data.length / 8);
        this.page_arr = (new Array(this.index_length)).fill(1).map((v, i) => (i + 1));
        this.initPageArr();
      }
    );
  }

  f() {
    this.pageindex = this.index;
    this.initPageArr();
  }

  changeIndex(event) {
    const ctl = event.target.innerHTML;
    switch (ctl) {
      case '上一页':
        if (this.index === 1) {
          break;
        }
        this.index--;
        this.f();
        break;
      case '下一页':
        if (this.index === this.index_length) {
          break;
        }
        this.index++;
        this.f();
        break;
      case '<':
        break;
      case '>':
        this.initPageArr();
        break;
      default:
        this.index = parseInt(ctl, 0);
    }

    this.getList(this.index);
  }


}
