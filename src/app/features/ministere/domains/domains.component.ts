import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Domains } from '../../../core/models/event.model';
import { MinistereService } from '../../../core/services/ministere.service';

@Component({
  selector: 'app-domains',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {

  domains = signal<Domains[]>([]);

  readonly API_URL = environment.FileUrl;

  constructor(private ministereService: MinistereService) {}

  ngOnInit(): void {
    this.loadDomains();
  }

  loadDomains(): void {
    this.ministereService.getAllDomaines().subscribe({
      next: (response: any) => {

        console.log('Réponse API complète :', response);

        // ✅ On récupère uniquement le tableau
        const content = response?.data?.content ?? [];

        // 🔥 IMPORTANT : toujours un tableau ici
        this.domains.set(content);

        console.log('Domains extraits :', content);
      },
      error: (err) => {
        console.error('Erreur chargement domains :', err);
      }
    });
  }
}