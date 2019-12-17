import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UserServiceService {
  constructor() {}

  public getUser(id: number): Observable<User> {
    return of(this.UserList[id]);
  }

  public getUsers(): Observable<User[]> {
    return of(this.UserList);
  }

  public getNUser(start: number, N: number): Observable<User[]> {
    return of(this.UserList.slice(start, start + N));
  }

  UserList: User[] = [
    {
      ObjectId: "",
      Name: "",
      Owed: 0,
      Owes: new Map<String, number>(),
      CellNo: ""
    }
  ];
}
