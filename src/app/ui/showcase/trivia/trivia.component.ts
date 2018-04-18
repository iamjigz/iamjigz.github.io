import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from "@angular/animations";
import { Observable } from "rxjs";

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  category: string;
  question: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  options?: string[];
  points?: number;
}

@Component({
  selector: "app-trivia",
  templateUrl: "./trivia.component.html",
  styleUrls: ["./trivia.component.scss"],
  animations: [
    trigger("items", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("300ms", [
            animate(
              ".6s ease-in",
              keyframes([
                style({ opacity: 0, transform: "translateY(-75%)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateY(35px)",
                  offset: 0.3
                }),
                style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
              ])
            )
          ]),
          { optional: true }
        ),
        query(
          ":leave",
          stagger("300ms", [
            animate(
              ".6s ease-out",
              keyframes([
                style({ opacity: 1, transform: "translateY(0)", offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: "translateY(35px)",
                  offset: 0.3
                }),
                style({
                  opacity: 0,
                  transform: "translateY(-75%)",
                  offset: 1.0
                })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class TriviaComponent implements OnInit {
  private apiRoot: string = "https://opentdb.com/";
  public categories: Category[] = [];
  public questions: Question[] = [];
  public question: Question;
  public questionIndex: number = 0;
  public score: number = 0;
  public total: number = 0;
  public finished: boolean = false;
  public imageUrl: string;

  constructor(private http: HttpClient) {}

  getQuestions(id: number) {
    this.reset();

    return this.http
      .get(`${this.apiRoot}/api.php?amount=10&category=${id}`)
      .subscribe(res => {
        if (!(res["response_code"] === 0)) return;
        this.questions = res["results"] as Question[];
      },
      err => console.log(err),
      () => this.nextQuestion()
    );
  }

  submit(ans?: string) {
    if (ans && ans === this.question.correct_answer)
      this.score += this.question.points;
    this.total += this.question.points;
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.questionIndex < this.questions.length) {
      this.question = this.questions[this.questionIndex];

      let options = [].concat(this.getOptions(this.question));
      this.question.options = options;

      switch (this.question.difficulty) {
        case "easy":
          this.question.points = 1;
          break;
        case "medium":
          this.question.points = 2;
          break;
        case "hard":
          this.question.points = 3;
          break;
        default:
          this.question.points = 0;
      }
      this.questionIndex++;
    } else {
      this.finished = true
      this.imageUrl = `https://source.unsplash.com/500x500/?${this.question.category}`
    }
  }

  private reset() {
    this.questions = []
    this.question = {} as Question
    this.questionIndex = 0
    this.score = 0
    this.total = 0
    this.finished = false
  }

  private getOptions(question: Question) {
    let options = [];

    options.push(question.correct_answer);
    question.incorrect_answers.forEach(opt => {
      options.push(opt);
    });

    return options.sort(() => {
      return 0.5 - Math.random();
    });
  }

  private getCategories() {
    this.http
      .get(`${this.apiRoot}/api_category.php`)
      .subscribe(
        res => (this.categories = res["trivia_categories"] as Category[])
      );
  }

  ngOnInit() {
    this.getCategories();
  }
}
