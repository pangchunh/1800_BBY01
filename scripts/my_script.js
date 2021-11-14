function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //$("#username").text(n);
                    document.getElementById("username").innerText = n;
                    document.getElementById("navDisplay").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}
//sayHello();

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here: 
        console.log(user.uid);
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid);
        //get the document for current user.
        currentUser.get()
          .then(userDoc => {
            var user_Name = userDoc.data().name;
            console.log(user_Name);
            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = n;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name);                         //using jquery
            $("#navDisplay1").text(user_Name);
            $("#navDisplay2").text(user_Name);
            $("#navDisplay3").text(user_Name);
            $("#navDisplay4").text(user_Name);
            $("#navDisplay5").text(user_Name);
            $("#navDisplay6").text(user_Name);
            $("#navDisplay7").text(user_Name);
            console.log(document.getElementById('navDisplay1').innerText);








            

        })
      } else {
        // No user is signed in.
      }
    });
  }
  insertName();

function writeWebcamData() {
    //this is an array of JSON objects copied from open source data
    var webcams = [{
            "datasetid": "web-cam-url-links",
            "recordid": "01d6f80e6ee6e7f801d2b88ad7517bd05223e790",
            "fields": {
                "url": "http://images.drivebc.ca/bchighwaycam/pub/html/www/17.html",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.136736007805,
                        49.2972589838826
                    ]
                },
                "mapid": "TCM015",
                "name": "Stanley Park Causeway"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "d95ead494c2afbb5f47efdc26bf3ea8c6b8b2e22",
            "fields": {
                "url": "http://images.drivebc.ca/bchighwaycam/pub/html/www/20.html",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.129968,
                        49.324891
                    ]
                },
                "mapid": "TCM017",
                "name": "North End 2"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "8651b55b799cac55f9b74d654a88f3500b6acd64",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie49.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.116492357278,
                        49.2261139995231
                    ]
                },
                "mapid": "TCM024",
                "name": "Cambie St and W 49th Av",
                "geo_local_area": "Oakridge"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "f66fa2c58d19e3f28cf8b842bfa1db073e32e71b",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie41.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.116192190431,
                        49.2335434721856
                    ]
                },
                "mapid": "TCM025",
                "name": "Cambie St and W 41st Av",
                "geo_local_area": "South Cambie"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "7c3afe1d3fe4c80f24260a4946abea3fb15b7017",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/cambie25.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.115406053889,
                        49.248990875309
                    ]
                },
                "mapid": "TCM026",
                "name": "Cambie St and W King Edward Av",
                "geo_local_area": "South Cambie"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        },
        {
            "datasetid": "web-cam-url-links",
            "recordid": "7fea7df524a205c0c0eb8efcc273345356cbe8d1",
            "fields": {
                "url": "https://trafficcams.vancouver.ca/mainTerminal.htm",
                "geom": {
                    "type": "Point",
                    "coordinates": [
                        -123.100028035364,
                        49.2727762979223
                    ]
                },
                "mapid": "TCM028",
                "name": "Main St and Terminal Av",
                "geo_local_area": "Downtown"
            },
            "record_timestamp": "2021-03-22T10:32:40.391000+00:00"
        }
    ];

    webcams.forEach(function (cam) { //cycle thru json objects in array
        console.log(cam); //just to check it out
        db.collection("webcams").add(cam) //add this new document
            .then(function (doc) { //success 
                console.log("wrote to webcams collection " + doc.id);
            })
    })
}

function displayVideos() {
    let videoCardTemplate = document.getElementById("videoCardTemplate");
    let videoCardGroup = document.getElementById("videoCardGroup");
    db.collection("Videos").get()
    .then(allVideos => {
        allVideos.forEach(doc => {
            if (doc.exists) {
                //console.log(doc.data());
                
                let videoTitle =doc.data().title;
                let videoDetails = doc.data().details;
                let videoId = doc.data().video_ID;
                let videoLink = "https://www.youtube.com/embed/" + videoId;
                let videoThumbnail = "http://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
                let videoLength = doc.data().length;
                let videoScore = doc.data().score;
                let videoReview = doc.data().review
                
                let testVideoCard = videoCardTemplate.content.cloneNode(true);
                testVideoCard.querySelector('h5').innerHTML = videoTitle;
                console.log(testVideoCard.querySelector('h5').innerHTML);
                testVideoCard.querySelector('.card-text').innerHTML = videoDetails;
                console.log(testVideoCard.querySelector('.card-text').innerHTML);
                testVideoCard.querySelector('small').innerHTML = videoLength + " minutes";
                testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                console.log(testVideoCard.getElementById('thumbnail').src);
                //testVideoCard.getElementById('button').innerHTML = 'hello';
                testVideoCard.querySelector('a').onclick = function setVideoId() {
                localStorage.setItem ('videoID', doc.data().video_ID); 

                }
                
                //    localStorage.setItem ('vidId', videoId);
                //}
                videoCardGroup.appendChild(testVideoCard);
                 
                
                //console.log(videoDetails);
                //menu.getElementsByTagName('h4').innerHTML = videoTitle;
                //document.getElementById("detailsHere").innerHTML = videoDetails;
                //document.getElementById("contentExercise").src = videoId;
            } else {
                console.log("No such document!");
            }
    
        })
    })
}

    

    function insertContent() {
        let videoId = localStorage.getItem("videoID");
        console.log(videoId);
        db.collection("Videos").where("video_ID", "==", videoId).get()
        .then(queryVideo => {
            size = queryVideo.size;
            Videos = queryVideo.docs;
        
        if (size = 1) {
            let thisVideo = Videos[0].data();
            let videoTitle =thisVideo.title;
            let videoDetails = thisVideo.details;
            let videoId = "https://www.youtube.com/embed/" + thisVideo.video_ID;
            document.getElementById("videoTitleHere").innerHTML = videoTitle;
            document.getElementById("detailsHere").innerHTML = videoDetails;
            document.getElementById("contentExercise").src = videoId;
        } else {
            console.log("Query has more than one data")
        }

    }).catch(function(error) {
            console.log("Error getting document:", error);
        })
    }


    /*
    function(doc) {
        if (doc.exists) {
            console.log(doc.data());
            let videoTitle =doc.data().title;
            let videoDetails = doc.data().details;
            let videoId = "https://www.youtube.com/embed/" + doc.data().video_ID;
            
            document.getElementById("videoTitleHere").innerHTML = videoTitle;
            document.getElementById("detailsHere").innerHTML = videoDetails;
            document.getElementById("contentExercise").src = videoId;
            //console.log(videoTitle);
            //console.log(videoDetails);
            //console.log(videoId);
            
        } else {
            console.log("No such document!");
        }

    }
    */

insertContent();