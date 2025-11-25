import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LucideAngularModule,
    AuthLayoutComponent,
  ],
  template: `
    <app-auth-layout title="Acesse sua conta">
      <form (submit)="login()" class="space-y-5">
        <div class="space-y-1.5">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
            >
              <lucide-icon name="user" [size]="20"></lucide-icon>
            </div>
            <input
              [(ngModel)]="email"
              name="email"
              type="email"
              placeholder="Email ou Usuário"
              class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
              required
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
            >
              <lucide-icon name="lock" [size]="20"></lucide-icon>
            </div>
            <input
              [(ngModel)]="password"
              name="password"
              type="password"
              placeholder="Senha"
              class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
              required
            />
          </div>
          <div class="text-right">
            <a
              routerLink="/forgot-password"
              class="text-xs text-slate-500 hover:text-blue-600 font-medium transition"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-200 transition transform active:scale-[0.98] text-sm uppercase tracking-wide"
        >
          Entrar
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-slate-100 text-center">
        <p class="text-slate-500 text-sm">
          Não tem uma conta?
          <a
            routerLink="/register"
            class="text-blue-600 font-bold hover:underline cursor-pointer ml-1"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </app-auth-layout>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  private router = inject(Router);

  login() {
    if (this.email && this.password) {
      localStorage.setItem('user_token', 'demo-token');
      this.router.navigate(['/dashboard']);
    }
  }
}
