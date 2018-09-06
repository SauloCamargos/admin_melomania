import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../../core/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: any;
  game_id: number;
  states: any[];
  f: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.game_id = this.activatedRoute.snapshot.params['id'];
    this.getStates({qtd: -1});

  }

  initForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      name: [null, [Validators.required]],
      state_id: [null, [Validators.required]]
    });
  }

  getGame(id) {
    this.gameService.get(id).subscribe((response) => {
      this.game = response.data;
      this.f.controls['name'].setValue(this.game.name);
      this.f.controls['state_id'].setValue(this.game.state_id);
    });
  }

   getStates(data) {
    this.stateService.getData(data).subscribe((response) =>{
      this.states = response.data;
       if (this.game_id) {
        this.getGame(this.game_id);
      }
    });
  }

  onSubmit() {
    this.gameService.update(this.game_id, this.f.value).subscribe((response) => {
      this.game = response.data;
      alert('Jogo atualizado com sucesso!');
    });
  }

}
