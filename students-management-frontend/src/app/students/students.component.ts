import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  // value: number = 0;
  // inc() {
  //   this.value = this.value + 1;
  // }
  // dec() {
  //   if (this.value <= 0) {
  //     this.value = 0;
  //     return;
  //   } else {
  //     this.value = this.value - 1;
  //   }
  // }
  // checkUp() {
  //   console.log(this.value);
  // }

  // form data
  studentInfoForm = this.formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
  });

  studentsArray: any[] = [];
  studentsId = '';
  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.getAllStudent();
  }

  // get students form server
  getAllStudent() {
    this.http
      .get('http://localhost:5000/students')
      .subscribe((resultData: any) => {
        this.studentsArray = resultData.allStudents;
      });
  }

  // Post method
  register() {
    const { name, address, phone } = this.studentInfoForm.value;
    let bodyData = {
      name: name,
      address: address,
      phone: phone,
    };
    this.http
      .post('http://localhost:5000/students', bodyData)
      .subscribe((res) => {
        alert('Student Registered Successfully');
        this.studentInfoForm.reset();
        this.getAllStudent();
      });
  }

  // update method
  update() {
    const { name, address, phone } = this.studentInfoForm.value;
    let bodyData = {
      name: name,
      address: address,
      phone: phone,
    };
    this.http
      .patch(`http://localhost:5000/students/${this.studentsId}`, bodyData)
      .subscribe((res) => {
        alert('Successfully update your information');
        this.studentInfoForm.reset();
        this.getAllStudent();
      });
  }

  // set condition depending on update the user info & also register
  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.studentsId = data._id;
  }
  save() {
    if (this.studentsId === '') {
      this.register();
    } else {
      this.update();
    }
  }

  // delete method
  delete(id: any) {
    this.http
      .delete(`http://localhost:5000/students/${id}`)
      .subscribe((res) => {
        alert('Student Deleted');
        this.getAllStudent();
      });
  }
}
