import { Component, OnInit } from "@angular/core";
import { ApiService, ApiResponse } from "../api/api.service";
import * as R from "ramda";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name: string = "Space-X Launch Tracker";
  launches: Array<object> = [];
  filteredLaunches: Array<object> = [];
  error: Array<object> = [];
  currentPage: number = 1;
  resultsPerPage: number = 10;
  focus: number | boolean = false;
  sort: string = "launch_year";
  descendingSort: boolean = false;
  maxPages: number = 0;
  headers: Array<Array<String>> = [
    ["Flight Number", "flight_number"],
    ["Launch Year", "launch_year"],
    ["Rocket Name", "rocket.rocket_name"],
    ["Details", "details"]
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getLaunches();
  }

  getLaunches(): void {
    this.api.getData().subscribe(data => {
      this.maxPages = Math.ceil(data.length / this.resultsPerPage);
      this.filteredLaunches = this.filterLaunches(this.sortData(data));
      this.launches = this.sortData(data);
    });
  }

  getHeader(header: string, obj: object, truncate: string): void {
    return R.path(header.split("."), obj);
  }

  setFocus(i): void {
    this.focus = i === this.focus ? false : i;
  }

  setSort(sort): void {
    this.sort = sort;
    this.currentPage = 1;
    this.descendingSort =
      sort === this.sort ? !this.descendingSort : this.descendingSort;
    this.filteredLaunches = this.filterAndSort(this.launches);
  }

  /**
   * helper function to ensure UI is valid accoridng to filter and sort
   */
  filterAndSort(launches: Array<Object>) {
    return this.filterLaunches(this.sortData(launches));
  }

  filterLaunches(launchArr: Array<Object>): Array<Object> {
    return launchArr.slice(
      this.currentPage * this.resultsPerPage - this.resultsPerPage,
      this.currentPage * this.resultsPerPage
    );
  }

  sortData(arr) {
    const test = this.descendingSort;
    const value1 = this.descendingSort ? 1 : -1;
    const value2 = this.descendingSort ? -1 : 1;

    const prop = this.sort.split(".");

    return arr.sort(function(a, b) {
      var i = 0;
      while (i < prop.length) {
        a = a[prop[i]];
        b = b[prop[i]];
        i++;
      }
      if (a < b) {
        return value1;
      } else if (a > b) {
        return value2;
      } else {
        return 0;
      }
    });
  }

  setPage(action) {
    if (action === "prev") {
      if (this.currentPage - 1 > 0) {
        this.focus = null;
        this.currentPage = this.currentPage - 1;
        this.filteredLaunches = this.filterAndSort(this.launches);
      }
    } else if (action === "next") {
      if (this.currentPage + 1 <= this.maxPages) {
        this.focus = null;
        this.currentPage = this.currentPage + 1;
        this.filteredLaunches = this.filterAndSort(this.launches);
      }
    }
  }
}
