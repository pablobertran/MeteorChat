import {Factory} from 'meteor/dburles:factory';
import {chai, expect} from 'meteor/practicalmeteor:chai';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Random} from 'meteor/random';
import {Messages} from "../../../api/messages/messages";
import {Settings} from "../../../api/settings/settings";
import {resetDatabase} from 'meteor/xolvio:cleaner';

import {withRenderedTemplate} from '../../test-helpers.js';

import '../../../api/users/server/publications';

describe('[Signup Layout]', function () {

    beforeEach(() => {
        Template.registerHelper('_', key => key);
    });

    afterEach(() => {
        Template.deregisterHelper('_');
    });

    if (Meteor.isClient) {

        it('Should create a new user', () => {

            const user = {
                profile: {
                    name: 'Pablo Bertran'
                },
                email: 'pablo.b@scopicsoftware.com',
                password: 'test123'
            }
            let userCreated = true;

            withRenderedTemplate('Signup', data, (el) => {
                $(el).find('#name').val(user.profile.name);
                $(el).find('#email').val(user.email);
                $(el).find('#password').val(user.password);

                $(el).find('.button.buttonBlue').click();

                stop();

                Account.createUser(user, function (err) {
                    if (!err) {
                        userCreated = false;
                    }
                });
                expect(userCreated).to.equal(true);
            });
        });

    }
});