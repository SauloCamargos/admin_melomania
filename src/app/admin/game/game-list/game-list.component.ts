import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
declare var bootbox: any;
declare var toastr: any;

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any;
  configPaginator: any;
  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.getData({qtd: 10});
  }

  getData(data) {
    this.games = [];
    const pageGet = (data.page) ? data.page : 1;
    const qtd = (data.qtd) ? data.qtd : undefined;

    this.gameService.getData(data).subscribe(response => {
        this.configPaginator = response;
        this.games = response.data;
    });
  }

  remove(id) {
    const $this = this;
    bootbox.confirm({
      title: 'Confirmar exclusão',
      message: 'Deseja realmente remover o Jogo?',
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
            $this.gameService.remove(id).subscribe(
              (response) => {
                $this.getData({});
                toastr.success('Jogo removido com sucesso!');
              }
            );
          }
      }
    });
  }
}
