import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, LogoComponent, LucideAngularModule, RouterModule],
  template: `
    <div
      class="min-h-screen bg-[#243a5f] dark:bg-black pb-10 transition-colors duration-300"
    >
      <header
        class="bg-white dark:bg-black dark:border-gray-800 shadow-md sticky top-0 z-20 border-b border-slate-200 transition-colors duration-300"
      >
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        >
          <div class="flex items-center">
            <app-logo [showText]="false" [large]="false"></app-logo>
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <button
                (click)="toggleMenu()"
                class="flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-gray-900 p-2 rounded-lg transition-colors cursor-pointer group focus:outline-none"
              >
                <div
                  class="rounded-full bg-slate-200 dark:bg-gray-800 p-1.5 transition-colors"
                >
                  <lucide-icon
                    name="user"
                    [size]="20"
                    class="text-slate-500 dark:text-gray-300"
                  ></lucide-icon>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    class="text-sm font-medium text-slate-700 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors"
                  >
                    Olá, Luiza
                  </span>
                  <lucide-icon
                    [name]="menuOpen ? 'chevron-up' : 'chevron-down'"
                    [size]="16"
                    class="text-slate-400"
                  ></lucide-icon>
                </div>
              </button>

              <div
                *ngIf="menuOpen"
                class="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-slate-100 dark:border-gray-700 py-2 z-30 animate-fade-in"
              >
                <div
                  class="px-4 py-3 border-b border-slate-100 dark:border-gray-800"
                >
                  <p
                    class="text-xs text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider"
                  >
                    Configurações
                  </p>
                </div>

                <button
                  class="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
                >
                  <lucide-icon
                    name="user-cog"
                    [size]="18"
                    class="text-slate-400 dark:text-gray-500"
                  ></lucide-icon>
                  Mudar Dados
                </button>

                <div
                  class="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  (click)="toggleTheme($event)"
                >
                  <div class="flex items-center gap-3">
                    <lucide-icon
                      name="moon"
                      [size]="18"
                      class="text-slate-400 dark:text-gray-500"
                    ></lucide-icon>
                    <span class="text-sm text-slate-700 dark:text-gray-200"
                      >Modo Escuro</span
                    >
                  </div>

                  <div
                    class="w-10 h-5 rounded-full relative transition-colors duration-300 border border-transparent"
                    [ngClass]="
                      themeService.darkMode() ? 'bg-brand-blue' : 'bg-slate-300'
                    "
                  >
                    <div
                      class="w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm"
                      [ngClass]="themeService.darkMode() ? 'left-6' : 'left-1'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              (click)="logout()"
              class="text-brand-blue dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-gray-900 p-2 rounded-lg transition-colors"
              title="Sair"
            >
              <lucide-icon name="log-out" [size]="20"></lucide-icon>
            </button>
          </div>
        </div>
      </header>

      <div
        *ngIf="menuOpen"
        (click)="menuOpen = false"
        class="fixed inset-0 z-10 bg-transparent"
      ></div>

      <main class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <ng-content></ng-content>
      </main>
    </div>
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
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.15s ease-out forwards;
      }
    `,
  ],
})
export class DashboardLayoutComponent {
  private router = inject(Router);
  public themeService = inject(ThemeService);

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleTheme(event: Event) {
    event.stopPropagation();
    this.themeService.toggleTheme();
  }

  logout(): void {
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']);
  }
}
