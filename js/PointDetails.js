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