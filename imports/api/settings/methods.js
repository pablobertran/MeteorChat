// Methods related to links

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Settings} from './settings';
import moment from 'moment';

Meteor.methods({
    'settings.insert'(settings) {

        check(settings.color, String);

        return Settings.insert({
            color: settings.color,
            userId: Meteor.userId(),
            createdAt: new Date(),
        });
    },
    'settings.updateColor'(color){


        const setting = Settings.findOne({
            userId: {
                $eq: this.userId
            }
        });

        if(this.userId !== setting.userId){
            throw new Meteor.Error(500, 'Settings update allowed only to it\'s owner');
        }

        return Settings.update(setting._id,{
            $set: {
                color: color
            }
        });
    }
});
