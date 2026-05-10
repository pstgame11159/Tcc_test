import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { PersonService } from '../../core/services/person.service';
import { Occupation } from '../../core/models/person.model';

function phoneValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return /^0[0-9]{9}$/.test(control.value) ? null : { invalidPhone: true };
}

@Component({
  selector: 'app-it04',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './it04.component.html',
  styleUrl: './it04.component.scss',
})
export class It04Component {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  form: FormGroup;
  profileFileName = '';
  successMessage: string | null = null;

  dropdownOpen = false;
  occupationSearch = '';
  selectedOccupationName = '';

  occupations: Occupation[] = [
    { id: 1, name: 'นักเรียน / นักศึกษา' },
    { id: 2, name: 'วิศวกร' },
    { id: 3, name: 'แพทย์' },
    { id: 4, name: 'ครู / อาจารย์' },
    { id: 5, name: 'นักธุรกิจ' },
    { id: 6, name: 'พนักงานบริษัทเอกชน' },
    { id: 7, name: 'ข้าราชการ / รัฐวิสาหกิจ' },
    { id: 8, name: 'อื่นๆ' },
  ];

  filteredOccupations: Occupation[] = [];

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator]],
      profile: ['', Validators.required],
      birthDay: ['', Validators.required],
      occupationId: ['', Validators.required],
      sex: ['', Validators.required],
    });
    this.filteredOccupations = [...this.occupations];
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.combo-wrapper')) {
      this.closeDropdown();
    }
  }

  openDropdown(): void {
    this.dropdownOpen = true;
    this.occupationSearch = this.selectedOccupationName;
    this.filteredOccupations = [...this.occupations];
  }

  toggleDropdown(): void {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
    this.occupationSearch = '';
    if (!this.form.get('occupationId')?.value) {
      this.form.get('occupationId')!.markAsTouched();
    }
  }

  filterOccupations(): void {
    const q = this.occupationSearch.toLowerCase();
    this.filteredOccupations = this.occupations.filter((o) =>
      o.name.toLowerCase().includes(q),
    );
  }

  selectOccupation(occ: Occupation | null): void {
    if (occ) {
      this.form.patchValue({ occupationId: occ.id });
      this.selectedOccupationName = occ.name;
    } else {
      this.form.patchValue({ occupationId: '' });
      this.selectedOccupationName = '';
    }
    this.form.get('occupationId')!.markAsTouched();
    this.closeDropdown();
  }

  onOccupationSearch(event: Event): void {
    this.occupationSearch = (event.target as HTMLInputElement).value;
    this.dropdownOpen = true;
    this.filterOccupations();
  }

  get f() {
    return this.form.controls;
  }

  onBrowseClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.profileFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      this.form.patchValue({ profile: base64 });
      this.form.get('profile')!.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const val = this.form.value;

    const rawDate: string = val.birthDay;
    const [y, m, d] = rawDate.split('-');
    const birthDayFormatted = `${d}/${m}/${y}`;

    this.personService
      .createPerson({
        firstName: val.firstName,
        lastName: val.lastName,
        email: val.email,
        phone: val.phone,
        birthDay: birthDayFormatted,
        occupationId: Number(val.occupationId),
        profile: val.profile,
        sex: val.sex,
      })
      .subscribe({
        next: (res) => {
          this.successMessage = `save data success id : ${res.id}`;
          this.resetForm();
          setTimeout(() => (this.successMessage = null), 4000);
        },
        error: (err) => {
          console.error('Create person error', err);
        },
      });
  }

  resetForm(): void {
    this.form.reset();
    this.profileFileName = '';
    this.selectedOccupationName = '';
    this.occupationSearch = '';
    this.filteredOccupations = [...this.occupations];
    this.dropdownOpen = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
