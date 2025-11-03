import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public db: FirebaseFirestore.Firestore;
  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(require('../auth/mirim-vote-firebase-adminsdk-fbsvc-9b2d0a4a71.json')),
      });
    }
    this.db = admin.firestore();
  }
}
