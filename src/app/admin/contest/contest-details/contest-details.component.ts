import { LotteryService } from './../../../core/services/lottery.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContestService } from '../../../core/services/contest.service';
import { GameService } from '../../../core/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var bootbox: any;
declare var toastr: any;
declare var moment: any;

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.css']
})
export class ContestDetailsComponent implements OnInit {

  games: any[];
  contest_id: number;
  contest: any;
  editing: boolean;
  f: FormGroup;
  fLotterie: FormGroup;
  modalLottery: any;
  currentLottery: any;
  constructor(
    private formBuilder: FormBuilder,
    private contestService: ContestService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private lotteryService: LotteryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.editing = false;
    this.initForm();
    this.initFormAddLotterie();
    this.contest_id = this.activatedRoute.snapshot.params['id'];
    if (this.contest_id) {
      this.getContest(this.contest_id);
    }
    this.getGames({qtd: -1});
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

  initFormAddLotterie() {
    this.fLotterie = undefined;
    this.fLotterie = this.formBuilder.group({
      name: [null, [Validators.required]],
      hit: [null, [Validators.required]]
    });
  }

  toggleEditing() {
    this.editing = !this.editing;

    if (this.editing === false) {
      this.f.controls['name'].setValue(this.contest.name);
      this.f.controls['price'].setValue(this.contest.price);
      this.f.controls['admin_tax'].setValue(this.contest.admin_tax);
      this.f.controls['game_id'].setValue(this.contest.game_id);
      const draw_date = moment(this.contest.draw_date).format('YYYY-MM-DD\THH:mm');
      this.f.controls['draw_date'].setValue(draw_date);
    }

  }

  getGames(data) {
    this.gameService.getData(data).subscribe((response) => {
      this.games = response.data;
    });
  }

  getContest(id) {
    this.contestService.get(id).subscribe((response) => {
      this.contest = response.data;
      this.getContestLotteries(this.contest.id);
      this.f.controls['name'].setValue(this.contest.name);
      this.f.controls['price'].setValue(this.contest.price);
      this.f.controls['admin_tax'].setValue(this.contest.admin_tax);
      this.f.controls['game_id'].setValue(this.contest.game_id);
      const draw_date = moment(this.contest.draw_date).format('YYYY-MM-DD\THH:mm');
      this.f.controls['draw_date'].setValue(draw_date);
    });

  }

  onSubmit() {
    this.contestService.update(this.contest_id, this.f.value).subscribe((response) => {
      this.editing = false;
      alert('Concurso atualizado com sucesso!');
      this.contest = response.data;
    });
  }

  addLotterie() {
    this.contestService.addLotterie(this.contest.id, this.fLotterie.value).subscribe((response) => {
      this.getContestLotteries(this.contest.id);
      this.initFormAddLotterie();
       toastr.success('Sorteio adicionado com sucesso!');
    });
  }


  getContestLotteries(id) {
      this.contestService.getLotteries(id).subscribe((response) => {
        this.contest.lotteries = response.data;
      });
    }


  removeLotterie(id) {
    const $this = this;
    bootbox.confirm({
      title: 'Confirmar exclusão',
      message: 'Deseja realmente remover o sorteio?',
      buttons: {
          confirm: {
              label: 'Sim',
              className: 'btn-success'
          },
          cancel: {
              label: 'Não',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
          if (result) {
            $this.contestService.removeLotterie($this.contest.id, id).subscribe((response) => {
              $this.getContestLotteries($this.contest.id);
              $this.initFormAddLotterie();
              toastr.success('Sorteio removido do concurso com sucesso!');
            });
          }
      }
    });
  }

  ballsLottery(i) {
    this.currentLottery = undefined;
    this.currentLottery = this.contest.lotteries[i];
    this.modalLottery = $('#modal-lottery').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  cancelResult() {
    this.currentLottery = null;
    this.modalLottery.modal('hide');
  }

  saveResult(result) {
    this.modalLottery.modal('hide');
    if (result.length > 0) {
      this.currentLottery.result = JSON.stringify(result);
    } else {
      this.currentLottery.result = null;
    }
    this.lotteryService.update(this.currentLottery.id, this.currentLottery).subscribe((response) => {
      this.currentLottery = undefined;
      toastr.success('Resultado do sorteio atualizado com sucesso!');
    });
  }

}
