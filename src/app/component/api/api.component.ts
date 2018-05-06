import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DataServiceService } from '../../services/data-service.service';
import {Employee} from '../interfaces/Employee';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  public active = 0;
  public show = true;
  public showAdd = false;
  public errorcon = false;
  public wait = true;
  public errform = false;
  public showdetails = false;

  pushUser = {};
  Newuser: Employee = {
    key: '',
    status : 0
  };
  alluser: any[];

  constructor(public  dataService: DataServiceService) {
    this.dataService.getUser().subscribe(alluser => {
      this.wait = false;
      this.errorcon = false;

      this.alluser = alluser;
    }, err => {
      this.wait = false;
      this.errorcon = true;

    });
  }

  ngOnInit() {
  }
  submit({value, valid}) {

    if (valid) {
      this.errform = false;
      this.pushUser = value;

      this.dataService.postUser(this.pushUser).subscribe(alluser => {
        this.alluser.push(this.pushUser);
        this.Newuser.user = '';
        this.Newuser.fName = '';
        this.Newuser.lName = '';
        this.Newuser.email = '';
        this.Newuser.password = '';
        this.Newuser.job = '';
        this.Newuser.photo = '';
        this.Newuser.location = '';
        this.Newuser.status = 0;
      });

      this.dataService.getUser().subscribe(alluser => {
        this.alluser = alluser;

        setTimeout(() => {
          this.showAdd = false;
        }, 2500);
      });


    } else {
      this.errform = true;
    }
  }
  delete(id: number, useid: string, emp: Employee) {
    const data = {
      id: id,
      userid: useid
    };
    this.dataService.deleteUser(data).subscribe(alluser => {
      this.alluser.splice(this.alluser.indexOf(emp), 1);

    });

    this.alluser.splice(this.alluser.indexOf(emp), 1);
  }


  Active(id: number, emp: Employee) {

    const data = {
      id: id
    };
    this.dataService.activeUser(data).subscribe(alluser => {});
    emp.status = 0;

  }

  DisActive(id: number, emp: Employee) {
    console.log(id + 'disactive=0');
    const data = {
      id: id
    };
    this.dataService.disActiveUser(data).subscribe(alluser => {});

    emp.status = 1;

  }


  Edit(empid: number, userid: string ) {
    this.show = false;
    const data = {
      id: empid,
      userid: userid
    };
    this.dataService.getUserbyid(data).subscribe(alluser => {
      this.Newuser.id = alluser[0].id;
      this.Newuser.user_id = alluser[0].user_id;
      this.Newuser.user =  alluser[1].name;
      this.Newuser.fName = alluser[0].firstName;
      this.Newuser.lName = alluser[0].lastName;
      this.Newuser.email = alluser[1].email;
      this.Newuser.password = '';
      this.Newuser.job = alluser[0].jobTitle;
      this.Newuser.photo = alluser[0].image;
      this.Newuser.location = alluser[0].lang;
      this.Newuser.status = alluser[0].status;
    });

}

  Details(empid: number, userid: string ) {
    this.showdetails = true;
    const data = {
      id: empid,
      userid: userid
    };
    this.dataService.getUserbyid(data).subscribe(alluser => {
      this.Newuser.id = alluser[0].id;
      this.Newuser.user_id = alluser[0].user_id;
      this.Newuser.user =  alluser[1].name;
      this.Newuser.fName = alluser[0].firstName;
      this.Newuser.lName = alluser[0].lastName;
      this.Newuser.email = alluser[1].email;
      this.Newuser.password = '';
      this.Newuser.job = alluser[0].jobTitle;
      this.Newuser.photo = alluser[0].image;
      this.Newuser.location = alluser[0].lang;

        this.Newuser.status  = alluser[0].status;

    });

  }



  update({value, valid}, id: number , user_id: string) {

    if (valid) {
    const data = {
      id: id,
      userid: user_id,
      email: value.email,
      fName: value.fName,
      job: value.job,
      lName: value.lName,
      location: value.location,
      password: value.password,
      status: value.status,
      user: value.user
    };

    console.log(data);
    this.dataService.updateUser(data).subscribe(alluser => {
      console.log(alluser);
      this.Newuser.user =  '';
      this.Newuser.fName = '';
      this.Newuser.lName = '';
      this.Newuser.email = '';
      this.Newuser.password = '';
      this.Newuser.job = '';
      this.Newuser.photo = '';
      this.Newuser.location = '';
      this.Newuser.status = 0;

    });
    this.dataService.getUser().subscribe(alluser => {
      this.alluser = alluser;
    /*  this.show = true;*/

      setTimeout(() => {
        this.show = true;
      }, 2500 );
    });

    } else {
      this.errform = true;
    }

  }


}
