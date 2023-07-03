import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  ngOnInit(): void {
    this.initBoard();
  }

  cellData = {
    enabled: false,
    canDrop: '',
    elements: '',
    color: ''
  }

  cells = new Array(800).fill(null).map(_ => ({ ...this.cellData }));
  cards = Array.from({ length: 10 }, (_, i) => ({ name: `Card ${i + 1}` }));

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  initBoard() {
    let rows = 20;
    let cols = 40;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let index = i * cols + j;
        if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
          this.cells[index].color = 'green';
        } else {
          this.cells[index].color = '';
        }
      }
    }
  }

  droppedElements: any[] = [];

  onDrop(event: CdkDragDrop<any>) {
    const droppedElement = event.item.data;
    const targetIndex = this.droppedElements.length; // Stick to the end of the array
    moveItemInArray(this.droppedElements, event.previousIndex, targetIndex);
    console.log(this.droppedElements);
  } 
  
  
  items = ['Zero', 'One', 'Two', 'Three'];

  onDrop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
