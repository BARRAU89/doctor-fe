import { UiService } from 'src/app/services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public ui:UiService) { }


  ngOnInit(): void {
    
  }

}
