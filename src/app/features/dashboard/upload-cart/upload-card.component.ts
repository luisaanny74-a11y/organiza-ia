import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-upload-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="bg-white dark:bg-black rounded-xl shadow-lg p-6 md:p-8 border-2 border-slate-200/50 dark:border-gray-800 transition-colors duration-300"
    >
      <div class="flex items-center gap-2 mb-6">
        <lucide-icon
          name="upload-cloud"
          [size]="20"
          class="text-brand-blue dark:text-white"
        ></lucide-icon>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white">
          Upload de Faturas
        </h2>
      </div>

      <div
        class="border-2 border-dashed border-[#243a5f]/30 dark:border-gray-600 rounded-lg p-12 text-center bg-slate-50 dark:bg-gray-900 transition duration-300 hover:border-brand-blue dark:hover:border-white hover:bg-[#243a5f]/5 dark:hover:bg-gray-800 group cursor-pointer"
        (click)="triggerFileInput()"
      >
        <lucide-icon
          name="upload-cloud"
          [size]="40"
          class="text-brand-blue/50 dark:text-gray-400 mx-auto mb-4 group-hover:text-brand-blue dark:group-hover:text-white transition-colors"
        ></lucide-icon>
        <p class="text-lg font-semibold text-slate-700 dark:text-gray-200">
          Arraste e solte suas faturas aqui
        </p>
        <p class="text-sm text-slate-500 dark:text-gray-400 mt-1">
          Ou clique para selecionar arquivos
        </p>
        <p class="text-xs text-slate-400 dark:text-gray-500 mt-2">
          Suporte para PDF, JPG, PNG • Máximo 10MB por arquivo
        </p>

        <input
          #fileInput
          type="file"
          class="hidden"
          (change)="onFileSelected($event)"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <button
          (click)="$event.stopPropagation(); triggerFileInput()"
          class="mt-6 bg-brand-blue hover:bg-[#1b2b47] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition transform active:scale-[0.98] text-sm shadow-md"
        >
          Selecionar Arquivos
        </button>
      </div>

      <div class="mt-8 grid grid-cols-3 gap-4 text-center">
        <div
          class="p-4 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer transition group"
        >
          <lucide-icon
            name="smartphone"
            [size]="20"
            class="text-slate-600 dark:text-gray-400 group-hover:text-brand-blue dark:group-hover:text-white mx-auto mb-2 transition-colors"
          ></lucide-icon>
          <p class="text-sm font-medium text-slate-700 dark:text-gray-300">
            Do Celular
          </p>
        </div>
        <div
          class="p-4 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer transition group"
        >
          <lucide-icon
            name="cloud-download"
            [size]="20"
            class="text-slate-600 dark:text-gray-400 group-hover:text-brand-blue dark:group-hover:text-white mx-auto mb-2 transition-colors"
          ></lucide-icon>
          <p class="text-sm font-medium text-slate-700 dark:text-gray-300">
            Google Drive
          </p>
        </div>
        <div
          class="p-4 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer transition group"
        >
          <lucide-icon
            name="folder-open"
            [size]="20"
            class="text-slate-600 dark:text-gray-400 group-hover:text-brand-blue dark:group-hover:text-white mx-auto mb-2 transition-colors"
          ></lucide-icon>
          <p class="text-sm font-medium text-slate-700 dark:text-gray-300">
            Computador
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .text-brand-blue {
        color: #263b63;
      }
      .bg-brand-blue {
        background-color: #263b63;
      }
      .hover\\:border-brand-blue:hover {
        border-color: #263b63;
      }
    `,
  ],
})
export class UploadCardComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileUploaded.emit(file);
      input.value = '';
    }
  }
}
