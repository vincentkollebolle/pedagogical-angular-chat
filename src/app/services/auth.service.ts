import { Injectable } from '@angular/core';
import {ChatService} from "./chat.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean  | undefined;
  private pseudo: string | undefined;

  constructor(private readonly  chatService: ChatService, private readonly router: Router) {
    this.chatService.socketConnectionOK$.subscribe((isAuthenticated) => { this.isAuthenticated = isAuthenticated.valueOf()});
  }

  login(pseudo: string | undefined) {
    if(pseudo) {
      this.pseudo = pseudo;
      this.chatService.joinChat(pseudo);
      this.router.navigate(['/chat']); // Redirection vers /chat
    }
  }

  logout() {
    this.chatService.logout();
    this.router.navigate(['/login']); // Redirection vers /chat
  }

  isLoggedIn(): boolean {
    if(this.isAuthenticated) {
      return this.isAuthenticated;
    }
    return false;
  }

  getPseudo(): string | undefined {
    return this.pseudo;
  }
}
