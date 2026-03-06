import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { 
  LucideAngularModule, 
  DollarSign, 
  BarChart2, 
  UserPlus, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  MoreHorizontal, 
  MoreVertical,
  ChevronDown,
  Download
} from 'lucide-angular';

const ICONS = {
  DollarSign, 
  BarChart2, 
  UserPlus, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  MoreHorizontal, 
  MoreVertical,
  ChevronDown,
  Download
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    BaseChartDirective, 
    LucideAngularModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  // Make icons available to template
  readonly icons = ICONS;

  // --- Charts Configuration ---

  // 1. Bar Chart: Income vs Expense
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { data: [350, 260, 390, 260, 380, 330, 220], label: 'Income', backgroundColor: '#4caf50', borderRadius: 20, barThickness: 8 },
      { data: [190, 110, 250, 190, 210, 180, 160], label: 'Expense', backgroundColor: '#81c784', borderRadius: 20, barThickness: 8 }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, drawTicks: false },
        ticks: { stepSize: 100 }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // 2. Line Chart: Analytics
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1000, 2500, 1800, 3500, 2000, 4500, 5500],
        label: 'Series A',
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4caf50',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      },
      {
        data: [1000, 1800, 1200, 2200, 1500, 2800, 2000],
        label: 'Series B',
        borderColor: '#4db6ac',
        backgroundColor: 'transparent',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4db6ac',
        pointRadius: 4,
        tension: 0.4
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { display: false },
      x: { 
        grid: { display: false },
        ticks: { color: '#999' }
      }
    }
  };

  // 3. Doughnut Chart: Simulações
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Total', 'Rest'],
    datasets: [
      { 
        data: [3500, 1000], // Example data
        backgroundColor: ['#4caf50', '#e0f2f1'],
        hoverBackgroundColor: ['#43a047', '#b2dfdb'],
        borderWidth: 0
      }
    ]
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '85%',
    circumference: 360,
    rotation: 0,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  // 4. Horizontal Bar Chart: Approved vs Not Approved
  public horizontalBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['19', '20', '21', '22', '23', '24', '25'],
    datasets: [
      { 
        data: [-150, -280, -380, -320, -250, -200, -180], 
        label: 'Não Aprovados', 
        backgroundColor: '#4db6ac', 
        borderRadius: { topLeft: 20, bottomLeft: 20 },
        barThickness: 12,
        stack: 'stack1'
      },
      { 
        data: [120, 250, 300, 350, 220, 280, 150], 
        label: 'Aprovados', 
        backgroundColor: '#4caf50', 
        borderRadius: { topRight: 20, bottomRight: 20 },
        barThickness: 12,
        stack: 'stack1'
      }
    ]
  };
  public horizontalBarChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: true, drawTicks: false },
        ticks: { 
          callback: (value) => Math.abs(Number(value)) 
        }
      },
      y: {
        grid: { display: false }
      }
    }
  };

  // Table Data
  public recentSimulations = [
    { client: 'Regina Cooper', number: '#790841', value: '$2.500', type: 'Lorem', date: '12.09.2019', avatar: 'https://i.pravatar.cc/150?u=regina' },
    { client: 'Robert Edwards', number: '#799894', value: '$1.500', type: 'Lorem', date: '12.09.2019', avatar: 'https://i.pravatar.cc/150?u=robert' },
    { client: 'Gloria Mckinney', number: '#790857', value: '$5.600', type: 'Lorem', date: '12.09.2019', avatar: 'https://i.pravatar.cc/150?u=gloria' },
    { client: 'Randall Fisher', number: '#790687', value: '$2.850', type: 'Lorem', date: '12.09.2019', avatar: 'https://i.pravatar.cc/150?u=randall' },
  ];
}
