import { Component, OnInit } from "@angular/core";
import { GitService, Repos, User, Commits } from "./git.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-git",
  templateUrl: "./git.component.html",
  styleUrls: ["./git.component.scss"]
})
export class GitComponent implements OnInit {
  searchTerm: string = "iamjigz";
  search: Subject<string> = new Subject<string>();
  user: User;
  error: string;
  chartType: string = "line";
  chartOptions: any = {
    responsive: true
  };

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "My First dataset" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "My Second dataset" }
  ];

  public chartLabels: Array<any> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul"
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: "rgba(220,220,220,0.2)",
      borderColor: "rgba(220,220,220,1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(220,220,220,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(220,220,220,1)"
    },
    {
      backgroundColor: "rgba(151,187,205,0.2)",
      borderColor: "rgba(151,187,205,1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(151,187,205,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(151,187,205,1)"
    }
  ];

  constructor(private git: GitService) {
    this.search
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchTerm => {
        this.searchUser(searchTerm);
      });
  }

  ngOnInit() {
    this.searchUser("iamjigz");
  }

  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}

  private notify(message: string) {
    this.error = message;
    setTimeout(() => (this.error = ""), 10000);
  }

  searchUser(term: string) {
    this.git.searchUser(term).subscribe(
      res => {
        this.user = res as User;
        this.git.getRepos(term).subscribe(repos => {
          this.user.repos = repos;
          // repos.map(repo => {
          //   this.getStats(repo.full_name)
          // })
        });
      },
      err => this.notify(err.error.message)
    );
  }

  getStats(repo: string) {
    this.git.getCommitStats(repo).subscribe(res => {
      this.generateTable(res);
    });
  }

  generateTable(arr: Array<any>) {
    console.log(arr);
  }

  onSearch(q: string) {
    if (q !== "") {
      this.search.next(q);
    } else {
      // this.user = this.cache.users;
    }
  }
}
