import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/chat/chat';
import '../../ui/pages/not-found/not-found.js';

// Manage login and logout routing
if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('chat');
    });

    Accounts.onLogout(function(){
        FlowRouter.go('home');
    });
}

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', { main: 'Home' });
  }
});

FlowRouter.route('/signup', {
    name: 'signup',
    action() {
        if(Meteor.userId()){
            FlowRouter.go('chat');
        }
        BlazeLayout.render('App_body', { main: 'Signup' });
    },
});

FlowRouter.route('/chat', {
  name: 'chat',
  action() {
    if(!Meteor.userId()){
      FlowRouter.go('home');
    }
    BlazeLayout.render('App_body', { main: 'Chat' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};