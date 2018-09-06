import { StateService } from './../../../core/services/state.service';
import { Router } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  f: FormGroup;
  states: any[];
  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private stateService: StateService,
    private router: Router
  ) { }


  ngOnInit() {
    this.initForm();
    this.getStates({qtd: -1});
  }

  initForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      name: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
    });
  }

  getStates(data) {
    this.stateService.getData(data).subscribe((response) =>{
      this.states = response.data;
    });
  }

  onSubmit() {
    this.gameService.create(this.f.value).subscribe((response) => {
      alert('Jogo criado com sucesso!');
      this.router.navigate(['/admin/games/', response.data.id]);
    });
  }

}
