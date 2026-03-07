document.getElementById("singIn").addEventListener("click", function () {
  const username = document.getElementById("Username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    window.location.replace("./home.html");
  }
});
