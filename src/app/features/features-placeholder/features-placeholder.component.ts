import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../shared/components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-features-placeholder',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent],
  template: `
    <app-dashboard-layout>
      <div
        class="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200"
      >
        <h1 class="text-3xl font-bold text-slate-800 mb-4">Funcionalidades</h1>
        <p class="text-slate-600">
          Esta página será implementada para exibir funcionalidades adicionais
          do sistema.
        </p>
      </div>
    </app-dashboard-layout>
  `,
})
export class FeaturesPlaceholderComponent {}
