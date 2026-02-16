import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prev-next',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './prev-next.component.html',
  styleUrl: './prev-next.component.scss'
})
export class PrevNextComponent {
  @Input() prev!: string[];
  @Input() prev_title!: string;
  @Input() next!: string[];
  @Input() next_title!: string;
}
