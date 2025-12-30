import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { ApiService } from '../../../services/api.service';

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
          <label class="text-xs font-bold text-[#243a5f] dark:text-blue-200 ml-1 uppercase tracking-wider">E-mail ou Usuário</label>
          <div class="relative">
            <input
              [(ngModel)]="email"
              name="email"
              type="email"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f] dark:text-white"
              required
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-[#243a5f] dark:text-blue-200 ml-1 uppercase tracking-wider">Senha</label>
          <div class="relative">
            <input
              [(ngModel)]="password"
              name="password"
              type="password"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f] dark:text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-[#243a5f] hover:bg-[#1a2a4a] text-white font-bold py-3.5 rounded-full transition transform active:scale-[0.99] text-sm uppercase tracking-widest shadow-md mt-2"
        >
          Entrar
        </button>

        <div class="text-center mt-8 pt-4 border-t border-slate-100">
          <p class="text-slate-500 text-sm mb-3">Não tem uma conta?</p>
          <a routerLink="/register" class="text-[#243a5f] font-bold text-base hover:underline uppercase">INSCREVER-SE</a>
        </div>
      </form>
    </app-auth-layout>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  
  private router = inject(Router);
  private apiService = inject(ApiService);

  async login() {
    if (this.email && this.password) {
      try {
        const response = await this.apiService.login({
          email: this.email,
          password: this.password
        });

        console.log('Sucesso:', response);

        if (response.token) {
          localStorage.setItem('user_token', response.token);
        }

        if (response.user && response.user.name) {
          localStorage.setItem('user_name', response.user.name);
        }

        this.router.navigate(['/dashboard']);
        
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Usuário ou senha inválidos. Tente novamente!');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }
}