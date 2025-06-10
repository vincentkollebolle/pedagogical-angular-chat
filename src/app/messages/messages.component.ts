import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from "../models/message.model";
import {ChatService} from "../services/chat.service";
import {Type} from "../enums/type.enums";
import {AuthService} from "../services/auth.service";
declare var confetti: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  messages: Message[] = [];
  currentUserPseudo: string | undefined;

  @ViewChild('messagesContainer') private readonly messagesContainer!: ElementRef;

  constructor(private readonly chatService: ChatService, private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.currentUserPseudo = this.authService.getPseudo();
    this.chatService.messages$.subscribe((messages: Message[]) => this.messages = messages);
    this.chatService.getMessages().subscribe((message: Message) => {
      this.messages.push(message)
      if (message.message.includes('wizz')) {
        this.shakeScreen();
      }
      if (message.message.includes('spam')) {
        this.chatService.switchSpam();
      }
      if(message.message.includes('tada')) {
        this.playConfetti();
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const el = this.messagesContainer?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  shakeScreen() {
    const body = document.querySelector('body');
    if (!body) return;

    body.classList.add('shake');

    // Retire la classe après l'animation pour pouvoir la rejouer plus tard
    setTimeout(() => {
      body.classList.remove('shake');
    }, 500); // doit correspondre à la durée de l'animation
  }

  onPseudoClick(pseudo: string) {
    this.chatService.pseudoClicked(pseudo);
  }

  playConfetti() {
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 }
    });
  }

  shouldShowPseudo(index: number): boolean {
    const current = this.messages[index];
    if (current.type === Type.System) return false;

    for (let i = index - 1; i >= 0; i--) {
      const previous = this.messages[i];
      if (previous.type === Type.System) continue;
      return previous.pseudo !== current.pseudo;
    }

    // Aucun précédent non système
    return true;
  }

  protected readonly Type = Type;
}
