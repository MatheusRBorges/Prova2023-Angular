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

  cadastros: Cadastro[] = [];

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
    next: (data) => (this.cadastros = data), //next pega os clientes
    error: (error) => console.log('Error ao chamar o endpoint' + error),
  });
}

salvar() {
  if (this.isEditing) {
    this.isEditing = false;

    this.cadastroService.update(this.formGroupCadastro.value).subscribe({
      next: () => {
        this.loadCadastro();

        this.formGroupCadastro.reset();
      },
    });
  } else {
    this.cadastroService.salvar(this.formGroupCadastro.value).subscribe({
      next: (data) => {
        this.cadastros.push(data);

        this.formGroupCadastro.reset();
      },
    });
  }
}

remove(Cadastro:Cadastro): void {
  this.cadastroService.remover(Cadastro).subscribe({
    next: () => {
      this.cadastros.splice(this.cadastros.indexOf(Cadastro), 1);
    },
  }); // this.ClientService.removeClient(client).subscribe({ // forma mais facil de entender //   next: () => this.loadClients() // });
}

edit(cadastro:Cadastro): void {
  this.formGroupCadastro.setValue(cadastro);

  this.isEditing = true;
}

}

