import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [ReactiveFormsModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
})
export class SharedModule {}
