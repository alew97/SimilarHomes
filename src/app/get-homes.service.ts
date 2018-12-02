import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Home } from '../app/models/home'

@Injectable({
  providedIn: 'root'
})
export class GetHomesService {

  constructor(private http: HttpClient){
 
  }

  getHomes(home: Home) {
    return this.http.post('/api/homes/gethomes', {
      targetLongitude: home.targetLongitude,
      targetLatitude: home.targetLatitude,
      latitudeAway: home.latitudeAway,
      longitudeAway: home.longitudeAway,
      minBath: home.minBath,
      maxBath: home.maxBath,
      minBed: home.minBed,
      maxBed: home.maxBed,
      minFeet: home.minFeet,
      maxFeet: home.maxFeet
    })
  }
}
