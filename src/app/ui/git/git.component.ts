import { Component, OnInit } from "@angular/core";
import { DatePipe } from '@angular/common';

import { GitService, Repos, User, Commits } from "./git.service";
import { Subject } from "rxjs";
import { mergeMap } from 'rxjs/operators';

const datePipe = new DatePipe('en-US');

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
  chartDatasets: Array<{ data?: Array<any>, label?: string }>

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
      this.generateTable(res, repo);
    });
  }

  generateTable(arr: Array<any>, repo: string) {
    let weeklyCommits = []

    arr.forEach(data => {
      if (data.total == 0) return
      let date = datePipe.transform(data.week * 1000, 'EEEE, MMMM d')
      console.log(data)
      weeklyCommits.push(data.total)

      if (this.chartLabels) {
        this.chartLabels.push(date)
      } else {
        this.chartLabels = [date]
      }
    })

    if (this.chartDatasets) {
      this.chartDatasets.push({ data: weeklyCommits, label: repo })
    } else {
      this.chartDatasets = [{ data: weeklyCommits, label: repo }]
    }

    console.log(this.chartDatasets)
    console.log(this.chartLabels)
  }

  onSearch(q: string) {
    if (q !== "") {
      this.search.next(q);
    } else {
      // this.user = this.cache.users;
    }
  }
}
