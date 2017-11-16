// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings.js';

Meteor.publish('settings', function () {
  return Settings.find({});
});
