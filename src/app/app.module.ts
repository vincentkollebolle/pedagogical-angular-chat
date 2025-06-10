import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import { PseudoComponent } from './pseudo/pseudo.component';
import { EnvoyerMessageComponent } from './envoyer-message/envoyer-message.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { MessagesComponent } from './messages/messages.component';
import {TriPipe} from "./pipes/tri.pipe";

const config: SocketIoConfig = { url: 'http://formation-angular.dev02.k8s.pole-emploi.intra', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PseudoComponent,
    EnvoyerMessageComponent,
    DeconnexionComponent,
    UtilisateursComponent,
    MessagesComponent,
    TriPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
