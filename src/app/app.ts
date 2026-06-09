import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { trigger, transition, style, query, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [style({ opacity: 0 }), animate('0.3s ease-out', style({ opacity: 1 }))], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor(private router: Router) {}

  getRouteAnimationData() {
    return this.router.url; // Gera um identificador único para a rota atual
  }
}
