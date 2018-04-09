import { Component, OnInit } from "@angular/core";
import { User, GitService } from "./git.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-git",
  templateUrl: "./git.component.html",
  styleUrls: ["./git.component.scss"]
})
export class GitComponent implements OnInit {

  searchTerm: string = 'iamjigz';
  search: Subject<string> = new Subject<string>();
  user: User;
  loadingFollowers: boolean = false;

  constructor(private git: GitService) {
    this.search
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchTerm => {
        this.searchUser(searchTerm)
      });
  }

  ngOnInit() {
    this.searchUser('iamjigz')
  }

  searchUser(term: string) {
    this.git
    .search(term)
    .subscribe(res => {
      this.user = res as User
      console.log(res)
    });
  }

  onSearch(q: string) {
    if (q !== "") {
      this.search.next(q);
    } else {
      // this.user = this.cache.users;
    }
  }

}
