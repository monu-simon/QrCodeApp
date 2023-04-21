import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'

interface IBrowsers {
  [key: string]: RegExp
}
@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  constructor (
    private httpClient: HttpClient,
    private fireStore: AngularFirestore
  ) {}

  getIpAddress () {
    return this.httpClient.get<{ ip: string }>('https://jsonip.com')
  }

  //Not using this method anywhere
  saveIpAddress (ip: string) {
    return this.fireStore.collection('ipAddress').add({
      ipAddress: ip,
      timeStamp: new Date()
    })
  }

  saveBrowserDetails(data: string) {
    return this.fireStore.collection('bowserName').add({
      ipAddress: data,
      os: navigator.platform,
      timeStamp: new Date()
    })
  }
  getBrowserName () {
    const userAgent = navigator.userAgent
    const browsers: IBrowsers = {
      Edge: /Edge\/(\d+)/,
      Chrome: /Chrome\/(\d+)/,
      Firefox: /Firefox\/(\d+)/,
      IE: /Trident.*rv\:11\./,
      Safari: /Version\/(\d+).+?Safari\//
    }
    for (let browserName in browsers) {
      const matches = browsers[browserName].exec(userAgent)
      if (matches) {
        return `${browserName} ${matches[1]}`
      }
    }
    return 'Unknown'
  }
}
