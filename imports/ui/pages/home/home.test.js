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

import '../../../api/users/server/publications';

describe('[Home Layout]', function () {
    const demouser = {
        email: 'pablo.b@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

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
    }

});