import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
declare var toastr: any;
@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  carregando: boolean;
  fMoip: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
  }

  ngOnInit() {
   this.initFormMoip()
    // duration: [null, [Validators.required]],
    // licenses_id: [null, [Validators.required]],
    this.getByGroup('moip');
  }

  initFormMoip() {
    this.fMoip = this.formBuilder.group({
      moip_environments: [null, [Validators.required]],
      moip_tokenSandbox: [null, [Validators.required]],
      moip_keySandbox: [null, [Validators.required]],
    });
  }

  onSubmit(form) {
    this.save(form.value);
  }

  getByGroup(group) {
    this.carregando = true;
    this.settingsService.getByGroup({name: group}).subscribe((res) => {
      let form;
      if (group === 'moip') {
        form = this.fMoip;
      }
    
      this.carregando = false;
      res.forEach(element => {
        if (form.controls[element.name]) {
          form.controls[element.name].setValue(element.value);
        }
      });
    });
  }

  save(data) {
    this.settingsService.create(data).subscribe((res) => {
      toastr.success('Configurações atualizadas com sucesso!');
     this.getByGroup('moip');
    });
  }
}
