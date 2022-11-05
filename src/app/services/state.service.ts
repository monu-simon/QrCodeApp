import { Injectable } from "@angular/core";
import {TranslateService} from '@ngx-translate/core'

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private translate: TranslateService) {

    }

    setLanguage(language: string) {
        this.translate.use(language)
    }

}