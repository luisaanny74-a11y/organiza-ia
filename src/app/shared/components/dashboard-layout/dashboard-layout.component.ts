import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, LogoComponent, LucideAngularModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#243a5f] pb-10">
      <header
        class="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200"
      >
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        >
          <div class="flex items-center">
            <app-logo [showText]="false" [large]="false"></app-logo>
          </div>

          <div class="flex items-center space-x-4">
            <button
              class="flex items-center space-x-2 hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer group"
            >
              <div
                class="rounded-full bg-slate-200 p-1.5 group-hover:bg-slate-300 transition-colors"
              >
                <lucide-icon
                  name="user"
                  [size]="20"
                  class="text-slate-500 group-hover:text-slate-700"
                ></lucide-icon>
              </div>
              <span
                class="text-sm font-medium text-slate-700 group-hover:text-brand-blue transition-colors"
              >
                Olá, Luiza
              </span>
            </button>

            <button
              (click)="logout()"
              class="text-brand-blue hover:text-[#1a2a4a] transition-colors p-2 rounded-lg hover:bg-slate-50"
              title="Sair"
            >
              <lucide-icon name="log-out" [size]="20"></lucide-icon>
            </button>
          </div>
        </div>
      </header>

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
    `,
  ],
})
export class DashboardLayoutComponent {
  private router = inject(Router);

  logout(): void {
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']);
  }
}
