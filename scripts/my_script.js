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
        })
      } else {
        // No user is signed in.
      }
    });
  }
  insertName();

function displayVideos() {
    cleanData();
    let videoCardTemplate = document.getElementById("videoCardTemplate");
    let videoCardGroup = document.getElementById("videoCardGroup");
    db.collection("Videos").get()
    .then(allVideos => {
        allVideos.forEach(doc => {
            if (doc.exists) {
                console.log(doc.data());

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
                testVideoCard.querySelector('.card-text').innerHTML = videoDetails;
                testVideoCard.querySelector('small').innerHTML = videoLength + " minutes";
                testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                //testVideoCard.getElementById('button').innerHTML = 'hello';
                testVideoCard.querySelector('a').onclick = function setVideoId() {
                localStorage.setItem ('videoID', doc.data().video_ID);

                }

                //    localStorage.setItem ('vidId', videoId);
                //}
                document.getElementById("contentHere").appendChild(testVideoCard);


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

    //insertContent();

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

    function randomVideo() {
        db.collection("Videos").get().then(doc => {
        size = doc.size;
        Videos = doc.docs;
        n = Math.floor(Math.random() * 17);
        randomVid = Videos[n].data();
        //randomTitle = randomVid.title;
        //randomVidId = "https://www.youtube.com/embed/" + randomVid.video_ID;
        //randomVidDetail = randomVid.details;
        //console.log(randomVidDetail);
        //$("#videoTitleHere").text(randomTitle);
        //$("#contentExercise").attr("src", randomVidId);
        //$("#detailsHere").text(randomVidDetail);
        localStorage.setItem('videoID', randomVid.video_ID);
        $("#randomDescription").text(randomVid.details);
        $("#videoLength").text(randomVid.length + " minutes");
    })
    }

    function cleanData() {
        let element = document.getElementById("contentHere");
        while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    }

    function filter(x) {
    
        cleanData();

    db.collection("Videos").where("length", "==", x).get()
        .then(filterVideo => {
            filterVideo.forEach(doc => {
                if (doc.exists) {
                    console.log(doc.data());
    
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
                    testVideoCard.querySelector('.card-text').innerHTML = videoDetails;
                    testVideoCard.querySelector('small').innerHTML = videoLength + " minutes";
                    testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                    //testVideoCard.getElementById('button').innerHTML = 'hello';
                    testVideoCard.querySelector('a').onclick = function setVideoId() {
                    localStorage.setItem ('videoID', doc.data().video_ID);
    
                    }
    
                    //    localStorage.setItem ('vidId', videoId);
                    //}
                    document.getElementById("contentHere").appendChild(testVideoCard);
    
    
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


    function checkUser() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                window.loaction.href = "login.html";
            } else {
                // user is logged in
            }
        })
    }


    function signOut() {
        firebase.auth().signOut().then(function() {
            console.log("Signed Out");
            checkUser();
        }, function(error) {
            console.error("Sign Out Error", error);
        });
    }
