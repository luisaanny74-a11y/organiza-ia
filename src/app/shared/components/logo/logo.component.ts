import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center gap-2">
      <img
        src="assets/logo.png"
        alt="Organiza.ia Logo"
        class="filter drop-shadow-md transition-all duration-300 dark:brightness-0 dark:invert"
        [ngClass]="large ? 'h-24 w-auto' : 'h-12 w-auto'"
      />
      <span
        *ngIf="showText"
        class="font-bold text-2xl tracking-tighter text-[#263b63] dark:text-white drop-shadow-sm"
      >
        Organiza.ia
      </span>
    </div>
  `,
})
export class LogoComponent {
  @Input() showText = true;
  @Input() large = false;
}
