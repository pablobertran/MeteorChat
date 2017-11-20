import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { chai, assert, expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import '../methods';
import {Settings} from '../settings';

if(Meteor.isClient){

    const demouser = {
        email: 'pablo.b@scopicsoftware.com',
        password: 'test123',
        profile: {
            name: 'Pablo Bertran'
        }
    };

    it('Should create a user and login', function () {
        Accounts.createUser(demouser, function () {
            let success = false;
            Meteor.loginWithPassword(demouser.email, demouser.password, function (err) {
                if (err) {
                    t.errorMessage.set(err.message);
                }
                success = true;
            });
        });

        expect(success).to.equal(true);
    });
}

if (Meteor.isServer) {

    describe('[Settings]', () => {

        before(function () {
            resetDatabase();
        });


        const settings = {
            color: '#333'
        };
        const newColor = '#777';

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

    });
}
