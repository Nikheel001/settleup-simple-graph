import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../../../services/user-service.service";
import { User } from "../../../models/user";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(private userServiceService: UserServiceService) { }

  getUsers(): void {
    this.userServiceService
      .getUsers()
      .subscribe(users => (this.userList = users));
  }
  ngOnInit() {
    this.getUsers();
  }

  userList: User[];
}
