const stripe = Stripe('pk_test_51ISMMqFG2ZRvxeN2SYfnxgz9DzPcnk5xGkIFtvbx5pXS2I7hyq61NJCZfajPPMRTCjnGbshtF7n9D8L9PNkcMrXg00IiNwO64N');
$("#loginToYourAccount").on("click", () => {
    var loginData = {
        username: $("#loginUsername").val(),
        password: $("#loginPassword").val()
    };
    console.log(loginData);
    $.ajax({
        url: "/authentication/login",
        type: "POST",
        dataType: "json",
        data: loginData,
        success: data => {
            
            swal({
                title: data.success,
                icon: "success",
                button: "Continue",
              }).then((val) => {
                window.location.href = '/profile';
                // setTimeout(function(){ window.location.href = '/profile' }, 1000);
              })
            console.log("data");
            
            
        }
    });
});
// $('#logOutBtn').on('click', () => {
//     $.ajax({
//         url: "/logout",
//         type: "GET",
//         dataType: 'json',
//         success: (data) => {
//             console.log("User Logged Out")
//         }
//     })
// })
$("#signUpButton").on("click", () => {
    var signInData = {
        fname: $("#firstname").val(),
        lname: $("#lastname").val(),
        username: $("#signupUsername").val(),
        email: $("#signupUsername").val(),
        password: $("#signupPassword").val(),
        confirmPass: $("#passMatch").val(),
        gender: $("input[name=gender]:checked", "#form1").val(),
        age: $("#age").val(),
        phone: $("#phone").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        address: $("#address").val()
    };
    console.log(signInData);
    $.ajax({
        url: "/authentication/signup",
        type: "POST",
        dataType: "json",
        data: signInData,
        success: data => {
            swal({
                title: "Signed up Successfully!",
                icon: "success",
                button: "Continue",
              })
            // alert(data);
        }
    });
});
$("#resetPassBtn").on("click", () => {
    var signInData = {
        username: $("#resetUsername").val(),
        password: $("#resetPassword").val(),
        confirmPass: $("#resetPassMatch").val()
    };
    console.log(signInData);
    $.ajax({
        url: "/authentication/resetpassword",
        type: "POST",
        dataType: "json",
        data: signInData,
        success: data => {
            swal({
                title: data,
                icon: "success",
                button: "Continue",
              })
        }
    });
});
$("#btnsubmit1").on("click", function() {
    var data = {
        fname: $("#firstname").val(),
        lname: $("#lastname").val(),
        gender: $("input[name=gender]:checked", "#myForm").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        address: $("#address").val()
    };
    $.ajax({
        url: "/myaccount/acc",
        type: "PUT",
        datatype: "JSON",
        data: data,
        success: (data) => {
            swal({
                title: "User Profile Saved Successfully",
                icon: "success",
                button: "Continue",
              })
        }
    });
});


