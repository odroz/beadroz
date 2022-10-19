




  const displayConcerts = function(concerts){
       var concertHTML = "";
       var icons = ["bi bi-calendar-event","bi bi-calendar-range", "bi bi-calendar-week" ]


       for(i=0; i< concerts.length; i++){
         var icon = icons[getRandomInt(icons.length)];
         concertHTML += "<div class='col-md-6 d-md-flex align-items-md-stretch'>"+
           "<div class='count-box'>"+
             "<i class='"+icon+"'></i>"+

             "<span>"+concerts[i].Date+"</span>"+
             "<p>"+
             concerts[i].Description+
             "</p><p>";

            if(concerts[i].googleMaps){
              concertHTML+="<a href='"+concerts[i].googleMaps+"' target='_blank'><b class='bi bi-geo-alt'></b>"+concerts[i].lieu+"</a>";
            }else{
               concertHTML+="<b class='bi bi-geo-alt'></b> "+concerts[i].lieu;
             }
               concertHTML+="</br>";


           if(concerts[i].link){
             concertHTML +="<strong><a href='"+concerts[i].link+"' target='_blank'>"+concerts[i].textLink+"</a></strong>";
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
        if(oeuvre.air){
          repertoireHTML+='&ensp;<i>'+oeuvre.air+'</i>';
        }
        repertoireHTML+='</li>';
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

const displayTextes = function(textes){
  textes.forEach(function(t){
    var section = document.getElementById(t.section+"-title")
    if(section){
        section.innerHTML = t.titre;
        if(t.texte){
            document.getElementById(t.section+"-texte").innerHTML = t.texte;
        }
    }else{
        document.getElementById(t.section).innerHTML = t.texte;
    }
  });
}

const displayTestimonials = function(testimonials){
    var testimonialsHTML="";
    testimonials.forEach(function(t, i){
        testimonialsHTML+='<div class="swiper-slide">'+
              '<div class="testimonial-item">'+
                '<p>'+
                  '<i class="bx bxs-quote-alt-left quote-icon-left"></i>';
                if(t.titre){
                  testimonialsHTML+='<strong>'+t.titre+'</strong><br>';
                }
                 testimonialsHTML+=t.temoignage+
                  '<i class="bx bxs-quote-alt-right quote-icon-right"></i>'+
                '</p>'+
                '<!--<img src="assets/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">-->'+
                '<h3>'+t.provenance+'</h3>'+
                '<h4>'+t.date+'</h4>'+
              '</div>'+
            '</div>';
    });
    document.getElementById("testimonial-swiper").innerHTML = testimonialsHTML;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getLangScript(){

    var googleScript ="https://script.google.com/macros/s/AKfycbzq2xZV2-feRuoxpvukH4UAkeUhoESSDXsS_y7RXKp9MJ2gpoQyDAZ5FAySnj81IKu3/exec";
    switch(userLang){
        case "fr":
        case "fr-BE":
        case "fr-CA":
        case "fr-CH":
        case "fr-LU":
            googleScript += "?lang=fr";
            break;
        case "de":
        case "de-CH":
        case "de-AT":
        case "de-LU":
        case "de-LI":
            googleScript += "?lang=de";
            break;
        default:
            googleScript += "?lang=fr";
        }
    return googleScript;
}
function setLang(lang){
    userLang = lang;
    getData();
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
                    case 2: displayTextes(data[2]);
                      break;
                    case 3: displayTestimonials(data[3]);
                      break;
                    }
                  }
              );
   }
 }


    var googleScript = getLangScript();
    xhttp.open("GET", googleScript, true);
    xhttp.send();
}
var userLang = navigator.language || navigator.userLanguage;
window.onload = getData();
