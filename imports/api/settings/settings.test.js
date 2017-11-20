import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { chai, assert, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import './methods';
import {Settings} from './settings';


describe('[Settings]', () => {
    const settings = {
        color: '#333'
    };
    const newColor = '#777';
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

    if (Meteor.isServer) {
        it('Should save settings', function () {
            Meteor.call('settings.insert', settings);
            let m = Settings.findOne({
                color: {
                    $eq: settings.color
                }
            });
            expect(m.color).to.equal(settings.color);
        });

        it('Should update settings (color)', function () {
            Meteor.call('settings.updateColor', newColor);
            let s = Settings.find({
                color: {
                    $eq: newColor
                }
            }).count();
            expect(s).to.equal(1);
        });
    }
});