//flight search script
$(function() {
    var cityCodes = [
        "Agartala(IXA)",
        "Agatti Island(AGX)",
        "Agra(AGR)",
        "Ahmedabad(AMD)",
        "Aizawl(AJL)",
        "Akola(AKD)",
        "Allahabad(IXD)",
        "Along(IXV)",
        "Amritsar(ATQ)",
        "Aurangabad(IXU)",
        "Bagdogra(IXB)",
        "Balurghat(RGH)",
        "Bangalore(BLR)",
        "Bareli(BEK)",
        "Belgaum(IXG)",
        "Bellary(BEP)",
        "Bhatinda(BUP)",
        "Bhavnagar(BHU)",
        "Bhopal(BHO)",
        "Bhubaneswar(BBI)",
        "Bhuj(BHJ)",
        "Bikaner(BKB)",
        "Bilaspur(PAB)",
        "Car Nicobar(CBD)",
        "Chandigarh(IXC)",
        "Chennai/Madras(MAA)",
        "Coimbatore(CJB)",
        "Cooch Behar(COH)",
        "Cuddapah(CDP)",
        "Daman(NMB)",
        "Daparizo(DAE)",
        "Darjeeling(DAI)",
        "Dehra Dun(DED)",
        "Delhi(DEL)",
        "Deparizo(DEP)",
        "Dhanbad(DBD)",
        "Dharamsala(DHM)",
        "Dibrugarh(DIB)",
        "Dimapur(DMU)",
        "Diu(DIU)",
        "Gawahati(GAU)",
        "Gaya(GAY)",
        "Goa(GOI)",
        "Gorakhpur(GOP)",
        "Guna(GUX)",
        "Gwalior(GWL)",
        "Hissar(HSS)",
        "Hubli(HBX)",
        "Hyderabad(HYD)",
        "Imphal(IMF)",
        "Indore(IDR)",
        "Jabalpur(JLR)",
        "Jagdalpur(JGB)",
        "Jaipur(JAI)",
        "Jaisalmer(JSA)",
        "Jammu(IXJ)",
        "Jamnagar(JGA)",
        "Jamshedpur(IXW)",
        "Jeypore(PYB)",
        "Jodhpur(JDH)",
        "Jorhat(JRH)",
        "Kailashahar(IXH)",
        "Kamalpur(IXQ)",
        "Kandla(IXY)",
        "Kanpur(KNU)",
        "Keshod(IXK)",
        "Khajuraho(HJR)",
        "Khowai(IXN)",
        "Kochi(COK)",
        "Kolhapur(KLH)",
        "Kolkata(CCU)",
        "Kota(KTU)",
        "Kozhikode(CCJ)",
        "Bhuntar(KUU)",
        "Leh(IXL)",
        "Lilabari(IXI)",
        "Lucknow(LKO)",
        "Ludhiana(LUH)",
        "Madurai(IXM)",
        "Malda(LDA)",
        "Mangalore(IXE)",
        "Mohanbari(MOH)",
        "Mumbai(BOM)",
        "Muzaffarnagar(MZA)",
        "Muzaffarpur(MZU)",
        "Mysore(MYQ)",
        "Nagpur(NAG)",
        "Nanded(NDC)",
        "Nasik(ISK)",
        "Neyveli(NVY)",
        "Osmanabad(OMN)",
        "Pantnagar(PGH)",
        "Pasighat(IXT)",
        "Pathankot(IXP)",
        "Patna(PAT)",
        "Pondicherry(PNY)",
        "Porbandar(PBD)",
        "Port Blair(IXZ)",
        "Pune(PNQ)",
        "Puttaparthi(PUT)",
        "Raipur(RPR)",
        "Rajahmundry(RJA)",
        "Rajkot(RAJ)",
        "Rajouri(RJI)",
        "Ramagundam(RMD)",
        "Ranchi(IXR)",
        "Ratnagiri(RTC)",
        "Rewa(REW)",
        "Rourkela(RRK)",
        "Rupsi(RUP)",
        "Salem(SXV)",
        "Satna(TNI)",
        "Shillong(SHL)",
        "Sholapur(SSE)",
        "Silchar(IXS)",
        "Simla(SLV)",
        "Srinagar(SXR)",
        "Surat(STV)",
        "Tezpur(TEZ)",
        "Tezu(TEI)",
        "Thanjavur(TJV)",
        "Thiruvananthapuram(TRV)",
        "Tiruchirapally(TRZ)",
        "Tirupati(TIR)",
        "Tuticorin(TCR)",
        "Udaipur(UDR)",
        "Vadodara(BDQ)",
        "Varanasi(VNS)",
        "Vijayawada(VGA)",
        "Vishakhapatnam(VTZ)",
        "Warangal(WGC)",
        "Zero(ZER)"
    ];
    $("#originPlace").autocomplete({
        source: cityCodes,
        minLength: 3
    });
    $("#destinationPlace").autocomplete({
        source: cityCodes,
        minLength: 3
    });
});
$("#submitBtn").on("click", function() {
    //$("#result").html("");
    var originInput = $("#originPlace").val();
    var originplace = originInput.match(/\((.*)\)/).pop();
    // console.log(originplace);
    var destinationInput = $("#destinationPlace").val()
    var destinationplace = destinationInput.match(/\((.*)\)/).pop();
    // console.log(destinationPlace);
    var outboundpartialdate = $("#startDate").val();
    var inboundpartialdate = $("#returnDate").val();
    //console.log(originInput, destinationInput)
    $.ajax({
        async: true,
        // "crossDomain": true,
        url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/INR/en-IN/" +
            originplace +
            "/" +
            destinationplace +
            "/" +
            outboundpartialdate +
            "/" +
            "?" +
            inboundpartialdate,
        method: "GET",
        dataType: "json",
        headers: {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "aab1dd7a83mshcdd221cc00a23bdp1d10c2jsn93c71141db3c"
        },
        success: data => {
            $('#FlightResult').empty();
            console.log(data)

            function flightpriceFunc() {
                return Math.floor(Math.random() * 1000 + 2000);
            }
            console.log(data.Carriers.length);
            var flightSearchResult = "";
            if (data.Carriers) {
                for (let i = 0; i < data.Carriers.length; i++) {
                    flightSearchResult += `
                    <div class="card pb-5">
                    <div class="card-body">
                    <div class="card-header airLine" value="${data.Carriers[i].Name}">
                    </div>
                      <span class="card-title ticketPrice">Price : ${flightpriceFunc()}</span>
                      <span class="card-title originCity" value="${originInput}">Origin City : ${originInput} </span>
                      <span class="card-title destinationCity" value="${destinationInput}">Destination City : ${destinationInput} </span> 
                      <span class="card-title outBondDate" value="${outboundpartialdate}"> Journey Date : ${outboundpartialdate} </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button href="#" class="btn btn-primary flightBookingBtn">Book Now</button>
                    </div>
                  </div>
                    `;
                }
                $("#FlightResult").append(flightSearchResult)
            }
        }
    });
})
$(document).on("click", ".flightBookingBtn", function() {
    var flightBookingData = {
        originCity: $(this).parent().children('.originCity').attr("value"),
        destinationCity: $(this).parent().children('.destinationCity').attr("value"),
        outBondDate: $(this).parent().children('.outBondDate').attr("value"),
        ticketPrice: $(this).parent().children('.ticketPrice').text().substring(8),
        airLine: $(this).parent().children('.airLine').attr("value"),
        bookingStatus: "Confirmed"
    }
    console.log(flightBookingData)
    $.ajax({
        url: "/flightBookings/addMyFlights",
        type: "POST",
        data: flightBookingData,
        dataType: "json",
        success: (data) => {
            $.ajax({
                url: `/flightBookings/checkout-session/${data.insertedId}`,
                type: "GET",
                dataType: "json",
                success: async (data) => {
                    //console.log(`Booking data: ${data}`);
                    await stripe.redirectToCheckout({
                        sessionId: data.id
                    });
                    console.log("client:",data);
                    confirm(`Are You Sure to book this Flight.`);
                    alert("Flight Booked")
                }
            })
            //console.log(data)
            $.ajax({
                url: "/sendTextSMS",
                type: "POST",
                dataType: 'json',
                data: flightBookingData,
                success: (data) => {
                    console.log(data)
                }
            })
        }
    })
})
$.ajax({
    url: "flightBookings/getMyBookings",
    type: "GET",
    dataType: "json",
    success: (data) => {
        //console.log(data)
        var outputMyBookings = "";
        for (let i = 0; i < data[0].flightData.length; i++) {
            console.log(data[0].flightData[i])
            outputMyBookings += `
            <div class="container1" >
            <div class="box1" >
            <span></span>
            <div class="content1">
            <div class="divider">
            <center><h4 class="card-title"> ${OnlyCode(data[0].flightData[i].flightData.originCity)} <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png" /> ${OnlyCode(data[0].flightData[i].flightData.destinationCity)} </h4></center>
            <span class="card-text"> Air Line : ${data[0].flightData[i].flightData.airLine} </span> <br>
            <span class="card-text"> Source : ${OnlyName(data[0].flightData[i].flightData.originCity)} </span> <br>
            <span class="card-text"> Destination : ${OnlyName(data[0].flightData[i].flightData.destinationCity)} </span> <br>
            <span class="card-text"> Date : ${data[0].flightData[i].flightData.outBondDate} </span> <br>
            <span class="card-text"> Ticket Price : ${data[0].flightData[i].flightData.ticketPrice} </span> <br>
            <span class="card-text"> Booking Status : ${data[0].flightData[i].flightData.bookingStatus} </span> <br>
            </div>
            </div>
            </div>
            </div>

 `
        }

        $('#myBookedFlights').append(outputMyBookings)
    }
})


function OnlyName(word) {
    var res = word.split("(")[0];
    return res;
}
function OnlyCode(code) {
    var res = code.split("(")[1];
    const editedText = res.slice(0, -1);
    return editedText;
}