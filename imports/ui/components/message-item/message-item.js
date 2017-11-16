import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './message-item.html';


Template.Message_item.onCreated(() => {
    Meteor.subscribe("userList");
});


Template.Message_item.helpers({
    liClass(message) {
        return message.userId === Meteor.userId() ? 'right' : 'left';
    },
    getColor(color){
        return this.message.userId === Meteor.userId() ? color : '#000000';
    },
    getCircleColor(color){
        return this.message.userId === Meteor.userId() ? color.substring(1,color.length) : 'FA6F57';
    },
    spanClass(message) {
        return message.userId === Meteor.userId() ? 'pull-right' : 'pull-left';
    },
    isMe() {
        return this.message.userId === Meteor.userId();
    },
    getUsername(userId) {

        const user = Meteor.users.findOne({
            _id: {
                $eq: userId
            }
        });

        if(user && user.emails.length > 0){
            return user.profile.name;
        }
        return 'Anonymous';
    },
    getLetters(userId){
        const user = Meteor.users.findOne({
            _id: {
                $eq: userId
            }
        });

        if(user && user.emails.length > 0){
            return user.profile.name.substring(0,2).toUpperCase();
        }
        return 'AN';
    }
});

Template.Message_item.events({
    'click .glyphicon-trash'(event, instance) {
        Meteor.call('message.remove', this.message, (error) => {
            if (error) {
                alert(error.reason);
            }
        });
    }
})