import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { DateTime } from 'luxon'; // Import Luxon DateTime
import 'chartjs-adapter-luxon'; // Import the Luxon date adapter

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.scss'],
})
export class ForecastingComponent implements OnInit {
  predictionsData: any[] = [];
  forecastingDays: any;
  selectedKpi: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Call the API to get the predictions data

    // Register the necessary chart options and adapters
    Chart.register(...registerables);
  }
  onForecast() {
    if (!this.selectedKpi || !this.forecastingDays) {
      return; // Do nothing if KPI or Forecasting days are not selected/entered
    }

    const payload = {
      column_name: this.selectedKpi, // Use the selected dropdown value as column_name
      desired_days: this.forecastingDays, // Use the input number as desired_days
    };

    this.http.post<any>('http://127.0.0.1:5000/predict', payload).subscribe((response) => {
      this.predictionsData = response.predictions;
      // Call the function to draw the chart with the new data
      this.drawChart();
    });
  }
 

drawChart() {
  // Get the dates and predictions values from the data
  const dates = this.predictionsData.map((item) => item.date);
  const predictions = this.predictionsData.map((item) => item.prediction);

  const formattedDates = dates.map((dateStr) => {
    const cleanedDateStr = dateStr.replace(/[^\d-:\s]/g, ''); // Remove all characters except digits, hyphens, colons, and whitespaces
    return DateTime.fromFormat(cleanedDateStr, 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy-MM-dd');
  });
  
  // Draw the chart
  const ctx = document.getElementById('predictionChart') as HTMLCanvasElement;
  console.log(ctx); // Log the canvas element to the console
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: formattedDates, // Use formatted dates
      datasets: [
        {
          label: 'Predictions',
          data: predictions,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          ticks: {
            font: {
              size: 18, // Set the desired font size for x-axis labels here
              weight: 'bold', // Set the font weight to bold
            },
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 18, // Set the desired font size for y-axis labels here
              weight: 'bold', // Set the font weight to bold
            },
          },
        },
      },
      // Adjust the font size of the tooltip values
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value = context.parsed.y.toFixed(2); // Format the value to show two decimal places
              return value;
            },
          },
          displayColors: false, // Hide the color boxes in the tooltip
          backgroundColor: '#FFF', // Set the background color of the tooltip
          titleColor: '#333', // Set the title color of the tooltip
          bodyColor: '#333', // Set the body color of the tooltip
          bodyFont: {
            size: 14, // Set the desired font size for the tooltip values here
          },
        },
      },
    },
  });
}
}