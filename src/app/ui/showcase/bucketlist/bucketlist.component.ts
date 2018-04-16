import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from "@angular/animations";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";

export interface BucketList {
  location?: string;
  placeId?: string;
  places?: Array<any>;
}

@Component({
  selector: "bucketlist",
  templateUrl: "./bucketlist.component.html",
  styleUrls: ["./bucketlist.component.scss"],
  animations: [
    trigger("bucketlist", [
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
export class BucketListComponent implements OnInit {
  bucketlist: Array<BucketList> = [
    {
      location: "Tokyo, Japan",
      placeId: "ChIJXSModoWLGGARILWiCfeu2M0",
      places: []
    },
    {
      location: "New York, NY, USA",
      placeId: "ChIJOwg_06VPwokRYv534QaPC8g",
      places: []
    },
    {
      location: "San Francisco, CA, USA",
      placeId: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      places: []
    }
  ];
  newItem: { location?: string; placeId?: string };
  apiKey: string = "AIzaSyB3u-Gzcds2RawF_HLPOmmWHPFojFms6aE";

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search") public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  addItem() {
    this.bucketlist.push({
      location: this.newItem.location,
      placeId: this.newItem.placeId,
      places: []
    });
    this.newItem = {};
    console.log(this.bucketlist);
  }

  removeItem(i) {
    this.bucketlist.splice(i, 1);
  }

  searchNearby(location: string) {
    // this.mapLoader(location, "restaurants")
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    this.mapLoader(this.searchElementRef.nativeElement, "(cities)");
  }

  private mapLoader(search: any, type: string): any {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        search,
        {
          types: [type]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.formatted_address) {
            this.newItem = {
              location: place.formatted_address,
              placeId: place.place_id
            };
          }

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          return place;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
