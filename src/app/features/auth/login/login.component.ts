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
    <app-auth-layout>
      <form (submit)="login()" class="space-y-5">
        <div class="space-y-1">
          <label
            class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
            >E-mail ou Usuário</label
          >
          <div class="relative">
            <input
              [(ngModel)]="email"
              name="email"
              type="email"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
              required
            />
          </div>
        </div>

        <div class="space-y-1">
          <label
            class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
            >Senha</label
          >
          <div class="relative">
            <input
              [(ngModel)]="password"
              name="password"
              type="password"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
              required
            />
            <button
              type="button"
              class="absolute right-3 top-3 text-slate-400 hover:text-[#243a5f]"
            >
              <lucide-icon name="eye-off" [size]="20"></lucide-icon>
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-[#243a5f] hover:bg-[#1a2a4a] text-white font-bold py-3.5 rounded-full transition transform active:scale-[0.99] text-sm uppercase tracking-widest shadow-md mt-2"
        >
          Entrar
        </button>

        <div class="text-center pt-2">
          <a
            routerLink="/forgot-password"
            class="text-sm font-bold text-[#243a5f] hover:underline cursor-pointer"
          >
            ESQUECEU SUA SENHA?
          </a>
        </div>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200"></div>
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="px-4 text-slate-400 bg-white">ou</span>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button class="social-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          <span>Continuar com o Google</span>
        </button>

        <button class="social-btn">
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
          />
          <span>Continuar com o Facebook</span>
        </button>

        <button class="social-btn">
          <img src="assets/apple.jpg" alt="Apple" />
          <span>Continuar com a Apple</span>
        </button>
      </div>

      <div class="text-center mt-8 pt-4 border-t border-slate-100">
        <p class="text-slate-500 text-sm mb-3">Não tem uma conta?</p>
        <a
          routerLink="/register"
          class="text-[#243a5f] font-bold text-base hover:underline uppercase tracking-wide cursor-pointer"
        >
          INSCREVER-SE
        </a>
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
