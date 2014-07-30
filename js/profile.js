var email_pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var legalCharacters_pattern = /[a-zA-Z0-9!”$&’@#%=?&quot;().*\+\-,\/;\[\\\]\^_`{|}~ ]+$/;

function onProfileLoad() {


    //TODO: Check for valid login in local db. If no redirect to login.StatusCode=1
    var StatusCode = getUrlVars()["StatusCode"];

    if (StatusCode == 1) {
        showMessage("Profile updated successfully");
    }

    $("#cardnumber").text(localStorage.CardNumber);
    $("#name").text(localStorage.CustomerName);
    $("#email").text(localStorage.Email);
    $("#country").text(localStorage.CountryID);

    ////TODO: If there is no content available, call API GetAuthenticatedUserDetails 
    //var AppType = "AppType2";
    //var DeviceId = "DeviceId2";
    //var IPAddress = "192.255.0.255";
    //var UserId = 1;

    //var reqData = { "AppType": "" + AppType + "", "DeviceId": "" + DeviceId2 + "", "IPAddress": "" + IPAddress + "", "UserId": UserId } 
    //ajaxcall("GetAuthenticatedUserDetails", reqData, IsAuthenticatedUserDetailsResponseSuccess, errorfunction);

}


function logOut() {
    localStorage.CardNumber = "";
    localStorage.CustomerName = "";
    localStorage.Email = "";
    localStorage.CountryID = "";
    localStorage.LastLoginDate = "";
    localStorage.UserId = "";



    localStorage.RedeemablePoints = "";
    localStorage.RedeemedPoints = "";
    localStorage.TotalPoints = "";
    window.location = "index.html";

}

function showMessage(message, isSuccess) {

    $("#message").html(message);
    $('#message').css('display', 'block');
    if (isSuccess == 1) {
        $('#message').css('background-color', 'green');
    }
    else {
        $('#message').css('background-color', 'rgb(226, 110, 110)');
        $("#forgetPwd_cardNumber").focus();
    }
}

function errorfunction() {
    showMessage("Some error occured, please try after sometime", 0);
    //    alert("Some error occured, please try after sometime");
}

function IsAuthenticatedUserDetailsResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {

        //Save User Id in Local Database
        localStorage.CardNumber = result.UserDetail.CardNumber;
        localStorage.CountryID = result.UserDetail.CountryID;
        localStorage.CustomerName = result.UserDetail.CustomerName;
        localStorage.Email = result.UserDetail.Email;
        localStorage.LastLoginDate = result.UserDetail.LastLoginDate;
        localStorage.UserId = result.UserDetail.UserId;

        localStorage.RedeemablePoints = result.UserPointDetail.RedeemablePoints;
        localStorage.RedeemedPoints = result.UserPointDetail.RedeemedPoints;
        localStorage.TotalPoints = result.UserPointDetail.TotalPoints;

        $("#cardnumber").text(localStorage.CardNumber);
        $("#name").text(localStorage.CustomerName);
        $("#email").text(localStorage.Email);
        $("#country").text(localStorage.CountryID);
        // showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);

    }
}

/*Profile page functionalities Ends*/

/*Edit Profile page functionalities Begins*/
function onEditProfileLoad() {

    $("#cardnumber").text(localStorage.CardNumber);
    $("#name").val(localStorage.CustomerName);
    $("#email").val(localStorage.Email);

}


function onSave() {

    var isOk = false;
    var cardNumber = localStorage.CardNumber;

    var name = $("#name").val();
    var email = $("#email").val();
    var currentPassword = $("#currentPassword").val();
    var newPassword = $("#newPassword").val();
    var retypePassword = $("#retypePassword").val();
    var chkbxChangePassword = $("#checkbox").attr("data-cacheval");

    if (name == "") {
        showMessage("Please enter your name", 0);
    }
    else if (name.length > 100) {
        showMessage("Please enter name less than 100 characters", 0);
    }
    else if (!legalCharacters_pattern.test(name)) {
        showMessage("Illegal characters are not allowed in name", 0);
    }
    else if (email == "") {
        showMessage("Please enter your email address", 0);
    }
    else if (!email_pattern.test(email)) {
        showMessage("Please enter a valid email address", 0);
    }
    else if (!legalCharacters_pattern.test(email)) {
        showMessage("Illegal characters are not allowed in email", 0);
    }
    else if (email.length > 75) {
        showMessage("Please enter email less than 75 characters", 0);
    }
    else if (chkbxChangePassword == "false") {
        if (currentPassword == "") {
            showMessage("Please enter your current password", 0);
        }
        else if (currentPassword.length < 6) {
            showMessage("Password must have 6 to 12 characters long", 0);
        }
        else if (currentPassword.length > 15) {
            showMessage("Please enter password less than 15 digits", 0);
        }
        else if (!legalCharacters_pattern.test(currentPassword)) {
            showMessage("Illegal characters are not allowed in password", 0);
        }
        else if (newPassword == "") {
            showMessage("Please enter your new password", 0);
        }
        else if (newPassword.length < 6) {
            showMessage("New Password must have 6 to 12 characters long", 0);
        }
        else if (newPassword.length > 15) {
            showMessage("Please enter new password less than 15 digits", 0);
        }
        else if (!legalCharacters_pattern.test(newPassword)) {
            showMessage("Illegal characters are not allowed in new password", 0);
        }
        else if (retypePassword == "") {
            showMessage("Please retype your password", 0);
        }
        else if (newPassword != retypePassword) {
            showMessage("The entered password does not match", 0);
        }
        else if (!legalCharacters_pattern.test(retypePassword)) {
            showMessage("Illegal characters are not allowed in retype password", 0);
        }
        else { isOk = true; }
    }
    else {
        isOk = true;
    }

    if (isOk) {

        var encryptCurrentPassword = EncryptPassword(currentPassword);
        var encryptNewPassword = EncryptPassword(newPassword);
        //   var reqData = { "CardNumber": "4476929980567801", "MobileNumber": "9496368764", "Email": "bijin.vs@nlindia.com", "Name": "Bijin VS", "Password": "YvELVBZVQFwIyL25nLZdrQ==", "CountryId": 1 }
        var reqData = { "CardNumber": "" + cardNumber + "", "Email": "" + email + "", "Name": "" + name + "", "CurrentPassword": "" + encryptCurrentPassword + "", "NewPassword": "" + encryptNewPassword + "" }

        ajaxcall("UpdateUserProfile", reqData, IsUpdateUserProfileResponseSuccess, errorfunction);
    }

}


function IsUpdateUserProfileResponseSuccess(result) {
    if (result.ApiResponse.StatusCode == 1) {

        localStorage.CustomerName = result.UserDetails.CustomerName;
        localStorage.Email = result.UserDetails.Email;

        window.location = "profile.html?StatusCode=1";
        //showMessage(result.ApiResponse.Details, 1);
    }
    else {
        showMessage(result.ApiResponse.Details, 0);
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#retypePassword").val("");
        $("#currentPassword").focus();
    }
}
/*Edit Profile page functionalities Ends*/



// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}