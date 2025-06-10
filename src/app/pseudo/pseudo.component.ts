import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.css']
})
export class PseudoComponent {
  @ViewChild('movingBtn') funnyBtn!: ElementRef;


  pseudo: string | undefined;

  constructor(private readonly authService: AuthService) {
  }

  joinChat() {
    this.authService.login(this.pseudo);
  }

  escape(event: MouseEvent) {
    const btn = this.funnyBtn.nativeElement as HTMLElement;
    const x = Math.random() * window.innerWidth * 0.8;
    const y = Math.random() * window.innerHeight * 0.8;
    btn.style.position = 'absolute';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
  }
}
