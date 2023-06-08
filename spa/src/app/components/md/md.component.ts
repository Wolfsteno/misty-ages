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
  @Input() width: string = '500px';
  @Input() height: string = '300px';
  @Input() hasOk: boolean = true;
  @Input() hasCancel: boolean = true;
  @Input() textOk: string = 'Ok';
  @Input() textCancel: string = 'Cancel';
  @Input() hasClose: boolean = true;
  @Output() onOk: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  onOkClick() {
    this.onOk.emit();
    this.modalService.dismissAll();
  }

  onCancelClick() {
    this.onCancel.emit();
    this.modalService.dismissAll();
  }

  open() {
    this.modalService.open(this.modal, {
      fullscreen: true,
      ariaLabelledBy: 'modal-basic-title'
    }).result;
  }

  close() {
    this.modalService.dismissAll();
  }
}
