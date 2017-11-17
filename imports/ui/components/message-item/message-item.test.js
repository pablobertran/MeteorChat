import {Meteor} from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import {Accounts} from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {chai, assert, expect} from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import { $ } from 'meteor/jquery';
import { Todos } from '../../../api/todos/todos';
import { withRenderedTemplate } from '../test-helpers';

import '../../../api/messages/messages';
import '../../../api/users/server/publications';

describe('[Message Item]', function () {
    const demouser = {
        email: 'pablo.b@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

    Factory.define('message', Messages, {
        userId: () => Meteor.userId(),
        message: () => faker.lorem.sentence(),
        createdAt: () => new Date(),
    });

    before(function () {
        resetDatabase();
    });

    beforeEach(function () {
        Template.registerHelper('_', key => key);
    });
    afterEach(function () {
        Template.deregisterHelper('_');
    });

    if (Meteor.isClient) {

        it('Should create a user and login', function () {
            Accounts.createUser(demouser, function () {
                let success = false;
                Meteor.loginWithPassword(demouser.email, demouser.password, function (err) {
                    if (err) {
                        t.errorMessage.set(err.message);
                    }
                    success = true;
                });

                expect(success).to.equal(true);
            });
        });

        it('Should insert a message into database', function(){
            let message = Factory.create('message');
        });
    }

});