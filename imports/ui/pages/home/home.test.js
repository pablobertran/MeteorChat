import {Meteor} from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import {Accounts} from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {chai, assert, expect} from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import { $ } from 'meteor/jquery';



describe('[Home Layout]', function () {

    beforeEach(() => {
        Template.registerHelper('_', key => key);
    });

    afterEach(() => {
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

        it('Should login', () => {

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


                expect(Meteor.userId()).to.be.a('string');
            });
        });
    }

});