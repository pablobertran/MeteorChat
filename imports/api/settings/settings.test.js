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

        if(Meteor.isClient){
            it('Should create a user and login', function() {
                let success = false;

                try{
                    let result = Accounts.createUser(demouser, function () {
                        Meteor.loginWithPassword(demouser.email, demouser.password, function (err) {
                            if (err) {
                                t.errorMessage.set(err.message);
                            }
                            success = true;
                        });
                    });

                    if(result){
                        expect(success).to.equal(true);
                        return true;
                    }
                }catch(er){
                    expect(success).to.equal(true);
                }

            });
        }

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