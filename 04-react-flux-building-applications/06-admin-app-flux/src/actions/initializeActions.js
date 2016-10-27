"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorAPI = require('../api/authorApi');

var InitializeActions = {

    initApp: function(){
        Dispatcher.dispatch({
           actionType: ActionTypes.INITIALIZE,
           initialData: {
               authors: AuthorAPI.getAllAuthors()
           }
        });
    }

};

module.exports = InitializeActions;