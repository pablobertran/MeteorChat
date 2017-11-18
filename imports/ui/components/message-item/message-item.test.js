import {Factory} from 'meteor/dburles:factory';
import {chai} from 'meteor/practicalmeteor:chai';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Random} from 'meteor/random';
import {Messages} from "../../../api/messages/messages";
import {resetDatabase} from 'meteor/xolvio:cleaner';
import faker from 'faker';

import {withRenderedTemplate} from '../../test-helpers.js';

import './message-item';
import '../layouts/body/body.js'

describe('message-item', () => {

    let userId = null;
    let userFct = null;

    Factory.define('message', Messages, {
        message: () => faker.lorem.sentence(),
        createdAt: () => new Date(),
    });

    const user = {
        email: 'pablo.b1@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

    beforeEach(() => {
        Template.registerHelper('_', key => key);


        // save the original user fct
        //userFct = Meteor.user;

        // Generate a real user, otherwise it is hard to test roles

    });

    afterEach(() => {
        Template.deregisterHelper('_');

        //remove the user in the db
        Meteor.users.remove(userId);
        // restore user Meteor.user() function
        Meteor.user = userFct;
        // reset userId
        userId = null;
    });

    it('Render message with simple data', () => {

        Accounts.createUser(user,(user) => {
            console.log(user);
            console.log(userId);

            let success = false;
            Meteor.loginWithPassword(user.email, user.password, function (err) {
                if (err) {
                    t.errorMessage.set(err.message);
                }
                success = true;
            });

            let message = Factory.create('message');

            withRenderedTemplate('Message_item', data, (el) => {
                chai.assert.equal($(el).find('p').text().replace(/\n/g, '').trim(), message.message);
            });

        });



    });

    before(function () {
        resetDatabase();
    });
});