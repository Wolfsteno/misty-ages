import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToolsService } from 'src/app-core/tools.service';
import { MdComponent } from '../md/md.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class AppComponent {
  brownCards: number[]; // Array to hold the number of brown cards
  blueCards: number[]; // Array to hold the number of blue cards
  goldCards: number[]; // Array to hold the number of gold cards

  constructor(private dialog: MatDialog, private tools: ToolsService) {
    this.brownCards = Array(4).fill(0);
    this.blueCards = Array(4).fill(0);
    this.goldCards = Array(5).fill(0);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(MdComponent, {
      // Add any configuration options for the modal here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }
  
}
