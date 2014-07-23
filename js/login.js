/*function login()
		{
			
			var cardNumber = $( "#cardNumber" ).val();
			var password =   $( "#password" ).val();
			
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
				
						
		var reqData = {"AppType": "AppType2", "DeviceId": "DeviceId2", "IPAddress": "192.255.0.255", "UserId": "1"};
		
			    $.ajax({
			        type: "POST",
			        url: "http://203.124.98.186/mobappapiv1/Service.svc/UpdateUserDetailsAndFetchDefaultCountry",
			        data: JSON.stringify(reqData),
			        contentType: "application/json; charset=utf-8",
			        datatype: JSON,
			        success: function (result) {
			            
			            var res = JSON.stringify(result);
			            alert(res);
			            obj = JSON.parse(res);
			            
			           if (obj.StatusCode == 1){
			           	alert("successfuly logged in");
			           } 
			            
			        }
			    });

						  
			}
		}*/