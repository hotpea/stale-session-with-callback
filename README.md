# hotpea:stale-session-with-callback

Stale session and session timeout handling with callback call  for [meteorjs](http://www.meteor.com/).

## Quick Start

```sh
$ meteor add hotpea:stale-session-with-callback
```

## Key Concepts

This package is a simple notification in zuuk:stale-session to suports simple callback call
look out for zuuk:stale-session to find out how it works

## Configuration

Configuration is via `Meteor.settings.public`, two aditional params.

- `staleSessionInactivityTimeout` - the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale - default 30 minutes.
- `staleSessionPurgeInterval` - interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out - default 1 minute.
- `staleSessionHeartbeatInterval` - interval (in ms) at which activity heartbeats are sent up to the server - default every 3 minutes.
- `staleSessionActivityEvents` - the jquery events which are considered indicator of activity e.g. in an on() call - default `mousemove click keydown`
- `staleSessionCallbackFunction` - name of the function you wanna callback, this function will be called via Meteor.call - default false
- `staleSessionCallbackParam` - the param for function callback - default false

You can set these variables in `config/settings.json` and then launch Meteor with `meteor --settings config/settings.json`.

Example `config/settings.json` file:

```json
{
  "public": {
    "staleSessionInactivityTimeout": 1800000,
    "staleSessionHeartbeatInterval": 180000,
    "staleSessionPurgeInterval": 60000,
    "staleSessionActivityEvents": "mousemove click keydown",
	"staleSessionCallbackFunction": false,
	"staleSessionCallbackParam": false
  }
}
```


## Background

I just needed a stale session plugin with a callback, so, I simple modified the zuuk:stale-session to handle that, enjoy =)

## License

MIT
