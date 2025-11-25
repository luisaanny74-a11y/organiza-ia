import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  template: `
    <div
      class="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4"
    >
      <div class="w-full max-w-[400px]">
        <div class="mb-8 flex justify-center">
          <app-logo></app-logo>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div *ngIf="title" class="mb-6 text-center">
            <h2 class="text-xl font-bold text-slate-800">{{ title }}</h2>
            <p *ngIf="subtitle" class="text-slate-500 text-sm mt-1">
              {{ subtitle }}
            </p>
          </div>
          <ng-content></ng-content>
        </div>
        <div class="mt-6 text-center">
          <p class="text-xs text-slate-400">&copy; 2025 Organiza.ai</p>
        </div>
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
