
function hide() {
    // get reference to related content to display/hide
    var el = document.getElementById("counter");
    var elic = document.getElementById("icprofil");
    var elinig = document.getElementById("inig");
    elinig.style.display = 'block';

    el.style.display = 'none';
    elic.style.display = 'none';

}


function subinig(str) {
    var el = document.getElementById("counter");
    var elic = document.getElementById("icprofil");
    var elinig = document.getElementById("inig");
    var elpig = document.getElementById("pseudoig");

    el.style.display = 'block';

    elic.style.display = 'block';
    elinig.style.display = 'none';
    elpig.innerText = str;
    var ig = str;

    checkexist1(ig);

}


function checkexist1(ig) {
    var url = "https://www.instagram.com/" + encodeURIComponent(ig) + "/?__a=1";



    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {



            try {
                e = JSON.parse(this.responseText);

                if (e.graphql.user.is_private === false) {

                    getnbfollows(ig);
                    getimgig(ig);
                    var nIntervId;
                    nIntervId = setInterval(getnbfollows, 10000, ig);
                } else {
                    $('#error1').modal();
                }

            } catch {
                $('#error1').modal();

            }




        } else {
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();










}

function checkexist2(ig) {
    var url = "https://www.instagram.com/" + encodeURIComponent(ig) + "/?__a=1";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {



            try {
                e = JSON.parse(this.responseText);

                if (e.graphql.user.is_private === false) {

                    getposts(ig)

                } else {
                    $('#error1').modal();
                }

            } catch {
                $('#error1').modal();

            }




        } else {
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
function getimgig(ig) {
    var url = "https://www.instagram.com/" + encodeURIComponent(ig) + "/?__a=1";
    var cnb = document.getElementById("imgsrc");


    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {



            try {

                e = JSON.parse(this.responseText);
                var imgigg = e.graphql.user.profile_pic_url;

            } catch {
                $('#error').modal();
            }

            cnb.src = imgigg;


        } else {

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


}

function getnbfollows(ig) {
    var url = "https://www.instagram.com/" + encodeURIComponent(ig) + "/?__a=1";
    var cnb = document.getElementById("counternb");


    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            try {
                e = JSON.parse(this.responseText);

                var follower_count = e.graphql.user.edge_followed_by.count;

                cnb.innerHTML = follower_count;


            } catch {
                $('#error').modal();
            }



        } else {

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



// publications



function getposts(ig) {
    var url = "https://www.instagram.com/" + encodeURIComponent(ig) + "/?__a=1";
    var cnb = document.getElementById("nblike");
    cnb.innerHTML = "<h2 style='width: 50vw;margin-left: auto; margin-right: auto; max-width: 400px; min-width: 200px;'>Chargement ..</h2>";

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            try {
                e = JSON.parse(this.responseText);
                cnb.innerHTML = "";
                //var count = e.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_liked_by.count;
                e.graphql.user.edge_owner_to_timeline_media.edges.forEach(count => {

                    // cnb.innerHTML += "<div class='col'> <img height='250' src='"+count.node.display_url+"'><h3 class='text-center'>" +count.node.edge_liked_by.count + "</h3></div>";
                    cnb.innerHTML += "<div class='card' style='width: 18rem; margin:1vw;'><a href='" + count.node.display_url + "'><img src='" + count.node.display_url + "' style='max-height: " + count.node.dimensions.height + "; max-width: " + count.node.dimensions.width + ";' class='card-img-top' alt='...'></a><div class='card-body odometer'><p class='card-text'>" + count.node.edge_liked_by.count + " <i class=\"fas fa-heart\"></i></p></div></div>"
                });
                if (cnb.innerHTML == '') {
                    $('#error3').modal();

                }
                //  cnb.innerHTML = count;
            } catch {
                cnb.innerHTML = "<h2 style='width: 50vw;margin-left: auto; margin-right: auto; max-width: 400px; min-width: 200px;'>ERREUR</h2>";

            }


            //setTimeout(getnbfollows(ig), delay*2*1000);

        } else {
            //setTimeout(getnbfollows(ig), delay*2*1000);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

