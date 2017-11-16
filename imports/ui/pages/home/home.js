import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var'

import './home.html';

Template.Home.onCreated(function(){
    this.errorMessage = new ReactiveVar( false );
});

Template.Home.helpers({
    errorMessage: function() {
        return Template.instance().errorMessage.get();
    }
});

Template.Home.events({
    'submit form'(e, t) {
        t.errorMessage.set(false);
        e.preventDefault();
        let email = event.target.email.value;
        let password = event.target.password.value;
        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                t.errorMessage.set(err.message);
            }
        });
    },
    'click .buttonGreen'(e){
        e.preventDefault();
        FlowRouter.go('signup');
    }
});