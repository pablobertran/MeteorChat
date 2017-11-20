// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';

import faker from 'faker';


export const Messages = new Mongo.Collection('messages');

Factory.define('message', Messages, {
    message: () => faker.lorem.sentence(),
    createdAt: () => new Date(),
});
