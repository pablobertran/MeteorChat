import {Factory} from 'meteor/dburles:factory';
import {chai} from 'meteor/practicalmeteor:chai';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Random} from 'meteor/random';
import {Messages} from "../../../api/messages/messages";
import {Settings} from "../../../api/settings/settings";
import {resetDatabase} from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';

import {withRenderedTemplate} from '../../test-helpers.js';

import '../../components/message-item/message-item';
import '../chat/chat'
//Imported to add general helpers reference
import '../../layouts/body/body.js'

describe('chat', () => {

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
        StubCollections.stub([Messages]);
        Template.registerHelper('_', key => key);
    });

    afterEach(() => {
        Template.deregisterHelper('_');
    });

    it('Render correctly list of messages ', () => {

        const timestamp = new Date();

        const messages = _.times(3, (i) => Factory.create('message', {
            userId: "XYZ",
            createdAt: new Date(timestamp - (3 - i)),
        }));

        withRenderedTemplate('Chat', null, (el) => {
            const m = messages.map(m => m.message);
            const renderedText = $(el).find('p.message')
                .map((i, e) => $(e).text().replace(/\n/g, '').trim())
                .toArray();
            chai.assert.deepEqual(renderedText, m);
        });


    });

    before(function () {

        resetDatabase();
        Accounts.createUser(user);

    });
});
