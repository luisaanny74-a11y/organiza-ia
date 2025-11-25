import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AuthLayoutComponent,
    LucideAngularModule,
  ],
  template: `
    <app-auth-layout title="Crie sua conta">
      <form class="space-y-4">
        <!-- Campo Nome -->
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
          >
            <lucide-icon name="user" [size]="20"></lucide-icon>
          </div>
          <input
            type="text"
            placeholder="Nome Completo"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Campo Email -->
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
          >
            <lucide-icon name="mail" [size]="20"></lucide-icon>
          </div>
          <input
            type="email"
            placeholder="Email"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Campo Senha -->
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
          >
            <lucide-icon name="lock" [size]="20"></lucide-icon>
          </div>
          <input
            type="password"
            placeholder="Senha"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        <!-- Botão Cadastrar -->
        <button
          type="button"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-200 transition mt-4 text-sm uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <span>Cadastrar</span>
          <lucide-icon name="arrow-right" [size]="18"></lucide-icon>
        </button>
      </form>

      <!-- Rodapé -->
      <div class="mt-6 text-center text-sm pt-4 border-t border-slate-100">
        <span class="text-slate-500">Já possui conta?</span>
        <a
          routerLink="/login"
          class="text-blue-600 font-bold hover:underline ml-1 cursor-pointer"
          >Faça Login</a
        >
      </div>
    </app-auth-layout>
  `,
})
export class RegisterComponent {}
