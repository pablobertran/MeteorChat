import {Meteor} from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import {Accounts} from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {chai, assert, expect} from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import { $ } from 'meteor/jquery';


import {withRenderedTemplate} from '../../test-helpers.js';

import '../home/home';
//Imported to add general helpers reference
import '../../layouts/body/body.js'


if (Meteor.isClient) {
    describe('[Home Layout]', function () {

        const data = {};

        const user = {
            profile: {
                name: 'Pablo Bertran'
            },
            email: 'pablo.b@scopicsoftware.com',
            password: 'test123'
        }

        beforeEach(() => {
            Template.registerHelper('_', key => key);
        });

        afterEach(() => {
            Template.deregisterHelper('_');
        });

        it('Should create a user', function () {
            Accounts.createUser(user, function () {
                expect(true).to.equal(true);
            });

        });

        it('Should login', () => {

            withRenderedTemplate('Home', data, (el) => {
                $(el).find('#name').val(user.profile.name);
                $(el).find('#email').val(user.email);
                $(el).find('#password').val(user.password);

                $(el).find('.button.buttonBlue').click();

                stop();

                expect(Meteor.userId()).to.be.a('string');
            });
        });

    });
}