import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderUserService {
  loggerInUserEmail = new BehaviorSubject('User');

  setEmail(loggerInUserEmail: string) {
    this.loggerInUserEmail.next(loggerInUserEmail);
  }
}