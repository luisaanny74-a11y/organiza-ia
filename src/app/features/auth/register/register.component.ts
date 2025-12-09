import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthLayoutComponent,
    LucideAngularModule,
  ],
  template: `
    <app-auth-layout>
      <form class="space-y-4">
        <div class="space-y-1">
          <label
            class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
            >Nome Completo</label
          >
          <input
            type="text"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
            placeholder="Seu nome"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label
              class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
              >Usuário</label
            >
            <input
              type="text"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
              placeholder="@usuario"
            />
          </div>
          <div class="space-y-1">
            <label
              class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
              >Data de Nascimento</label
            >
            <input
              type="date"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label
            class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
            >E-mail</label
          >
          <input
            type="email"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
            placeholder="seu@email.com"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label
              class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
              >Senha</label
            >
            <div class="relative">
              <input
                type="password"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
                placeholder="••••••"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label
              class="text-xs font-bold text-[#243a5f] ml-1 uppercase tracking-wider"
              >Confirmar Senha</label
            >
            <div class="relative">
              <input
                type="password"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg hover:border-[#243a5f] focus:outline-none focus:ring-2 focus:ring-[#243a5f]/30 transition text-[#243a5f]"
                placeholder="••••••"
              />
            </div>
          </div>
        </div>

        <p class="text-xs text-slate-500 leading-tight px-1">
          Mínimo de 8 caracteres, letras maiúsculas, minúsculas e caractere
          especial (&#64;, #).
        </p>

        <div class="flex items-center gap-2 mt-2 px-1">
          <input
            type="checkbox"
            id="terms"
            class="w-4 h-4 text-[#243a5f] border-gray-300 rounded focus:ring-[#243a5f]"
          />
          <label
            for="terms"
            class="text-xs text-slate-600 cursor-pointer select-none"
          >
            Li e aceito os
            <a href="#" class="text-[#243a5f] font-bold hover:underline"
              >termos e condições</a
            >.
          </label>
        </div>

        <button
          type="button"
          class="w-full bg-[#243a5f] hover:bg-[#1b2b47] text-white font-bold py-3.5 rounded-full transition transform active:scale-[0.99] text-sm uppercase tracking-widest shadow-md"
        >
          Cadastrar
        </button>
      </form>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200"></div>
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="px-4 text-slate-400 bg-white">ou cadastre-se com</span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
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
    </app-auth-layout>
  `,
})
export class RegisterComponent {}
