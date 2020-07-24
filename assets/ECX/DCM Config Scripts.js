//
    <!--  DCM Scripts - login.html -->
    <script src="assets/ECX/config.js"></script>
    <script src="assets/ECX/custCode.js"></script>
    <script>
      var sToken = sessionStorage.getItem("sToken");
  //    alert("sToken: " + sToken);
      var token  = getCookieByName(Config.getCookieTokenName());
  //    alert("token: " + token);
      // check if token exists:
      if (sToken) {
        window.location.assign("index.html");
      };
    </script>
/////////////////////////////////////
<!--  DCM Scripts - Inside <head> -->
    <script src="assets/js/Config.js"></script>
    <script src="assets/js/profile.js"></script>
    <script>
        //check if token exists:
        var token = getCookieByName(Config.getCookieTokenName());
        if (!token) {
            window.location.replace("login.html");
            };
    </script>
/////////////////////////////////////
