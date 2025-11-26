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
        <p class="text-slate-500 text-center text-sm font-medium">
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
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
          />
        </div>

        <button
          (click)="sent = true"
          class="w-full bg-[#243a5f] hover:bg-[#1b2b47] text-white font-bold py-3.5 rounded-full transition transform active:scale-[0.99] text-sm uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
        >
          <span>Enviar Link</span>
          <lucide-icon name="send" [size]="16"></lucide-icon>
        </button>
      </div>

      <ng-template #success>
        <div class="text-center py-4">
          <div
            class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <lucide-icon name="check" [size]="32"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-[#243a5f]">Email Enviado!</h3>
          <p class="text-slate-500 text-sm mt-2">
            Verifique sua caixa de entrada para redefinir sua senha.
          </p>
          <button
            (click)="sent = false"
            class="mt-8 text-[#243a5f] hover:underline text-sm font-bold uppercase tracking-wide"
          >
            Tentar outro email
          </button>
        </div>
      </ng-template>

      <div class="mt-8 pt-6 border-t border-slate-100 text-center">
        <a
          routerLink="/login"
          class="text-slate-500 hover:text-[#243a5f] text-sm font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
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
