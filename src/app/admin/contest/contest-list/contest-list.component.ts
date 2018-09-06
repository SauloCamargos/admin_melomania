import { filter } from 'rxjs/operators';
import { ContestService } from './../../../core/services/contest.service';
import { Component, OnInit } from '@angular/core';
declare var bootbox: any;
declare var toastr: any;
@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css']
})
export class ContestListComponent implements OnInit {

  contests: any;
  configPaginator: any;
  constructor(
    private contestService: ContestService
  ) { }

  ngOnInit() {
    this.getData({qtd: 10});
  }

  getData(data) {
    this.contests = [];
    const pageGet = (data.page) ? data.page : 1;
    const qtd = (data.qtd) ? data.qtd : undefined;

    this.contestService.getData(data).subscribe(response => {
        this.configPaginator = response;
        this.contests = response.data;
    });
  }

  remove(id) {
    const $this = this;
    bootbox.confirm({
      title: 'Confirmar exclusão',
      message: 'Deseja realmente remover o concurso?',
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
            $this.contestService.remove(id).subscribe(
              (response) => {
               $this.getData({qtd: 10});
                toastr.success('Concurso removido com sucesso!');
              }
            );
          }
      }
    });
  }

}
