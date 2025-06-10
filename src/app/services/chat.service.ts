import {Injectable} from '@angular/core';
import {filter, Subject} from 'rxjs';
import {Message} from "../models/message.model";
import {Type} from "../enums/type.enums";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private spam: boolean = false;
  private users: string[] = [];
  private messages: Message[] = [];
  private readonly pseudoClickedSource = new Subject<string>();
  pseudoClicked$ = this.pseudoClickedSource.asObservable();
  usersMuted: string[] = [];

  // Observables pour émettre les données
  readonly users$ = new Subject<string[]>();
  readonly messages$ = new Subject<Message[]>();
  readonly socketConnectionOK$ = new Subject<boolean>();

  phrases = [
    "Mais vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation…",
    "Il est où mon balcon ? Il est où mon balcon ?!",
    "Et je veux un palais, un très beau palais, avec des colonnes... beaucoup de colonnes !",
    "Je suis venu, j’ai vu, j’ai... pas compris.",
    "Ils sont fous ces Romains !",
    "C’est moi Brutus ! Brutus ! … Et je vais vous Bruter !",
    "Tu bluffes Martoni !",
    "Quand y’en a marre, y’a Malabar !",
    "Vous avez de la pâte ? Vous avez du sucre ? Alors avec la pâte vous faites une crêpe et vous mettez du sucre dessus !",
    "C’est une bonne situation ça scribe ?",
    "C’est pas une voiture, c’est un avion !",
    "Je conduis, tu fais la sirène.",
    "J'aime pas quand ça tourne pas rond.",
    "J’vous signale qu’on n’est pas à Daytona ici !",
    "Je suis pressé, j’ai des livraisons à faire.",
    "J’ai pas le permis, moi !",
    "C’est pas la police, c’est les tocards de la brigade des moustachus !",
    "Vous m’avez pris pour Schumacher ?",
    "Freinez, freinez bordel !!!",
    "C’est qui ce Schumacher ? Il est bon, ce mec !",
    "Mais vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation…",
    "C’est que de la voiture, mec !",
    "T’as pas une gueule de porte-bonheur.",
    "Le monde se divise en deux catégories...",
    "On ne devrait jamais quitter Montauban.",
    "J’aime l’odeur du napalm au petit matin.",
    "Ça va, je gère !",
    "Je suis ton père.",
    "Mais qu’est-ce que c’est que ce binz ?",
    "Il est l’or, Monseignor !",
    "Les cons, ça ose tout. C’est même à ça qu’on les reconnaît.",
    "T’as le bonjour d’Albert.",
    "Quand faut y aller, faut y aller.",
    "Ça dépend, ça dépasse.",
    "Je t’avais prévenue, j’ai pas le temps maintenant !",
    "Hakuna Matata !",
    "Vers l’infini et au-delà !",
    "Libérée, délivrée !",
    "Je suis ton ami, tu peux compter sur moi.",
    "Rien que l’essentiel, petite fleur d’Orient.",
    "C’est l’heure… de mourir !",
    "Ohana signifie famille. Famille signifie que personne ne doit être abandonné, ni oublié.",
    "Je voudrais déjà être roi !",
    "Soyez prêtes !",
    "Il en faut peu pour être heureux.",
    "Tout le monde veut devenir un cat !",
    "Miroir, mon beau miroir, qui est la plus belle de tout le royaume ?",
    "Je suis une princesse, j’ai du pouvoir !",
    "Un grand pouvoir implique de grandes responsabilités... ah non, ça c’est l’autre studio.",
    "Ce n’est pas parce qu’on est petit qu’on ne peut pas être grand !"
  ];

  constructor(private readonly socket: Socket) {
  }

  // Initialiser les écouteurs de socket
  private initializeSocketListeners() {
    this.socket.on('allUsers', (users: string[]) => {
      this.users = users;
      this.users$.next(this.users);
    });

    this.socket.on('newUser', (data: { pseudo: string }) => {
      if (!this.usersMuted.includes(data.pseudo)) {
        this.messages.push({pseudo: data.pseudo, message: ` a rejoint le chat.`, type: Type.System});
        this.messages$.next(this.messages);
      }
    });

    this.socket.on('logout', (data: { pseudo: string }) => {
      if (!this.usersMuted.includes(data.pseudo)) {
        this.messages.push({pseudo: data.pseudo, message: ` a quitté le chat.`, type: Type.System});
        this.messages$.next(this.messages);
      }
    });

    this.socket.on('connect_error', () => {
      this.socketConnectionOK$.next(false);
    });

    this.socket.on('disconnect', () => {
      this.socketConnectionOK$.next(false);
    });


    setInterval(() => {
      if (this.spam) {
        const random = Math.floor(Math.random() * this.phrases.length);
        const message = this.phrases[random];
        this.sendMessage(message);
      }
    }, Math.floor(Math.random() * 10000) + 1);
  }

  // Méthode pour rejoindre le chat
  joinChat(pseudo: string) {
    this.socketConnectionOK$.next(true);
    this.initializeSocketListeners();
    if (pseudo) {
      this.socket.emit('newUser', pseudo);
    }
  }

  // Méthode pour envoyer un message
  sendMessage(message: string) {
    if (message) {
      this.socket.emit('message', message);
    }
  }

  // Méthode pour se déconnecter
  logout() {
    this.socket.emit('logout', 'Au revoir!');
    this.socket.disconnect();
    this.messages = [];
  }

  getMessages() {
    return this.socket.fromEvent<Message>('message')
      .pipe(filter(data => !this.usersMuted.includes(data.pseudo)));
  }

  switchSpam() {
    this.spam = !this.spam;
  }

  pseudoClicked(pseudo: string) {
    this.pseudoClickedSource.next(pseudo);
  }
}
