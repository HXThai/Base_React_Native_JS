import {Realm, createRealmContext} from '@realm/react';

import Task from './models/Task';
import {User} from './models/User';
import Units from './models/Units';
export {Task, User, Units};
const {useQuery, useRealm, useObject, RealmProvider} = createRealmContext({
  schema: [Task, User, Units],
  deleteRealmIfMigrationNeeded: true,
});
module.exports = {
  useQuery,
  useRealm,
  useObject,
  RealmProvider,
  Task,
  User,
  Units,
};
