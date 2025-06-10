import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {
  pseudo: string | undefined;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.pseudo = this.authService.getPseudo();
  }

  logout() {
    this.authService.logout();
  }
}
