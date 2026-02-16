import { Component, OnInit } from '@angular/core';
import { DynamicNavbarService } from '../dynamic-navbar.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {

  constructor(private navbarService: DynamicNavbarService){}
  ngOnInit(): void {
    this.navbarService.setTitle("About Me");
  }
}
