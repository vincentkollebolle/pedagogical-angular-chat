import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChatService } from "../services/chat.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-envoyer-message',
  templateUrl: './envoyer-message.component.html',
  styleUrls: ['./envoyer-message.component.css']
})
export class EnvoyerMessageComponent implements OnInit, OnDestroy {
  message: string = '';
  private subscription!: Subscription;

  constructor(private readonly chatService: ChatService) {}

  ngOnInit(): void {
    this.subscription = this.chatService.pseudoClicked$.subscribe(pseudo => {
      this.addPseudoToMessage(pseudo);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addPseudoToMessage(pseudo: string) {
    // Ajoute le pseudo au début s’il n’est pas déjà présent
    if (!this.message.includes(`@${pseudo}`)) {
      this.message = `@${pseudo} ${this.message}`;
    }
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
