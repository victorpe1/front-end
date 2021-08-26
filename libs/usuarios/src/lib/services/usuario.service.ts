import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

import * as countriesLib from 'i18n-iso-countries';
declare const require: any;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  apiURLUsuarios = environment.apiUrl + 'usuarios';

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiURLUsuarios);
  }

  getUsuario(usuarioId: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURLUsuarios}/${usuarioId}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURLUsuarios, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiURLUsuarios}/${usuario.id}`, usuario);
  }

  deleteUsuario(usuarioId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsuarios}/${usuarioId}`);
  }

  getPaises(): { id: string; nombre: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        nombre: entry[1]
      };
    });
  }

  getCantUsuario(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsuarios}/get/cant`)
      .pipe(map((objeto: any) => objeto.contUsuarios));
  }

  getPais(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

}