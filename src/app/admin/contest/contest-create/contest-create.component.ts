import { GameService } from './../../../core/services/game.service';
import { ContestService } from './../../../core/services/contest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.css']
})
export class ContestCreateComponent implements OnInit {
  games: any[];
  f: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private contestService: ContestService,
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.getGames({qtd: -1})
  }

  initForm() {
    this.f = undefined;
    this.f = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      admin_tax: [null, [Validators.required]],
      game_id: [null, [Validators.required]],
      draw_date: [null, [Validators.required]],
    });
  }

  getGames(data){
    this.gameService.getData(data).subscribe((response) => {
      this.games = response.data;
    });
  }

  onSubmit() {
    this.contestService.create(this.f.value).subscribe((response) => {
      alert('Concurso criado com sucesso!');
      this.router.navigate(['/admin/contests/', response.data.id]);
    });
  }

}
