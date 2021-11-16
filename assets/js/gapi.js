
const googleScript = "https://script.google.com/macros/s/AKfycbwYQkiPvyHpVaZ9ffF7mekI-W-EZufvUmJrXl3y6kDeDc2tA7aK-A9enGencR1Hv1aB/exec";
  const getConcerts = function(){
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
             "<p>";
             if(concerts[i].googleMaps){
              concertHTML+="<a href='"+concerts[i].googleMaps+"' target='_blank'><b class='bi bi-geo-alt'></b></a>";
            }else{
               concertHTML+="<b class='bi bi-geo-alt'></b>";
             }
               concertHTML+="<strong> "+concerts[i].lieu+"</strong></br>"+
               concerts[i].Description;

           if(concerts[i].link){
             concertHTML +="</br><a href='"+concerts[i].link+"' target='_blank'>"+concerts[i].textLink+"</a>";
           }
           concertHTML +="</p></div>"+
         "</div>";
       }
       console.log(concerts);
       document.getElementById("dateConcerts").innerHTML = concertHTML;

     }
    };
    xhttp.open("GET", googleScript, true);
    xhttp.send();
  }
window.onload = getConcerts();
