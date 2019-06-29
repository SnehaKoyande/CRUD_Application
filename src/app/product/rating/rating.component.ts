import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating : number;
  @Output() ratingToparent : EventEmitter<string> = new EventEmitter(); //Child can communicate with parent only using events.
  //Event payload is of type string.


  rating_arr : any = [];

  constructor() { }

  ngOnInit() {
    this.rating_arr = Array(Math.round(this.rating)).fill(Math.round(this.rating));; //creates an empty array with length = rating value
  }

  sendRatingToParent(){
    this.ratingToparent.emit('Rating value = ' + this.rating);

  }

}
