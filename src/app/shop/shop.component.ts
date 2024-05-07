import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  totalTodo: number = 0;
  totalPending: number = 0;
  totalComplete: number = 0;
  pieChart: any;

  constructor() { }

  ngOnInit(): void {
    this.calculateCounts();
    this.createPieChart();
  }

  calculateCounts() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.totalTodo = tasks.length;
    this.totalPending = tasks.filter((task: { status: string; }) => task.status === 'Pending').length;
    this.totalComplete = tasks.filter((task: { status: string; }) => task.status === 'Complete').length;
  }
 
  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Element with ID "pieChart" not found.');
      return;
    }
  
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Todo', 'Total Pending', 'Total Complete'],
        datasets: [{
          label: 'Tasks',
          data: [this.totalTodo, this.totalPending, this.totalComplete],
          backgroundColor: ['blue', 'red', 'green'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  
}



