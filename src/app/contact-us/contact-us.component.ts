import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  @ViewChild('f') MessageForm: NgForm;
  @ViewChild('content') successContent: ElementRef;
  @ViewChild('errorContent') errorContent: ElementRef;
  isSendingMessage = false;
  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {}

  SendMessage() {
    this.isSendingMessage = true;
    let msgData: Message = new Message(
      this.MessageForm.value.name,
      this.MessageForm.value.email,
      this.MessageForm.value.phone,
      this.MessageForm.value.message,
      true
    );

    this.http
      .post<Message>(
        'https://soglamapp-48bfe-default-rtdb.firebaseio.com/Messages.json',
        msgData
      )
      .subscribe(
        (responseData) => {
          this.isSendingMessage = false;
          this.MessageForm.reset();
          this.open(this.successContent);
        },
        (error) => {
          this.isSendingMessage = false;
          this.open(this.errorContent);
        }
      );
  }
  closeResult = '';
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
