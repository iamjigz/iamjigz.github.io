import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss'],
  animations: [
    trigger('bucketlist', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class BucketListComponent implements OnInit {
  itemCount: number
  bucketlist: Array<string> = ['Japan', 'Nepal', 'New Zealand'];
  newItem: string = 'Singapore'

  constructor() {
    this.itemCount = this.bucketlist.length
  }

  addItem() {
    this.bucketlist.push(this.newItem)
    this.newItem = ''
    this.itemCount = this.bucketlist.length
  }

  removeItem(i) {
    this.bucketlist.splice(i, 1);
  }

  ngOnInit() {
  }

}
