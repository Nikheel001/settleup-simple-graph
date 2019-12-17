import { Injectable } from "@angular/core";
import { Graph } from "../models/graph";
import { User } from "../models/user";
import { Observable, of } from "rxjs";

@Injectable()
export class GraphServiceService {
  constructor() {}

  public getGraph(id: number): Observable<Graph> {
    return of(this.GroupList[id]);
  }

  public getGraphs(): Observable<Graph[]> {
    return of(this.GroupList);
  }

  public getNGraph(start: number, N: number): Observable<Graph[]> {
    return of(this.GroupList.slice(start, start + N));
  }

  GroupList: Graph[] = [{ Value: new Map<String, User>(), Name: "", Id: "" }];
}
