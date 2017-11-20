import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {chai, assert, expect} from 'meteor/practicalmeteor:chai';
import {resetDatabase} from 'meteor/xolvio:cleaner';

import '../methods';
import {Messages} from '../messages'

if(Meteor.isClient){

    const demouser = {
        email: 'pablo.b@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

    it('Should create a user and login', function () {
        Accounts.createUser(demouser, function () {});
        let success = false;
        Meteor.loginWithPassword(demouser.email, demouser.password, function (err) {
            if (err) {
                t.errorMessage.set(err.message);
            }
            success = true;
        });
        expect(success).to.equal(false);
    });
}

if (Meteor.isServer) {

    const demouser = {
        email: 'pablo.b@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

    describe('[Messages]', () => {
        const message = "Test message";

        before(function () {
            resetDatabase();
        });

        it('Should send a message', function () {
            Meteor.call('messages.insert', message);
            let m = Messages.findOne({
                message: {
                    $eq: message
                }
            });
            expect(m.message).to.equal(message);
        });

        it('Should remove a message', function () {
            let m = Messages.findOne({
                message: {
                    $eq: message
                }
            });
            Meteor.call('message.remove', m);
            let c = Messages.find({
                message: {
                    $eq: message
                }
            }).count();
            expect(c).to.equal(0);
        });
    });
}
