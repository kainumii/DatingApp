import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Weather } from '../_models/Weather';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private baseUrl = environment.weatherApiBaseUrl;
  private http = inject(HttpClient);

  getCurrentWeather(location: string): Observable<Weather> {
    return this.http.get<Weather>(`${this.baseUrl}/current.json?key=${this.apiKey}&q=${location}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching weather data:', error);
          return throwError(() => new Error('Failed to fetch weather data. Please try again.'));
        })
      );
  }
  
  // Optional: Get forecast data
  getForecast(location: string, days: number = 3): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=${days}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching forecast data:', error);
          return throwError(() => new Error('Failed to fetch forecast data. Please try again.'));
        })
      );
  }
}
