import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthLayoutComponent,
    LucideAngularModule,
  ],
  template: `
    <app-auth-layout title="Recuperar Senha">
      <div *ngIf="!sent; else success" class="space-y-6">
        <p class="text-slate-500 text-center text-sm">
          Digite seu email para receber as instruções de recuperação.
        </p>

        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
          >
            <lucide-icon name="mail" [size]="20"></lucide-icon>
          </div>
          <input
            [(ngModel)]="email"
            name="email"
            type="email"
            placeholder="Seu email cadastrado"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-slate-700"
          />
        </div>

        <button
          (click)="sent = true"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-200 transition text-sm uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <span>Enviar Link</span>
          <lucide-icon name="send" [size]="18"></lucide-icon>
        </button>
      </div>

      <ng-template #success>
        <div class="text-center py-4">
          <div
            class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <lucide-icon name="check" [size]="24"></lucide-icon>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Email Enviado!</h3>
          <p class="text-slate-500 text-sm mt-2">
            Verifique sua caixa de entrada.
          </p>
          <button
            (click)="sent = false"
            class="mt-6 text-blue-600 hover:underline text-sm font-medium"
          >
            Tentar outro email
          </button>
        </div>
      </ng-template>

      <div class="mt-8 pt-6 border-t border-slate-100 text-center">
        <a
          routerLink="/login"
          class="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <lucide-icon name="arrow-left" [size]="16"></lucide-icon> Voltar ao
          Login
        </a>
      </div>
    </app-auth-layout>
  `,
})
export class ForgotPasswordComponent {
  email = '';
  sent = false;
}
