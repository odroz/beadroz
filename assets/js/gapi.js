

  var getConcerts = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var concerts = JSON.parse(xhttp.responseText);
       var concertHTML = "";
       for(i=0; i< concerts.length; i++){
         concertHTML += "<div class='col-md-6 d-md-flex align-items-md-stretch'>"+
           "<div class='count-box'>"+
             "<i class='bi bi-calendar3-event'></i>"+

             "<span>"+concerts[i].Date+"</span>"+
             "<p>"+
               "<b class='bi bi-geo-alt'></b>"+concerts[i].lieu+"</br>"+
               concerts[i].Description+
           "</p>"+
           "</div>"+
         "</div>"
       }
       console.log(concerts);
       document.getElementById("dateConcerts").innerHTML = concertHTML;

     }
    };
    xhttp.open("GET", "https://script.googleusercontent.com/macros/echo?user_content_key=fZ5dJsNlWqR4PgOsbECxSJnLdXwm2BJs21nC0jA2S4g3t41GKLOa4b5nma4_OIJevg3YSo4GD-qqX43o5_WoAIqGGCXMv-QQm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHhtoqoLXwkuhvED6vyudHYQ2ePWQuc3P1lkKXJXF45CXWv5n-OhMUyotqgNSZf10sbW8cd7J85M34LjX4lMvR69gUYYOVDQuQ&lib=Mo9eM7mmNuhLIIqbbQTu2tmXl3gJVnX-m", true);
    xhttp.send();
  }
