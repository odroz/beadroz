
const googleScript = "https://script.google.com/macros/s/AKfycbxZJq3x1wpZCn0AB2Yym0OSfcL-hyZq_Lcf6CoybmDbgM1sakx04Y--IClPj_XaFPkv/exec";
  const displayConcerts = function(concerts){
       var concertHTML = "";
       var icons = ["bi bi-calendar-event","bi bi-calendar-range", "bi bi-calendar-week" ]


       for(i=0; i< concerts.length; i++){
         var icon = icons[getRandomInt(icons.length)];
         concertHTML += "<div class='col-md-6 d-md-flex align-items-md-stretch'>"+
           "<div class='count-box'>"+
             "<i class='"+icon+"'></i>"+

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


    };
const displayRepertoire = function(repertoire){
  var repertoireHTML = '';
  repertoire.forEach(function(rep, i){
    var middle = Math.floor(repertoire.length/2);
    if(i == 0){
      repertoireHTML+='<div class="col-lg-6">';
    }
    repertoireHTML+='<h3 class="resume-title">'+rep.categorie+'</h3>';
    rep.compositeurs.forEach(function(c){
      repertoireHTML+='<div class="resume-item">'+
      '<h4>'+c.compositeur+'</h4>'+
      '<ul>';
      c.oeuvres.forEach(function(oeuvre){
        repertoireHTML+='<li>'+oeuvre.nom;
        if(oeuvre.partie){
          repertoireHTML+='<span>'+oeuvre.partie+'</span>';
        }
        repertoireHTML+='</li>'
      });
      repertoireHTML+='</ul>'+
      '</div>'
    });
    if(i == middle){
      repertoireHTML+='</div>'+
      '<div class="col-lg-6">';
    }
    if(i == repertoire.length){
      repertoireHTML+='</div>';
    }

  });
 document.getElementById("repertoire").innerHTML = repertoireHTML;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getData = function(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var data = JSON.parse(xhttp.responseText);
     data.forEach(function(sheetData, i){
                switch(i){
                    case 0: displayConcerts(data[0]);
                      break;
                    case 1: displayRepertoire(data[1]);
                      break;
                    }
                  }
              );
   }
 }
   xhttp.open("GET", googleScript, true);
   xhttp.send();
}

window.onload = getData();
