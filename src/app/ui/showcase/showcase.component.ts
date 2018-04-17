import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.scss"]
})
export class ShowcaseComponent implements OnInit {
  projects: Array<any>;

  constructor() {}

  ngOnInit() {
    this.projects = [
      {
        title: "Bucket List",
        icon: "fa fa-plane",
        category: "Travels",
        desc:
          "Create and plan your own bucket list of places you want to visit. Powered by Google Places API.",
        image:
          "https://source.unsplash.com/6_pFPo2YM9c/300x300",
        link: "/showcase/bucketlist"
      }
    ];
  }
}
