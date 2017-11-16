import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var'

Template.Signup.onCreated(function () {
    this.errorMessage = new ReactiveVar(false);
});

import './signup.html';

Template.Signup.events({
    'submit form': function (event, template) {
        event.preventDefault();
        template.errorMessage.set(false);
        const email = event.target.signupEmail.value;
        const password = event.target.signupPassword.value;
        const name = event.target.signupName.value;

        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                name: name
            }
        }, function (err) {
            if (err) {
                template.errorMessage.set(err.message);
            } else {
                FlowRouter.go('home');
            }
        });
    },
    'click .buttonGreen'(e){
        e.preventDefault();
        FlowRouter.go('home');
    }
});

Template.Signup.helpers({
    errorMessage: function () {
        return Template.instance().errorMessage.get();
    }
});