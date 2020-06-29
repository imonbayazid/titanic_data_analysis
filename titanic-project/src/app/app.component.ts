import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { HttpClient } from "@angular/common/http";
import { NzModalService } from "ng-zorro-antd/modal";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "titanic-project";

  @ViewChild("titanicForm") partnerForm: any;
  constructor(
    private notification: NzNotificationService,
    private http: HttpClient,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}

  url: any = "https://titanic-project-backend.herokuapp.com/predict";

  getPrediction(data) {
    console.log(data);
    let inputData = {
      data: [
        data["passenger_class"],
        data["passenger_gender"],
        data["passenger_age"],
        data["passenger_ticket_fare"],
        data["passenger_emberked"],
        data["passenger_title"],
        data["passenger_family_size"],
      ],
    };
    this.http
      .post(this.url, inputData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .subscribe((res) => {
        console.log(res);
        let prediction: any =
          res == 0 ? "The passenger did not survive" : "The passenger survived";
        this.showInfo(prediction);
      });
  }

  showInfo(data: any): void {
    this.modal.info({
      nzTitle: "Prediction Result :",
      nzContent: "<p> " + data + "</p>",
      nzOnOk: () => this.partnerForm.reset(),
    });
  }
}
