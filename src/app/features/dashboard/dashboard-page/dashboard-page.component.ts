import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
      <p class="text-slate-600 mt-2">Bem-vindo ao Organiza.ai!</p>
    </div>
  `,
})
export class DashboardPageComponent {}
