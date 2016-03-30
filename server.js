//
// Server side activity detection for the session timeout
//
// Meteor settings:
// - staleSessionInactivityTimeout: the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale
// - staleSessionPurgeInterval: interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out
//
var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || (1*60*1000); // 1min
var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (30*60*1000); // 30mins

var staleSessionCallbackFunction = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionCallbackFunction || false;
var staleSessionCallbackParam = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionCallbackParam || false;


//
// provide a user activity heartbeat method which stamps the user record with a timestamp of the last
// received activity heartbeat.
//
Meteor.methods({
    heartbeat: function(options) {
        if (!this.userId) { return; }
        var user = Meteor.users.findOne(this.userId);
        if (user) {
            Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});
        }
    },
	
	staleCallBack: function() {
		Meteor.call(staleSessionCallbackFunction, staleSessionCallbackParam)
	}
	
});


//
// periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.
//
Meteor.setInterval(function() {
    var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);

    var before = Meteor.users.find({heartbeat: {$exists: 1}}).count();

    Meteor.users.update({heartbeat: {$lt: overdueTimestamp}},
                        {$set: {'services.resume.loginTokens': []},
                         $unset: {heartbeat:1}},
                        {multi: true});

    var after = Meteor.users.find({heartbeat: {$exists: 1}}).count();


    if((before != after) && staleSessionCallbackFunction) {
		Meteor.call('staleCallBack');
	}
}, staleSessionPurgeInterval);
