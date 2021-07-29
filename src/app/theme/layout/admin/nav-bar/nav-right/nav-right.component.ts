import { PerfilEnfermeiroComponent } from './../../../../../pages/usuarios/perfil-enfermeiro/perfil-enfermeiro.component';
import { PerfilAdminComponent } from './../../../../../pages/usuarios/perfil-admin/perfil-admin.component';
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
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


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
  jwtHelper: JwtHelperService = new JwtHelperService();
  public matricula: string;
  MODALOPTIONS: NgbModalOptions = { keyboard: true, size: 'lg', backdrop: 'static' };
  constructor(private authService: AuthService, public modalService: NgbModal,
    private router: Router, private storage: StorageService, private usuarioService: UsuarioService) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.matricula = this.jwtHelper.decodeToken(this.storage.getLocalUser().token).sub.substring(13);
    if (this.matricula) {
      this.usuarioService.getUsuarioByMatricula(this.matricula)
        .subscribe(response => {
          this.usuario = response as Usuario;
        }, error => {
        }
        );
    }
  }
  redirecionaPerfil(usuario: Usuario) {
    console.log (this.usuario.perfil);
    console.log (this.usuario.perfil == 'Administrador');
    if (this.usuario.perfil == 'Administrador') {
      const modalRef = this.modalService.open(PerfilAdminComponent, this.MODALOPTIONS);
      modalRef.componentInstance.usuario = usuario;
    }
    else {
      const modalRef = this.modalService.open(PerfilEnfermeiroComponent, this.MODALOPTIONS);
      modalRef.componentInstance.usuario = usuario;
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
