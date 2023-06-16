// md.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-md',
  templateUrl: './md.component.html'
})
export class MdComponent implements OnDestroy {
  @ViewChild('modal') modal: any;

  @Input() title: string = '';
  @Input() hasClose: boolean = true;

  @Output() onOk: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  open() {
    this.modalService.open(this.modal, { windowClass: 'custom-modal' }).result;
  }

  close() {
    this.modalService.dismissAll();
  }
}
