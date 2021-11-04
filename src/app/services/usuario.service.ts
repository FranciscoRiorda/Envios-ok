import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargarUsuario.interface';
import { Usuario } from '../models/usuario.model';

// Hacemos las conexiones del frontend con el backend

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  public tipo!: 'usuarios';
  public id!: string;
  public img!: string;
  
  constructor(private http: HttpClient,
              private router: Router) { }



    guardarLocalStorage( token: string, menu: any) {
      localStorage.setItem('token', token);
      localStorage.setItem('menu', JSON.stringify(menu));
    }
    
    
    login (formData: LoginForm ) {
      
      return this.http.post(`${base_url}/login`, formData)
      .pipe(
        //tap recibe lo que responda la petición.
        tap((resp: any) => {
          //grabar en local storage
          this.guardarLocalStorage(resp.token, resp.menu);
        })
        )
        
      }

      
    logout () {
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        this.router.navigateByUrl('/login');
      }


      //Validamos el token para proteger las rutas y nadie pueda ingresar desde el url.      
    validarToken(): Observable<boolean> {
      //Obtenemos el token desde el local storage y sino no hay, recibe un vacío ''
      const token = localStorage.getItem('token') || '';
        
      //Para renovar el token, es necesario tener un token válido. De esta forma validamos que sea un usuario habilitado quien ingrese.
      return this.http.get(`${base_url}/login/renovar`, {
        headers: {
          'x-token': token
        }
      }).pipe(
        map((resp: any) => {
          //optimización de código que no entendí
          const {nombre, apellido, dni, telefono, email, domicilio, nacimiento, role, img = '', uid} = resp.usuario;
          this.usuario = new Usuario(nombre, apellido, dni, telefono, email, domicilio, nacimiento, '', img, role, uid);
  
          this.guardarLocalStorage(resp.token, resp.menu);

          return true;
        }),
        //'map' >> tasnformar el valor en uno booleano. True o false. Con map lo hago. Si es exitoso > true, sino false. Para que permita el acceso
        //manejar el error que nos da al no tener el token. El of permite crear un observable nuevo con el valor de 'false' y no repomer el ciclo.
        catchError(error => of(false))
      );
  }
          
    crearUsuario (formData: RegisterForm) {
      
      return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        //tap recibe lo que responda la petición.
        tap((resp: any) => {
        //grabar en local storage
        this.guardarLocalStorage(resp.token, resp.menu);
      })
      )
    }

    crearUsuario2 (formData: RegisterForm) {
      
      return this.http.post(`${base_url}/usuarios`, formData);
    }

    get token(): string {
      return localStorage.getItem('token') || '';
    }
    
    get  uid(): string {
      return this.usuario?.uid || '';
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
      return this.usuario.role!
    };

    actualizarPerfil(data: {nombre: string, apellido: string, dni: string, telefono: string, email: string, domicilio: string, nacimiento: string, role: any}){

      data = {
        ...data,
        role: this.usuario.role
      }

      const token = localStorage.getItem('token') || '';
      
      return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
        headers: {
          'x-token': token
        }
      });

    }

    actualizarUsuario(usuario: Usuario){

      const url = `${base_url}/usuarios/${usuario.uid}`;
      return this.http.put(url, usuario, this.headers)

    }

    actualizarClave(usuario: Usuario){

      const url = `${base_url}/usuarios/claves/${usuario.uid}`;
      return this.http.put(url, usuario, this.headers)

    }

    cargarUsuario(desde: number = 0) {
      
      const url = `${base_url}/usuarios?desde=${desde}`;
      return this.http.get<CargarUsuario>(url, this.headers)
        .pipe(
          map( resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre, user.apellido, user.dni, user.telefono, user.email, user.domicilio, user.nacimiento, user.password, user.img, user.role, user.uid)).sort(function(a, b) {if (a.apellido > b.apellido) {return 1;} if (a.apellido < b.apellido) {return -1;} return 0;});
            
            return {
              total: resp.total,
              usuarios
            };
          })
        )
    }

    obtenerUsuarioPorId( uid: string ) {

      const url = `${ base_url }/usuarios/${ uid }`;
      return this.http.get( url, this.headers )
        .pipe(
          map((resp: any) => resp.usuario)
        );
                
    }

  eliminarUsuario(usuario: Usuario) {
    
    const url = `${base_url}/usuarios/${usuario.uid  }`;
      return this.http.delete( url, this.headers);
  }


  guardarUsuario(usuario: Usuario){

    const token = localStorage.getItem('token') || '';
    
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

  abrirPerfilUsuario(
    tipo: 'usuarios',
    id: string,
    img: string = 'no-img'
  ) {
    this.tipo = tipo;
    this.id = id;
    this.img = `${base_url}/uploads/${tipo}/${img}`;
    console.log(this.id);
  }


 }
