import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Cadastro } from './../cadastro';
import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  cadastro: Cadastro = [];

  formGroupCadastro : FormGroup;

  isEditing: boolean = false;

  constructor(
    private cadastroService: CadastroService,
    private formBuilder: FormBuilder

    ){

      this.formGroupCadastro = formBuilder.group({
        id: [''],
        name:[''],
        email:[''],
        number:[''],
        regiao:[''],
      });
}

ngOnInit(): void {
    this.loadCadastro();
}
loadCadastro(){
  this.cadastroService.getCadastro().subscribe({
    next: (data) => (this.cadastro = data), //next pega os clientes
  });
}
}




