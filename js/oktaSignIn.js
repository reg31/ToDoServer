const clientId = "0oa1gmn3h9MqaZRgp5d7";
const oktaDomain = "dev-06688794.okta.com";

oktaSignIn = new OktaSignIn({
  logo: '/img/okta.png',
  logoText: 'Just fill this form',
  helpSupportNumber: '(123) 456-7890',
  baseUrl: `https://${oktaDomain}`,
  redirectUri: `http://localhost:28550/app/client.html`,
  clientId: `${clientId}`,
  authParams: {
    issuer: `https://${oktaDomain}/oauth2/default`
  },
  helpLinks: {
    help: 'https://developer.okta.com/code/javascript/okta_sign-in_widget/'
  },
  language: 'en',                       // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'fill this form to login',   // Changes the sign in text
      'primaryauth.submit': 'Sign In'  // Changes the sign in button
    }
  },
  features: {
    registration: true,                 // Enable self-service registration flow
    rememberMe: true,                   // Setting to false will remove the checkbox to save username
    multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
    //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
    smsRecovery: true,                // Enable SMS-based account recovery
    //callRecovery: true,               // Enable voice call-based account recovery
    router: false,                    // Leave this set to true for the API demo
	showPasswordToggleOnSignInPage:true, // Allow end users to check their password before they click Sign In
	registration:true                 // Display the registration section in the primary auth page
  }
});

oktaSignIn.authClient.token.getUserInfo().then(function (user) {
  document.getElementById("messageBox").innerHTML = `Hello ${user.email}, you are *still* logged in! :)`;
  document.getElementById("logout").style.display = 'block';
}, function (error) {
  oktaSignIn.showSignInToGetTokens({
    el: '#okta-login-container'
  }).then(function (tokens) {
    oktaSignIn.authClient.tokenManager.setTokens(tokens);
    oktaSignIn.remove();

    const idToken = tokens.idToken;
    document.getElementById("messageBox").innerHTML = `Hello ${idToken.claims.email}, you just logged in! :)`;
    document.getElementById("logout").style.display = 'block';
  }).catch(function (err) {
    console.error(err);
  });
});

function logout() {
  oktaSignIn.authClient.signOut();
  window.location.href = location.origin; 
}

oktaSignIn.authClient.authStateManager.subscribe(authState => {
  if (authState.isAuthenticated)
    $(toDoList).load(`/app/client.html`);
  else
    $(toDoList).empty();
});

oktaSignIn.authClient.authStateManager.updateAuthState();