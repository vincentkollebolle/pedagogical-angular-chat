import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {ChatComponent} from "./chat/chat.component";
import {PseudoComponent} from "./pseudo/pseudo.component";

const routes: Routes = [
  { path: 'login', component: PseudoComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
