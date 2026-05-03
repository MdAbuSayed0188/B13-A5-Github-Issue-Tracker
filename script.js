const signinBtn = document.getElementById("signin-btn");
console.log(signinBtn);
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const usernameValue = document.getElementById("username").value;
    const passwordValue = document.getElementById("password").value;

    if (!usernameValue || !passwordValue) {
        alert("please provide username and password");
    }
    else if (usernameValue === "admin" && passwordValue === "admin123") {
        
        window.location.href = "./home.html";
    }
    else {
        alert("Invalid username or password");
    }
});