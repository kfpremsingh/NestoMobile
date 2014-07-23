function login()
{
	var cardNumber = $("#cardNumber" ).val();
	var password =   $("#password" ).val();
	if(cardNumber == "")
	{
		alert("please fill cardNumber");
	}
	else if(password=="")
	{
		alert("please fill password");	
	}
	else
	{
		var encryptPassword =EncryptPassword(password);
		var reqData = {"CardNumber":"4476929980567801","DeviceId":"Android","Password":""+ encryptPassword + ""}
		ajaxcall("AuthenticateUserAndFetchPointDetails",reqData,IsLoginResponseSuccess,errorfunction);
	}
}

function errorfunction()
{
alert("some error occured");
}

function IsLoginResponseSuccess(result)
{
	if (result.ApiResponse.StatusCode == 1){
		//Save User Id in Local Storage
		localStorage.CardNumber = result.UserDetail.CardNumber;
		localStorage.RedeemablePoints = result.UserPointDetail.RedeemablePoints;
		localStorage.RedeemedPoints = result.UserPointDetail.RedeemedPoints;
		localStorage.TotalPoints = result.UserPointDetail.TotalPoints;
		localStorage.CustomerName = result.UserDetail.CustomerName;
		localStorage.Email = result.UserDetail.Email;
		localStorage.CountryID = result.UserDetail.CountryID;
		
		//Navigation by Back key should be avoided		
		window.location="pointDetails.html";
	}
	else
	{
		alert(result.ApiResponse.Details);
	}
}

function fillPointDetails()
{
	var redeemableBalance = localStorage.RedeemablePoints - localStorage.RedeemedPoints; 
	if (redeemableBalance < 0)
		redeemableBalance = 0;
						
	//alert(localStorage.CardNumber);
	$('#lblTotalPoints').text(localStorage.TotalPoints);
	$('#lblRedeemedPoints').text(localStorage.RedeemedPoints);
	$('#lblCurrentBalance').text(localStorage.TotalPoints - localStorage.RedeemedPoints );
	$('#lblRedeemableBalance').text(redeemableBalance);
	
	
}