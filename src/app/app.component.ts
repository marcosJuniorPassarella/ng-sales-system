import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-sales-system';

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
      matchAll: 'Corresponder a todos',
      matchAny: 'Corresponder a qualquer',
      apply: 'Aplicar',
      clear: 'Limpar',
      cancel: 'Cancelar',
      removeRule: 'Remover regra',
      addRule: 'Adicionar regra',
      startsWith: 'Começa com'
    })
  }
}
