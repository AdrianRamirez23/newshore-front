import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { AmountRequest } from '../Models/AmountRequest';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private urlGetCities = 'GetCities';
  private urlGetRoutes = 'GetRoutes';
  private urlChangeCurrency = 'ChangeCurrency';
  constructor( private http: HttpClient) { }
  GetCities(): Observable<any> {
    return this.http.get<any>(environment.urlApiBase+this.urlGetCities);
  }
  GetRoutes(origin: string, destination: string): Observable<any> {
    return this.http.get<any>(environment.urlApiBase+this.urlGetRoutes, {
      params: {
        Origin: origin,
        Destination: destination
      }
    });
  }
  ChangeCurrency(request: AmountRequest): Observable<any> {
    return this.http.post<any>(environment.urlApiBase+this.urlChangeCurrency, request);
  }
}
