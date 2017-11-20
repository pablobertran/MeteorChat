import {Factory} from 'meteor/dburles:factory';
import {chai} from 'meteor/practicalmeteor:chai';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Random} from 'meteor/random';
import {Messages} from "../../../api/messages/messages";
import {Settings} from "../../../api/settings/settings";
import {resetDatabase} from 'meteor/xolvio:cleaner';

import {withRenderedTemplate} from '../../test-helpers.js';

import '../message-item/message-item';
//Imported to add general helpers reference
import '../../layouts/body/body.js'

describe('message-item', () => {

    const user = {
        email: 'pablo.b10@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };


    Factory.define('settings', Settings, {
        color: '#000000'
    });

    beforeEach(() => {
        Template.registerHelper('_', key => key);
    });

    afterEach(() => {
        Template.deregisterHelper('_');
    });

    it('Render correctly list of chats ', () => {

        const message = Factory.build('message', {
            userId: Meteor.userId()
        });

        const settings = Factory.build('settings', {
            userId: Meteor.userId()
        });

        const data = {
            message: message,
            setting: settings
        }

        withRenderedTemplate('Message_item', data, (el) => {
            chai.assert.equal($(el).find('p').text().replace(/\n/g, '').trim(), message.message);
            chai.assert.equal($(el).find('.right.clearfix').length, 1);
        });


    });

    it('Render non-logged user message ', () => {

        const message = Factory.build('message', {
            userId: 'XYZ'
        });

        const settings = Factory.build('settings', {
            userId: 'XYZ'
        });

        const data = {
            message: message,
            setting: settings
        }

        withRenderedTemplate('Message_item', data, (el) => {
            chai.assert.equal($(el).find('p').text().replace(/\n/g, '').trim(), message.message);
            chai.assert.equal($(el).find('.left.clearfix').length, 1);
        });


    });



    before(function () {

        resetDatabase();
        Accounts.createUser(user);

    });
});