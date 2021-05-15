import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { GradientConfig } from '../../../../../app-config';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/pages/const';
import { StorageService } from 'src/app/pages/auth/service/storage.service';
import { UsuarioService } from 'src/app/pages/usuarios/service/usuario.service';
import { Usuario } from 'src/app/pages/usuarios/model/usuario';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public gradientConfig: any;
  public routers: typeof routes = routes;
  public usuario: Usuario;

  constructor(private authService: AuthService,
    private router: Router, private storage: StorageService, private usuarioService: UsuarioService) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.matricula) {
      this.usuarioService.getUsuarioByMatricula(localUser.matricula)
        .subscribe(response => {
          this.usuario = response as Usuario;
        }, error => {
        }
        );
    }
  }
  onChatToggle(friendID: boolean) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
  logout() {
    this.authService.logout();
    this.router.navigate([this.routers.LOGIN]).then();
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('elite-rtl')) {
      this.gradientConfig['rtl-layout'] = true;
    } else {
      this.gradientConfig['rtl-layout'] = false;
    }
  }
}
