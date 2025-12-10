import { Component, ViewChild } from '@angular/core';
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div class="lg:col-span-2 flex flex-col gap-6">
          <app-upload-card
            (fileUploaded)="onFileUploaded($event)"
          ></app-upload-card>

          <div
            *ngIf="showAnalysis"
            class="bg-white dark:bg-black rounded-xl shadow-lg p-6 border-2 border-slate-200/50 dark:border-gray-800 animate-fade-in transition-colors duration-300"
          >
            <div
              class="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-gray-800 pb-4"
            >
              <lucide-icon
                name="pie-chart"
                [size]="20"
                class="text-brand-blue dark:text-blue-400"
              ></lucide-icon>
              <h2 class="text-xl font-bold text-slate-800 dark:text-white">
                Análise de Gastos
              </h2>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center mb-8"
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
                <div
                  class="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg border border-slate-100 dark:border-gray-700"
                >
                  <h3
                    class="font-semibold text-slate-700 dark:text-gray-200 mb-3"
                  >
                    Resumo da Fatura (Prévia)
                  </h3>
                  <div class="space-y-3">
                    <div class="flex justify-between text-sm items-center">
                      <span class="text-slate-500 dark:text-gray-400"
                        >Total Detectado</span
                      >
                      <span
                        class="font-bold text-slate-800 dark:text-white text-lg"
                        >R$ 1.245,50</span
                      >
                    </div>
                    <div
                      class="w-full border-t border-slate-200 dark:border-gray-700"
                    ></div>
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500 dark:text-gray-400"
                        >Categoria Principal</span
                      >
                      <span
                        class="font-bold text-brand-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded"
                        >Alimentação</span
                      >
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-slate-500 dark:text-gray-400"
                        >Status</span
                      >
                      <span
                        class="font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded"
                        >Aguardando Aprovação</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="flex justify-center border-t border-slate-100 dark:border-gray-800 pt-6"
            >
              <button
                (click)="confirmInvoiceToHistory()"
                class="bg-brand-blue hover:bg-[#1b2b47] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wide"
              >
                <lucide-icon name="check" [size]="18"></lucide-icon>
                Processar Fatura
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-black rounded-xl shadow-lg p-6 md:p-8 border-2 border-slate-200/50 dark:border-gray-800 sticky top-24 h-fit transition-colors duration-300"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <lucide-icon
                  name="clipboard-list"
                  [size]="20"
                  class="text-brand-blue dark:text-blue-400"
                ></lucide-icon>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white">
                  Histórico
                </h2>
              </div>

              <button
                (click)="bills.length > 0 && openClearModal()"
                [disabled]="bills.length === 0"
                [ngClass]="
                  bills.length === 0
                    ? 'text-slate-300 dark:text-gray-700 cursor-not-allowed'
                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
                "
                class="p-2 rounded-lg transition-colors"
                title="Limpar Todo o Histórico"
              >
                <lucide-icon name="trash-2" [size]="20"></lucide-icon>
              </button>
            </div>

            <div class="space-y-3">
              <div
                *ngIf="bills.length === 0"
                class="text-center text-slate-500 dark:text-gray-400 py-12 border-2 border-dashed border-slate-100 dark:border-gray-700 rounded-lg bg-slate-50/50 dark:bg-gray-900/50"
              >
                <lucide-icon
                  name="inbox"
                  [size]="32"
                  class="mx-auto mb-2 text-slate-300 dark:text-gray-600"
                ></lucide-icon>
                <p class="font-medium">Histórico Vazio</p>
                <p class="text-xs mt-1 text-slate-400 dark:text-gray-500">
                  Processe uma fatura para vê-la aqui.
                </p>
              </div>

              <div
                *ngFor="let bill of bills; let i = index"
                class="relative flex items-center justify-between p-3 border border-slate-100 dark:border-gray-700 hover:border-brand-blue/30 dark:hover:border-blue-500/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 rounded-lg transition duration-200 animate-slide-in bg-white dark:bg-black shadow-sm pr-10 group"
              >
                <button
                  (click)="openDeleteModal(i)"
                  class="absolute top-3 right-3 text-slate-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors"
                  title="Excluir Transação"
                >
                  <lucide-icon name="x" [size]="16"></lucide-icon>
                </button>

                <div>
                  <p
                    class="text-sm font-semibold text-slate-800 dark:text-gray-200"
                  >
                    {{ bill.category }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-gray-400">
                    {{ bill.date }}
                  </p>
                </div>
                <div class="text-right mr-2">
                  <p
                    class="text-sm font-bold"
                    [ngClass]="{
                      'text-red-500 dark:text-red-400': bill.amount > 0
                    }"
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
              class="w-full mt-6 text-brand-blue dark:text-blue-400 hover:text-[#1a2a4a] dark:hover:text-blue-300 text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center gap-1"
            >
              Ver Todas
              <lucide-icon name="arrow-right" [size]="14"></lucide-icon>
            </button>
          </div>
        </div>
      </div>

      <div
        *ngIf="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 border border-slate-200 dark:border-gray-700 transform transition-all scale-100"
        >
          <div class="text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4"
            >
              <lucide-icon
                name="trash-2"
                class="h-6 w-6 text-red-600 dark:text-red-400"
              ></lucide-icon>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Excluir Transação?
            </h3>
            <p class="text-sm text-slate-500 dark:text-gray-400 mb-6">
              Tem certeza que deseja remover este item do histórico? Esta ação
              não pode ser desfeita.
            </p>
            <div class="flex justify-center gap-3">
              <button
                (click)="closeDeleteModal()"
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                (click)="confirmDelete()"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        *ngIf="showClearModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 border border-slate-200 dark:border-gray-700 transform transition-all scale-100"
        >
          <div class="text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4"
            >
              <lucide-icon
                name="trash-2"
                class="h-6 w-6 text-red-600 dark:text-red-400"
              ></lucide-icon>
            </div>
            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Limpar Histórico Completo?
            </h3>
            <p class="text-sm text-slate-500 dark:text-gray-400 mb-6">
              Você está prestes a apagar <strong>todas</strong> as faturas do
              histórico. Isso não pode ser revertido.
            </p>
            <div class="flex justify-center gap-3">
              <button
                (click)="closeClearModal()"
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                (click)="confirmClearAll()"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Sim, Limpar Tudo
              </button>
            </div>
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
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      .animate-slide-in {
        animation: slideIn 0.3s ease-out forwards;
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
    `,
  ],
})
export class DashboardPageComponent {
  @ViewChild(UploadCardComponent) uploadCard!: UploadCardComponent;

  bills: Bill[] = [];

  // Controle de Estado
  showAnalysis = false;
  pendingBill: Bill | null = null;

  // Controle de Modais
  showDeleteModal = false;
  showClearModal = false;
  itemToDeleteIndex: number | null = null;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: { usePointStyle: true, boxWidth: 10, color: '#94a3b8' },
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
    setTimeout(() => {
      this.showAnalysis = true;
      this.pendingBill = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        category: 'Fatura Importada',
        amount: 1245.5,
        status: 'Processada',
      };
    }, 800);
  }

  confirmInvoiceToHistory(): void {
    if (this.pendingBill) {
      this.bills = [this.pendingBill, ...this.bills];
      localStorage.setItem('bills', JSON.stringify(this.bills));
      this.pendingBill = null;
      this.showAnalysis = false;
    }
  }

  openDeleteModal(index: number): void {
    this.itemToDeleteIndex = index;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.itemToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.itemToDeleteIndex !== null) {
      this.bills.splice(this.itemToDeleteIndex, 1);
      localStorage.setItem('bills', JSON.stringify(this.bills));
      this.closeDeleteModal();
    }
  }

  openClearModal(): void {
    this.showClearModal = true;
  }

  closeClearModal(): void {
    this.showClearModal = false;
  }

  confirmClearAll(): void {
    this.bills = [];
    localStorage.removeItem('bills');
    this.closeClearModal();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Processada':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Erro':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-gray-800 dark:text-gray-300';
    }
  }
}
