import { Component, OnInit } from '@angular/core';
import { GetHomesService } from '../get-homes.service';
import { Home } from '../models/home';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  providers: [GetHomesService]
})
export class RootComponent {

  public home : Home;

  constructor(private getHomesService: GetHomesService) { 
    this.home = new Home();
  }

  getHomes() {
    if (this.home.targetLatitude && this.home.targetLongitude) { // target longitude and target latitude are only 2 required fields
      if (this.home.minBath == null) {
        this.home.minBath = Number.MIN_VALUE
      }
      if (this.home.maxBath == null) {
        this.home.maxBath = Number.MAX_VALUE
      }
      if (this.home.minBed == null) {
        this.home.minBed = Number.MIN_VALUE
      }
      if (this.home.maxBed == null) {
        this.home.maxBed = Number.MAX_VALUE
      }
      if (this.home.minFeet == null) {
        this.home.minFeet = Number.MIN_VALUE
      }
      if (this.home.maxFeet == null) {
        this.home.maxFeet = Number.MAX_VALUE
      }
      this.getHomesService.getHomes(this.home).subscribe(result => {
        console.log('the result is ', result);
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('You must enter values for Target Latitude and Target Longitude.');
    }
  }

}
