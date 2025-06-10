import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../_services/weather.service';
import { Weather } from '../_models/Weather';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  weatherData: Weather | null = null;
  forecastData: any = null;
  isLoading = false;
  isForecastLoading = false;
  error: string | null = null;
  forecastError: string | null = null;
  location = 'Kokkola, Finland'; // Location for weather data
  forecastDays = 3;

  // Option 1: Constructor injection (traditional approach)
  // constructor(private weatherService: WeatherService) {}

  // Option 2: inject function (newer approach)
  weatherService = inject(WeatherService);

  ngOnInit(): void {
    this.getWeatherForKempele();
    this.getForecastForKempele();
  }

  getWeatherForKempele(): void {
    this.isLoading = true;
    this.error = null;

    this.weatherService.getCurrentWeather(this.location).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        console.log('Weather data:', data);
      },
      error: (error) => {
        this.error = 'Failed to load weather data: ' + error.message;
        this.isLoading = false;
        console.error('Weather error:', error);
      }
    });
  }

  getForecastForKempele(): void {
    this.isForecastLoading = true;
    this.forecastError = null;

    this.weatherService.getForecast(this.location, this.forecastDays).subscribe({
      next: (data) => {
        this.forecastData = data;
        this.isForecastLoading = false;
        console.log('Forecast data:', data);
      },
      error: (error) => {
        this.forecastError = 'Failed to load forecast data: ' + error.message;
        this.isForecastLoading = false;
        console.error('Forecast error:', error);
      }
    });
  }

  refreshAll(): void {
    this.getWeatherForKempele();
    this.getForecastForKempele();
  }
}
