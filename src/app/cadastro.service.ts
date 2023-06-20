import { Cadastro } from './cadastro';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  url = "http://localhost:3000/cadastro";
  constructor(private http : HttpClient) { }

  getCadastro(): Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(this.url);
  }
  salvar(cadastro: Cadastro): Observable<Cadastro>{
    return this.http.post<Cadastro>(this.url, cadastro);
}
  remover(cadastro: Cadastro): Observable<void>{
    return this.http.delete<void>(`${this.url}/${cadastro.id}`);
}
  update(cadastro: Cadastro): Observable<Cadastro>{
    return this.http.put<Cadastro>(`${this.url}/${cadastro.id}`,cadastro);
}

}
