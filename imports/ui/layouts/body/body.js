import { Template } from 'meteor/templating';
import moment  from 'moment';

import './body.html';

Template.registerHelper('FormatDateMessage', ( time ) => {
    if ( time ) {
        return moment(time).calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: 'LT',
            lastWeek: 'dddd',
            sameElse: 'DD/MM/YY'
        });
    }
});
