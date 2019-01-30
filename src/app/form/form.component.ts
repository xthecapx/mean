import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  assets: FormArray;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstAsset: ['', Validators.required],
      assets: this._formBuilder.array([])
    });
  }

  public createAsset() {
    return this._formBuilder.group({
      url: ''
    });
  }

  public addAsset() {
    this.assets = this.secondFormGroup.get('assets') as FormArray;
    this.assets.push(this.createAsset());
  }

  public deleteAsset(id) {
    this.assets = this.secondFormGroup.get('assets') as FormArray;
    this.assets.removeAt(id);
  }

  public savePin() {
    const asset = this.secondFormGroup.get('firstAsset').value;
    const asset2 = this.secondFormGroup.get('assets').value;

    const model = {
      ...this.firstFormGroup.value,
      assets: [{ url: asset }, ...asset2]
    };

    this.http.post('/api', model).subscribe(pin => {
      console.log(pin);
    });

    console.log(model);
  }
}
