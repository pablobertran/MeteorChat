import { Meteor } from 'meteor/meteor';

Meteor.publish("userList", function () {
    return Meteor.users.find({}, {fields: {_id: 1,emails: 1, profile: 1}});
});