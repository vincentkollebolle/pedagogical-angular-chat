import {Component} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  konamiCode: string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  showEasterEgg = false;

  keysPressed: string[] = [];

  ngOnInit() {
    window.addEventListener('keydown', this.handleKonamiCode.bind(this));
  }

  handleKonamiCode(event: KeyboardEvent) {
    this.keysPressed.push(event.key);

    // Garde seulement les dernières n touches
    if (this.keysPressed.length > this.konamiCode.length) {
      this.keysPressed.shift();
    }

    // Compare
    if (this.keysPressed.join('') === this.konamiCode.join('')) {
      this.triggerEasterEgg();
      this.keysPressed = []; // Reset
    }
  }

  triggerEasterEgg() {
    this.showEasterEgg = true;
    setTimeout(() => this.showEasterEgg = false, 3000);
  }
}
