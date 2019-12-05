import { Component, OnInit } from "@angular/core";
import { GraphServiceService } from "./../../../services/graph-service.service";
import { Graph } from "./../../../models/graph";

@Component({
  selector: "app-group-list",
  templateUrl: "./group-list.component.html",
  styleUrls: ["./group-list.component.css"]
})
export class GroupListComponent implements OnInit {
  constructor(private graphServiceService: GraphServiceService) {}

  getGroups(): void {
    this.graphServiceService
      .getGraphs()
      .subscribe(groups => (this.groupList = groups));
  }
  ngOnInit() {
    this.getGroups();
  }

  groupList: Graph[];
}
