<template>
  <div id="app">
    <nav class = "Global-Warning">
        <div class="title-icon">
          <img src="../../../img/polor-bear.png" class="polor-bear">
          <p class="main-title">Global Warning</p>
        </div>
        <div class="option-log">
          <ul class="option">
            <li><a href="#">Home</a></li>
            <li><a href="#">Recent News</a></li>
            <li><a href="#">Related Article</a></li>
            <li><a href="#">Research</a></li>
            <li><a href="#">Donation</a></li>
          </ul>
          <div class="log-in">
              <input class="burger-check" id="burger-check" type="checkbox">
              <label for="burger-check" class="burger"></label>
                <div id="navigation1" class="navigation">
                  <ul>
                    <li><a href="#">Log In</a></li>
                    <li><a href="#">Sign In</a></li>
                  </ul>
                </div>
          </div>
        </div>
    </nav>

      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Create an Account</h2>
        </div>
        <div class="mdl-card__supporting-text">

          <h4>Email</h4>
          <form action="#">
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="email">
              <label class="mdl-textfield__label" for="sample1">Ex:qqq123@gmail.com</label>
            </div>
          </form>

          <h4>Password</h4>
          <form action="#">
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="password" id="password">
              <label class="mdl-textfield__label" for="sample1">At least 6 characters</label>
            </div>
          </form>

          <button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="btnSignUp">
            Create New Account
          </button>
          <div class="mdl-card__supporting-text" id="sign-info"></div>

          <h5 class="msg">Already have an account?</h5>
          <a href="log_in.html">Log in</a>
        </div>
      </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAQ6gGW0gmpB0CKHtEYG3RAlC7ClMcXGkY",
    authDomain: "final-project-2a197.firebaseapp.com",
    databaseURL: "https://final-project-2a197.firebaseio.com",
    projectId: "final-project-2a197",
    storageBucket: "final-project-2a197.appspot.com",
    messagingSenderId: "972244262334"
  };
var app = firebase.initializeApp(config);
var db = app.database();

var dbUser = db.ref('user');

export default {
  name: 'app',
  user: {
    user: dbUser
  }
}
</script>

<!-- <style src="../../../css/style.css"></style> -->
