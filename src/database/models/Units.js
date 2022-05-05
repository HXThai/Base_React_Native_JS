import {Realm} from '@realm/react';
export default class Units extends Realm.Object {
  static generate({
    title = '',
    uri = '',
    order = 0,
    lesson = '',
    isDownloaded,
  }) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      uri,
      order,
      lesson,
      isDownloaded,
      isPlaying: false,
      firstPoint: 50,
      secondPoint: 65,
      thirdPoint: 22,
      fourthPoint: 1,
      createdAt: new Date(),
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Units',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      uri: 'string',
      order: 'int',
      lesson: 'string',
      isDownloaded: {type: 'bool', default: false},
      isPlaying: {type: 'bool', default: false},
      createdAt: 'date',
      firstPoint: 'int',
      secondPoint: 'int',
      thirdPoint: 'int',
      fourthPoint: 'int',
    },
  };
}
