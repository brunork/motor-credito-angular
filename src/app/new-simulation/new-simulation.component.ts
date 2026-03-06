import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-new-simulation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './new-simulation.component.html',
  styleUrls: ['./new-simulation.component.css']
})
export class NewSimulationComponent {
  currentStep = 1;
  
  // Forms
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;

  // Options
  percentualOptions = [80, 90];
  primeiroImovelOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ];

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.step2Form = this.fb.group({
      renda: ['', Validators.required],
      subsidio: [''],
      fgts: [''],
      valorAprovado: [''],
      percentual: [80, Validators.required],
      primeiroImovel: [true, Validators.required]
    });

    this.step3Form = this.fb.group({
      empreendimento: ['', Validators.required],
      unidade: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.step1Form.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.step2Form.valid) {
      this.currentStep = 3;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setPercentual(value: number) {
    this.step2Form.patchValue({ percentual: value });
  }

  setPrimeiroImovel(value: boolean) {
    this.step2Form.patchValue({ primeiroImovel: value });
  }

  submit() {
    if (this.step3Form.valid) {
      console.log('Simulação enviada', {
        step1: this.step1Form.value,
        step2: this.step2Form.value,
        step3: this.step3Form.value
      });
      // Here you would call a service
    }
  }
}
