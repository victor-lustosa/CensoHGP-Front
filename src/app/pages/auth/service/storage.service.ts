import { Injectable } from "@angular/core";
import { LocalUser } from '../model/local_user';
import { STORAGE_KEYS } from './storage_keys.config';


@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usuario = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usuario == null) {
            return null;
        }
        else {
            return JSON.parse(usuario);
        }
    }

    setLocalUser(usuario : LocalUser) {
        if (usuario == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(usuario));
        }
    }
}
