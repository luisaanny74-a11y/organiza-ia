import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../../../shared/components/dashboard-layout/dashboard-layout.component';
import { UploadCardComponent } from '../upload-cart/upload-card.component';
import { LucideAngularModule } from 'lucide-angular';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

interface Bill {
  id: number;
  date: string;
  category: string;
  amount: number;
  status: 'Processada' | 'Pendente' | 'Erro';
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutComponent,
    UploadCardComponent,
    LucideAngularModule,
    BaseChartDirective,
  ],
  template: `
    <app-dashboard-layout>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <app-upload-card
            (fileUploaded)="onFileUploaded($event)"
          ></app-upload-card>

          <div
            *ngIf="showCharts"
            class="bg-white rounded-xl shadow-lg p-6 border-2 border-slate-200/50 animate-fade-in"
          >
            <div class="flex items-center gap-2 mb-4">
              <lucide-icon
                name="pie-chart"
                [size]="20"
                class="text-brand-blue"
              ></lucide-icon>
              <h2 class="text-xl font-bold text-slate-800">
                Análise de Gastos
              </h2>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center"
            >
              <div class="w-full max-w-[300px]">
                <canvas
                  baseChart
                  [data]="pieChartData"
                  [type]="pieChartType"
                  [options]="pieChartOptions"
                >
                </canvas>
              </div>
              <div class="w-full">
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h3 class="font-semibold text-slate-700 mb-3">
                    Resumo da Fatura
                  </h3>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm items-center">
                      <span class="text-slate-500">Total Processado</span>
                      <span class="font-bold text-slate-800 text-lg"
                        >R$ 1.245,50</span
                      >
                    </div>
                    <div class="w-full border-t border-slate-200"></div>
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500">Categoria Principal</span>
                      <span
                        class="font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded"
                        >Alimentação</span
                      >
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500">Itens Analisados</span>
                      <span class="font-bold text-slate-800">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-slate-200/50 sticky top-24 h-fit"
          >
            <div class="flex items-center gap-2 mb-6">
              <lucide-icon
                name="clipboard-list"
                [size]="20"
                class="text-brand-blue"
              ></lucide-icon>
              <h2 class="text-xl font-bold text-slate-800">
                Histórico de Faturas
              </h2>
            </div>

            <div class="space-y-3">
              <div
                *ngIf="bills.length === 0"
                class="text-center text-slate-500 py-12 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50"
              >
                <lucide-icon
                  name="inbox"
                  [size]="32"
                  class="mx-auto mb-2 text-slate-300"
                ></lucide-icon>
                <p class="font-medium">Nenhuma fatura</p>
                <p class="text-xs mt-1 text-slate-400">
                  Faça um upload para começar.
                </p>
              </div>

              <div
                *ngFor="let bill of bills"
                class="flex items-center justify-between p-3 border border-slate-100 hover:border-brand-blue/30 hover:bg-blue-50/30 rounded-lg transition duration-200 animate-slide-in bg-white shadow-sm"
              >
                <div>
                  <p class="text-sm font-semibold text-slate-800">
                    {{ bill.category }}
                  </p>
                  <p class="text-xs text-slate-500">{{ bill.date }}</p>
                </div>
                <div class="text-right">
                  <p
                    class="text-sm font-bold"
                    [ngClass]="{ 'text-red-500': bill.amount > 0 }"
                  >
                    R$ {{ bill.amount.toFixed(2) }}
                  </p>
                  <span
                    [ngClass]="getStatusClass(bill.status)"
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  >
                    {{ bill.status }}
                  </span>
                </div>
              </div>
            </div>

            <button
              *ngIf="bills.length > 0"
              class="w-full mt-6 text-brand-blue hover:text-[#1a2a4a] text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1"
            >
              Ver Todas
              <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </app-dashboard-layout>
  `,
  styles: [
    `
      .text-brand-blue {
        color: #263b63;
      }
      .bg-brand-blue {
        background-color: #263b63;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-slide-in {
        animation: slideIn 0.3s ease-out forwards;
      }
    `,
  ],
})
export class DashboardPageComponent {
  bills: Bill[] = [];
  showCharts = false;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros'],
    datasets: [
      {
        data: [300, 150, 100, 80, 50],
        backgroundColor: [
          '#263b63',
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#cbd5e1',
        ],
        hoverBackgroundColor: [
          '#1e2f4f',
          '#2563eb',
          '#3b82f6',
          '#60a5fa',
          '#94a3b8',
        ],
        borderWidth: 0,
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  constructor() {
    this.loadBillsFromLocalStorage();
  }

  loadBillsFromLocalStorage(): void {
    const storedBills = localStorage.getItem('bills');
    if (storedBills) {
      this.bills = JSON.parse(storedBills);
    }
  }

  onFileUploaded(file: File): void {
    console.log('Arquivo recebido:', file.name);

    // Simula processamento
    setTimeout(() => {
      this.showCharts = true;

      const newBill: Bill = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        category: 'Fatura Importada',
        amount: 1245.5,
        status: 'Processada',
      };

      this.bills = [newBill, ...this.bills];
      localStorage.setItem('bills', JSON.stringify(this.bills));
    }, 800);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Processada':
        return 'bg-green-100 text-green-700';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'Erro':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }
}
