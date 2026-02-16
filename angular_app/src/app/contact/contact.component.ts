import { Component, OnInit } from '@angular/core';
import { DynamicNavbarService } from '../dynamic-navbar.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(
    private navbarService: DynamicNavbarService
  ) {}

  ngOnInit(){
    this.navbarService.setTitle("Contacts")

  }

}
