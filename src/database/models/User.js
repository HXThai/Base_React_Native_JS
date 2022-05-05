import {Realm} from '@realm/react';
export class User extends Realm.Object {
  static generate() {
    return {
      _id: new Realm.BSON.ObjectId(),
      email: '',
      password: '',
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      email: 'string',
      password: 'string',
      createdAt: 'date',
    },
  };
}
