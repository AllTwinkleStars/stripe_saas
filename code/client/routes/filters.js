/*
* Route Filters
* Filters for managing user access to application routes.
*/

/*
* Define Filters
*/

/*
* Filter: Check if a User is Logged In
* If a user is not logged in and attempts to go to an authenticated route,
* re-route them to the login screen.
*/

checkUserLoggedIn = function(){
  if( !Meteor.loggingIn() && !Meteor.user() ) {
    Router.go('/login');
  } else {
    this.next();
  }
}

/*
* Filter: Check if a User Exists
* If a user is logged in and attempts to go to a public route, re-route
* them to the main "logged in" screen.
*/

userAuthenticated = function(){
  if( !Meteor.loggingIn() && Meteor.user() ){
    Router.go('/lists');
  } else {
    this.next();
  }
}

/*
* Run Filters
*/

Router.onBeforeAction(checkUserLoggedIn, {
  except: [
    'index',
    'signup',
    'login',
    'recover-password',
    'reset-password'
  ]
});

Router.onBeforeAction(userAuthenticated, {
  only: [
    'index',
    'signup',
    'login',
    'recover-password',
    'reset-password'
  ]
});
