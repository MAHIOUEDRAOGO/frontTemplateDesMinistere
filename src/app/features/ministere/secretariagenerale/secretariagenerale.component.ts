import { Component, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MinistereService } from '../../../core/services/ministere.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-secretariagenerale',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass],
  templateUrl: './secretariagenerale.component.html',
  styleUrls: ['./secretariagenerale.component.scss']
})
export class SecretariageneraleComponent {
  private readonly API_URL = environment.FileUrl;

  structures = signal<any[]>([]);
  loading = signal(true);
  openIndex: number | null = null;

  constructor(private ministereService: MinistereService) {}

  ngOnInit(): void {
    this.loadSecretariat();
  }

  loadSecretariat(): void {
    this.loading.set(true);
    this.ministereService.getAlltruc().subscribe({
      next: (response: any) => {
        const all = response.data.content || [];
        const secretariat = all.filter((s: any) =>
          s.structureType === 'SECRETARIAT' ||
          s.structureType === 'DIRECTION_GENERALE' ||
          s.structureType === 'DIRECTION'
        );
        this.structures.set(secretariat);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Erreur chargement secrétariat', err);
        this.loading.set(false);
      }
    });
  }

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  getImageUrl(path?: string): string | null {
    return path ? this.API_URL + path : null;
  }
}