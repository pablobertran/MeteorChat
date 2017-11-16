// Methods related to links

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Messages} from './messages.js';
import moment from 'moment';

Meteor.methods({
    'messages.insert'(message) {

        check(message, String);

        if(message.trim() === ''){
            throw new Meteor.Error(500, 'The message can\'t be empty.' );
        }


        const regex = /^[ A-Za-z\d.,?!:"]+$/g;

        if(!message.match(regex)){
            throw new Meteor.Error(500, 'Message has invalid characters.');
        }

        return Messages.insert({
            message,
            userId: Meteor.userId(),
            createdAt: new Date(),
        });
    },
    'message.remove'(message){
        if(this.userId !== message.userId){
            throw new Meteor.Error(500, 'Removing a message is only available for its owner');
        }


        var date1 = moment(message.createdAt);
        var date2 = moment(new Date());
        if(date2.diff(date1, 'minutes') >=  15){
            throw new Meteor.Error(500, 'Time to delete this message has expired');
        }

        return Messages.remove(message._id);
    }
});
