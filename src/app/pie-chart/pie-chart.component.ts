import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

// import { Chart,registerables} from 'node_modules/chart.js';
// Chart.register(...registerables);


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent{
  // @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;

  // constructor() { }

  // ngOnInit(): void {
  // }

  // ngAfterViewInit(): void {
  //   this.createChart();
  // }

  // createChart(): void {
  //   const ctx = this.myChartCanvas.nativeElement.getContext('2d');

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [12, 19, 3, 5, 2, 3],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }
  @Input() totalTodo: number = 0;
  @Input() totalPending: number = 0;
  @Input() totalComplete: number = 0;

  chartData: number[] = [];
  chartLabels: string[] = ['Total Todo', 'Total Pending', 'Total Complete'];
  chartColors: any[] = [{ backgroundColor: ['blue', 'red', 'green'] }];

  ngOnChanges() {
    this.updateChartData();
  }

  private updateChartData() {
    this.chartData = [this.totalTodo, this.totalPending, this.totalComplete];
  }
}

