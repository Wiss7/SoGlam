import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
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
  constructor(
    private firestore: AngularFirestore,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  SendMessage() {
    this.isSendingMessage = true;
    let msgData: Message = new Message(
      this.MessageForm.value.name,
      this.MessageForm.value.email,
      this.MessageForm.value.phone,
      this.MessageForm.value.message,
      true,
      new Date(),
      ''
    );
    this.firestore
      .collection('Messages')
      .add(Object.assign({}, msgData))
      .then(
        (responseData) => {
          this.isSendingMessage = false;
          this.MessageForm.reset();
          this.open(this.successContent);
        },
        (error) => {
          this.open(this.errorContent);
        }
      );
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
