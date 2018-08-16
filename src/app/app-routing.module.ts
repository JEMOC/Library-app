import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full'},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
