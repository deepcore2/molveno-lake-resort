import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Tafel } from 'src/app/models/tafel';

@Component({
  selector: 'app-form-tafel',
  templateUrl: './form-tafel.component.html',
  styleUrls: ['./form-tafel.component.scss']
})
export class FormTafelComponent implements OnInit {

  @Input() tafel: Tafel | undefined = undefined;

  public tafelForm = this.formBuilder.group({
    tafelnummer: [0, Validators.min(1)],
    aantalPersonen: [0, [Validators.min(1), Validators.max(16)]]
  });

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.tafel) {
      this.tafelForm.setValue({
        tafelnummer: this.tafel.kenmerk,
        aantalPersonen: this.tafel.personen
      });
    }
  }

  submitForm() {
    this.activeModal.close(new Tafel(
      this.tafelForm.value.tafelnummer,
      this.tafelForm.value.aantalPersonen
    ));
  }

  get tafelnummer() {
    return this.tafelForm.get('tafelnummer');
  }

  get aantalPersonen() {
    return this.tafelForm.get('aantalPersonen');
  }
}
