    <!--  DCM Scripts - login.html -->
    <script src="assets/js/config.js"></script>
    <script src="assets/js/profile.js"></script>
    <script>
        $("#login_form").submit(function () {
            onSignInAction();
        });
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
