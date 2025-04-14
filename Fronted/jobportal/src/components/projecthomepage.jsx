import React, { Component } from "react";
import "../css/projecthomepage.css";
import { BASEURL, callApi, setSession } from "../api";

class ProjectHomepage extends Component {
  constructor() {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin=this.signin.bind(this);
  }

  state = {
    isSignup: false, // State to track whether signup popup is active
  };

  showSignIn = () => {
    this.setState({ isSignup: false });
    document.getElementById("popupHeader").innerHTML = "Login";
    document.getElementById("signin").style.display = "block";
    document.getElementById("signup").style.display = "none";
    document.getElementById("popup").style.display = "block";






    username.value = "";
    password.value = "";
  };

  showSignup = () => {
    this.setState({ isSignup: true });
    document.getElementById("popupHeader").innerHTML = "SignUp";
    document.getElementById("signin").style.display = "none";
    document.getElementById("signup").style.display = "block";
    document.getElementById("popup").style.display = "block";

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let  signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");
    fullname.value="";
    email.value="";
    role.value="";
    signuppassword.value="";
    confirmpassword.value="";
  };

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      document.getElementById("popup").style.display = "none";
    }
  };

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signupPassword"); // Fixed ID
    let confirmpassword = document.getElementById("confirmpassword");

    // Reset borders
    [fullname, email, role, signuppassword, confirmpassword].forEach((field) => {
      field.style.border = "";
    });

    // Validate fields
    if (!fullname.value.trim()) return this.setError(fullname);
    if (!email.value.trim()) return this.setError(email);
    if (!role.value.trim()) return this.setError(role);
    if (!signuppassword.value.trim()) return this.setError(signuppassword);
    if (!confirmpassword.value.trim()) return this.setError(confirmpassword);
    if (signuppassword.value !== confirmpassword.value) return this.setError(signuppassword);

    // Prepare data
    let data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value,
    });

    // Call API
    callApi("POST", "http://localhost:8080/users/signup", data, this.getResponse);
  }

  setError(field) {
    field.style.border = "1px solid red";
    field.focus();
  }

  getResponse = (res) => {
    let resp = res.split("::");
    alert(resp[1]);

    if (resp[0] === "200") {
      document.getElementById("signin").style.display = "block";
      document.getElementById("signup").style.display = "none";
    }
  };
  forgotPassword() {
    let username = document.getElementById("username");
    username.style.border = "";
  
    if (!username.value.trim()) {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
  
    let url = "http://localhost:8080/users/forgotpassword/" + username.value;
    callApi("GET", url, "", this.forgotPasswordResponse);
  }
  
  forgotPasswordResponse(res)
  {
      let data = res.split('::');
      if (data[0] === "200")
          responseDiv.innerHTML =` <br/><br/><label style='color:green'>${data[1]}</label>`;
      else
      responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`;
  }

  signin() {
    let username = document.getElementById("username");
    let password = document.getElementById("passwordInput");
    let responseDiv = document.getElementById("responseDiv");
  
    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";
  
    if (!username.value.trim()) {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
    if (!password.value.trim()) {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }
  
    let data = JSON.stringify({
      email: username.value,
      password: password.value
    });
  
    callApi("POST", BASEURL + "users/signin", data, this.signinResponse);
  }
  


  signinResponse = (res) => {
    let responseDiv = document.getElementById("responseDiv");
    let rdata = res.split("::");
  
    if (rdata[0] === "200") {
      setSession("csrid", rdata[1], 1);
      window.location.replace("/dashboard");
    } else {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
    }
  };
  









  render() {
    return (
      <div id="base">
        <div id="popup" onClick={this.closeSignin}>
          <div className="popupWindow">
            <div id="popupHeader">Login</div>
            <div id="signin">
              <label className="usernameLabel">Username:</label>
              <input type="text" id="username" />
              <label className="passwordLabel">Password:</label>
              <input type="password" id="passwordInput" />
              <div className="forgotPassword">Forgot <label onClick={this.forgotPassword}>Password?</label></div>
              <button className="signinButton" onClick={this.signin}>Sign in</button>
              <div className='div1' id='responseDiv'></div>

            </div>
            <div id="signup" style={{ display: "none" }}>
              <label>Full Name:</label>
              <input type="text" id="fullname" />
              <label>Email:</label>
              <input type="email" id="email" />
              <label>Select Role:</label>
              <select id="role">
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Employer</option>
                <option value="3">Job Seeker</option>
              </select>
              <label>Password:</label>
              <input type="password" id="signupPassword" /> {/* Fixed ID */}
              <label>Confirm Password:</label>
              <input type="password" id="confirmpassword" /> 
              <button onClick={this.userRegistration}>Register Now</button>
              <div>Already have an account?`` <span onClick={this.showSignIn}>SIGN IN</span></div>
            </div>
            {!this.state.isSignup && (
              <div className="div2">
                Don't have an account?
                <label onClick={this.showSignup}>SIGNUP NOW</label>
              </div>
            )}
          </div>
        </div>
        <div id="header">
          <img className="logo" src="../images/logo1.png" alt="Logo" />
          <img className="signIcon" src="../images/user.png" alt="Sign In Icon" onClick={this.showSignIn} />
          <label className="signinText" onClick={this.showSignIn}>Sign In</label>
        </div>
        <div id="content">
          <div className="text1">INDIA's #1 JOB PORTAL - KLJobPortal</div>
          <div className="text2">Your job search ends here</div>
          <div className="text3">Discover career opportunities</div>
          <div className="searchBar">
            <input type="text" className="searchText" placeholder="Search by Skill" />
            <input type="text" className="searchLocation" placeholder="Job location" />
            <button className="searchButton">Search Job</button>
          </div>
        </div>
        <div id="footer">
          <label className="copyRight">
            Copyright &copy; Gurukalyan- KL University © 2021 KL JobPortal. All rights reserved
          </label>
          <img className="socialmediaIcon" src="../images/facebook.png" alt="Facebook" />
          <img className="socialmediaIcon" src="../images/linkedin.png" alt="LinkedIn" />
          <img className="socialmediaIcon" src="../images/twitter.png" alt="Twitter" />
        </div>
      </div>
    );
  }
}

export default ProjectHomepage;
