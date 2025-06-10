import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  users: string[] = [];
  pseudo: string | undefined;

  constructor(private readonly authService: AuthService, private readonly chatService: ChatService) {
  }

  ngOnInit() {
    this.pseudo = this.authService.getPseudo();
    this.chatService.users$.subscribe((users: string[]) => this.users = users);
  }

  muteUser(user: string) {
    if(this.isUserMuted(user)) {
      this.chatService.usersMuted = this.chatService.usersMuted.filter(u => u !== user);
    } else {
      this.chatService.usersMuted.push(user);
    }
  }

  isUserMuted(user: string): boolean {
    return this.chatService.usersMuted.includes(user);
  }

  onPseudoClick(pseudo: string) {
    this.chatService.pseudoClicked(pseudo);
  }
}
