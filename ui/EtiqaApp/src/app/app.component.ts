import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  showEdit: boolean = false;

  entryForm = FormGroup;

  title = 'EtiqaApp';
  readonly APIUrl = "http://localhost:5038/api/EtiqaApp/";

  constructor(private http:HttpClient) {
  }
  notes: any=[];
  newUser = {
    id: null,
    username: '',
    email: '',
    phoneNumber: '',
    skillset: '',
    hobby: '',
  };

  refreshNotes(){
    console.log('initiate data calling from MongoDB');
    this.http.get(this.APIUrl+'GetAllData').subscribe(data=>{
      console.log('data calling from MongoDB success');
      this.notes = data;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes() {
    let newUsername=(<HTMLInputElement>document.getElementById("newUser.username")).value;
    let newEmail=(<HTMLInputElement>document.getElementById("newUser.email")).value;
    let newPhoneNumber=(<HTMLInputElement>document.getElementById("newUser.phoneNumber")).value;
    let newSkillset=(<HTMLInputElement>document.getElementById("newUser.skillset")).value;
    let newHobby=(<HTMLInputElement>document.getElementById("newUser.hobby")).value;
    console.log('newUser.username', newUsername);
    console.log('newUser.email', newEmail);
    console.log('newUser.phoneNumber', newPhoneNumber);
    console.log('newUser.skillset', newSkillset);
    console.log('newUser.hobby', newHobby);

    let newUserArr = {
      username: newUsername,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      skillset: newSkillset,
      hobby: newHobby,
    };

    let formData=new FormData();

    formData.append('username', newUsername);
    formData.append('email', newEmail);
    formData.append('phoneNumber', newPhoneNumber);
    formData.append('skillset', newSkillset);
    formData.append('hobby', newHobby);

    this.http.post(this.APIUrl+'AddData',formData).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }

  deleteNotes(id:any) {
    console.log('deleteNotes', id);
    this.http.delete(this.APIUrl+'DeleteOneData?id='+id).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }

  editNotes(editedId:any) {
    console.log('editNotes = ', editedId);

    let newUsername=(<HTMLInputElement>document.getElementById("note.username")).value;
    let newEmail=(<HTMLInputElement>document.getElementById("note.email")).value;
    let newPhoneNumber=(<HTMLInputElement>document.getElementById("note.phoneNumber")).value;
    let newSkillset=(<HTMLInputElement>document.getElementById("note.skillset")).value;
    let newHobby=(<HTMLInputElement>document.getElementById("note.hobby")).value;
    console.log('newUser.username', newUsername);
    console.log('newUser.email', newEmail);
    console.log('newUser.phoneNumber', newPhoneNumber);
    console.log('newUser.skillset', newSkillset);
    console.log('newUser.hobby', newHobby);

    let newUserArr = {
      username: newUsername,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      skillset: newSkillset,
      hobby: newHobby,
    };

    this.http.put(this.APIUrl+'ModifyOneData/'+editedId.id+'/'+JSON.stringify(newUserArr), newUserArr).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }
}
