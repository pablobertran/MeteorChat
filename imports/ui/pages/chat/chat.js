import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Messages} from '/imports/api/messages/messages.js';
import {Settings} from '/imports/api/settings/settings.js';
import {$} from 'meteor/jquery';
//import colpick from 'jquery-colpick';


import './chat.html';
import '../../components/message-item/message-item';


Template.Chat.onCreated(() => {
    Meteor.subscribe('messages.all');
    Meteor.subscribe('settings');
});

Template.Chat.onCreated(() =>{
    // Handle idleness
    let idleState = false;
    let idleTimer = null;
    $('*').bind('mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', function () {
        clearTimeout(idleTimer);
        if (idleState == true) {
            $("body").css('background-color','#fff');
        }
        idleState = false;
        idleTimer = setTimeout(function () {
            Meteor.logout();
            idleState = true; }, 60000);
    });
    $("body").trigger("mousemove");
});

Template.Chat.onRendered(() => {
    $('.color-select').colorpicker().on('changeColor', function (e) {
            if (!e.colorpicker) {
                // Not yet created
                return;
            }
            $('.color-select').css('background-color', e.target.value);
        });

    Tracker.autorun(() => {
        /*if (Template.instance().subscriptionsReady()) {*/

            const setting = Settings.findOne({
                userId: {
                    $eq: Meteor.userId()
                }
            });

            if(setting){
                $('.color-select').css('background-color', setting.color);
                $('.color-select').css('color', setting.color);
            }else{
                const set = {
                    color: '#000000'
                }
                Meteor.call('settings.insert', set, (error) => {
                    if (error) {
                        alert(error.reason);
                    }
                    $('.color-select').css('background-color', set.color);
                    $('.color-select').css('color', set.color);
                });
            }


        //}
    });
});

Template.Chat.helpers({
    messages() {
        return Messages.find({});
    },
    settings() {
        return Settings.find({
            userId: Meteor.userId()
        })
    },
    messageArgs(message) {
        return{
            setting: Settings.findOne({
               userId: {
                   $eq: Meteor.userId()
               }
            }),
            message: message
        }
    }
});

Template.Chat.events({
    'submit .panel-footer'(event, instance) {
        event.preventDefault();
        const message = event.target.message.value;

        Meteor.call('messages.insert', message, (error) => {
            if (error) {
                alert(error.reason);
            } else {
                $(".panel-body").animate({ scrollTop: $('.panel-body .chat').height() });
                $('#message-text').val('');
            }
        });
    },
    'changeColor .color-select'(event){
        $('.color-select').css('background-color', event.target.value);
        $('.color-select').css('color', event.target.value);
        Meteor.call('settings.updateColor', event.target.value, (error) => {
            if (error) {
                alert(error.reason);
            }
        })
    }
})
