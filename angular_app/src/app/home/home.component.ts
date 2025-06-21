import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
