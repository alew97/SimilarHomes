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
  public currentPage: number;
  public home: Home;
  public theseHomes: any = [];
  public canZero: Boolean; // to ensure that 'no homes match your query' message doesn't appear before the user searches

  constructor(private getHomesService: GetHomesService) {
    this.home = new Home();
    this.currentPage = 1;
  }

  getHomes() {
    if (this.home.targetLatitude && this.home.targetLongitude) { // target longitude and target latitude are only 2 required fields
      this.canZero = true;
      if (this.home.minBath == null) {
        this.home.minBath = Number.MIN_VALUE;
      }
      if (this.home.maxBath == null) {
        this.home.maxBath = Number.MAX_VALUE;
      }
      if (this.home.minBed == null) {
        this.home.minBed = Number.MIN_VALUE;
      }
      if (this.home.maxBed == null) {
        this.home.maxBed = Number.MAX_VALUE;
      }
      if (this.home.minFeet == null) {
        this.home.minFeet = Number.MIN_VALUE;
      }
      if (this.home.maxFeet == null) {
        this.home.maxFeet = Number.MAX_VALUE;
      }
      this.home.pageNumber = 1;
      this.getHomesService.getHomes(this.home).subscribe(result => {
        this.theseHomes = result['data'];
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('You must enter values for Target Latitude and Target Longitude.');
    }
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.home.pageNumber = this.currentPage;
    this.getHomesService.getHomes(this.home).subscribe(result => {
      this.theseHomes = result['data'];
    }, error => {
      console.log('error is ', error);
    });
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.home.pageNumber = this.currentPage;
    this.getHomesService.getHomes(this.home).subscribe(result => {
      this.theseHomes = result['data'];
    }, error => {
      console.log('error is ', error);
    });
  }

}
