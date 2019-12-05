import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GroupListComponent } from './view/group/group-list/group-list.component';
import { GraphServiceService } from './services/graph-service.service';
import { UserServiceService } from './services/user-service.service';
import { UserListComponent } from './view/user/user-list/user-list.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, GroupListComponent, UserListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [GraphServiceService, UserServiceService]
})
export class AppModule { }
