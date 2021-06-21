import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { HeaderUserService } from "../shared/headeruser.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    loggedInUserEmail: string;

    constructor(public authService: AuthService, public headerUserService: HeaderUserService) {}

    ngOnInit(): void {
        this.headerUserService.loggerInUserEmail.subscribe( updatedEmail => {
            this.loggedInUserEmail = updatedEmail;
        })
    }
}