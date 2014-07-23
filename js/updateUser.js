var reqData = {"AppType": "AppType2", "DeviceId": "DeviceId2", "IPAddress": "192.255.0.255", "UserId": "1"};


	ajaxcall("UpdateUserDetailsAndFetchDefaultCountry",reqData,successfunction,errorfunction);
	function successfunction(result)
	{
		if (result.ApiResponse.StatusCode==1){
			
		}
				
		
	}
	
	function errorfunction(error){
		console.log(error);
		
	}
