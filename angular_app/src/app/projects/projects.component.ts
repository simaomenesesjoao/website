import { Component, OnInit } from '@angular/core';
import { Constraint, PivotSnippet} from '@simao/js-widgets'; 
import { RouterModule } from '@angular/router';
import { DynamicNavbarService } from '../dynamic-navbar.service';

export async function initPivot3(id: string) {
    const constraints: Constraint[] = [];
    constraints.push(new Constraint({lower: 0, a:  1.0, b: 0.0, upper: undefined, label: "x"}));
    constraints.push(new Constraint({lower: 0, a:  0.0, b: 1.0, upper: undefined, label: "y"}));
    constraints.push(new Constraint({lower: 3.0, a: 1.0, b: 1.0, upper: undefined, label: "s₁"}));
    constraints.push(new Constraint({lower: undefined, a: 1.0, b: 1.0, upper: 9.0, label: "s₂"}));

    const snippet = new PivotSnippet({
        container: document.getElementById(id)!,
        width: 300,
        height: 300,
        app_width: 300,
        constraints: constraints, 
        costFunction: [1.0, 2.0],
        showMatrix: null,
        showCoords: null,
        topRightCoord: {x: 10.0, y: 10.0},
        botLeftCoord: {x: -1.0, y: -1.0}
    });

    await snippet.init();
    return { constraints, snippet };
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  
  constructor(
    private navbarService: DynamicNavbarService
  ){}

  ngOnInit(){
    this.navbarService.setTitle("Projects");
    initPivot3('pivot3');
  }
}
