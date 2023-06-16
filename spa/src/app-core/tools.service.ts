import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MdComponent } from 'src/app/components/md/md.component';

@Injectable()
export class ToolsService {

  constructor(private dialog: MatDialog) { }

  openMd(): void {
    this.dialog.open(MdComponent, {
      panelClass: 'custom-dialog'
    });
  }
}
