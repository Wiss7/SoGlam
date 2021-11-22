import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/contact-us/message.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  messageSubscription: Subscription;
  messages: Message[] = [];
  selectedMessage: Message;
  isLoading: boolean = true;
  @ViewChild('messageDetails') messageDetailsContent: ElementRef;
  constructor(
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.messageSubscription = this.adminService
      .getMessages()
      .subscribe((data) => {
        this.messages = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Message),
            id: e.payload.doc.id,
          };
        });
        this.messages.sort((a, b) => {
          return b.date.toDate() - a.date.toDate();
        });
        this.isLoading = false;
      });
  }

  DeleteMessage(id: string) {
    var answer = window.confirm(
      'Are you sure you want to delete this message?'
    );
    if (answer) {
      this.adminService
        .deleteMessage(id)
        .then((res) => alert('Message Deleted!!'));
    }
  }

  ViewMessage(id: string) {
    this.selectedMessage = this.messages.find((data) => {
      return data.id === id;
    })!;
    this.open(this.messageDetailsContent);
    if (this.selectedMessage.isNew) {
      this.adminService.updateMessage(this.selectedMessage.id!).then(() => {
        this.selectedMessage.isNew = false;
      });
    }
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  ngOnDestroy() {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
