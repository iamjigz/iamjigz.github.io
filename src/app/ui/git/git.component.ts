import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";

import { GitService, Repos, User, Commits } from "./git.service";
import { Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";

const datePipe = new DatePipe("en-US");

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
  chartLabels: Array<any>;
  chartDatasets: Array<{ data?: Array<any>; label?: string }>;
  cache: { dataset?: Array<any>; labels?: Array<any> };

  public chartColors: Array<any> = [
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
      .debounceTime(3000)
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
    setTimeout(() => (this.error = ""), 60000);
  }

  searchUser(term: string) {
    this.git.searchUser(term).subscribe(
      res => {
        this.user = res as User;
        this.git.getRepos(term).subscribe(repos => {
          this.user.repos = repos;
          // repos.map(repo => {
          //   if (this.limitDate(repo.updated_at)) this.getStats(repo.full_name)
          // })
        }, err => this.notify(err.error.message));
      },
      err => this.notify(err.error.message)
    );
  }

  private limitDate(date: any): boolean {
    const today = new Date();
    const updated = new Date(date);
    const diff = Math.abs(today.getTime() - updated.getTime());
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    if (days < 90) return true;
  }

  getStats(repo: string) {
    this.cache = {}
    this.chartDatasets = this.cache.dataset
    this.chartLabels = this.cache.labels

    this.git.getCommitStats(repo).subscribe(
      res => this.generateTable(res, repo),
      err => this.notify(err.error.message),
      () => {
        this.chartDatasets = this.cache.dataset
        this.chartLabels = this.cache.labels
      }
    );
  }

  generateTable(arr: Array<any>, repo: string) {
    let weeklyCommits = []

    if (!(arr.length > 0)) return
    arr.forEach(data => {
      if (data.total == 0 || !this.limitDate(data.week * 1000)) return;
      let date = datePipe.transform(data.week * 1000, "MMMM d yyyy");
      weeklyCommits.push(data.total)

      if (this.cache.labels) {
        this.cache.labels.push(date)
      } else {
        this.cache.labels = [date]
      }
    });

    if (this.cache.dataset) {
      this.cache.dataset.push({ data: weeklyCommits, label: repo })
    } else {
      this.cache.dataset = [{ data: weeklyCommits, label: repo }]
    }
  }

  onSearch(q: string) {
    if (q !== "") {
      this.search.next(q);
    } else {
      // this.user = this.cache.users;
    }
  }
}
