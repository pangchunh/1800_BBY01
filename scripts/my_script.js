
// Say hello to the user by displaying their name
function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
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

// Insert the name of the user by getting their name in the user collection in firestore.
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here:
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid);
        //get the document for current user.
        currentUser.get()
          .then(userDoc => {
            let user_Name = userDoc.data().name;
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

// Display all videos using a for each loop and append it in the content selection page.
function displayVideos() {
    cleanData();
    let videoCardTemplate = document.getElementById("videoCardTemplate");
    let videoCardGroup = document.getElementById("videoCardGroup");
    db.collection("Videos").get()
    .then(allVideos => {
        allVideos.forEach(doc => {
            if (doc.exists) {

                let videoTitle =doc.data().title;
                let videoDetails = doc.data().details;
                let videoId = doc.data().video_ID;
                let videoThumbnail = "http://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
                let videoLength = doc.data().length;
                let videoScore = doc.data().score;
                let collection = "review"
                let testVideoCard = videoCardTemplate.content.cloneNode(true);
                testVideoCard.querySelector('h5').innerHTML = videoTitle;
                testVideoCard.querySelector('.card-text').innerHTML = videoDetails;
                if(doc.data().length == 1) {
                    testVideoCard.querySelector('small').innerHTML = "Duration: " + videoLength + " minute";
                } else {
                    testVideoCard.querySelector('small').innerHTML = "Duration: " + videoLength + " minutes";
                }
                testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                testVideoCard.getElementById("readreview").href = "read-review.html?collection="+ collection +"?id=" + doc.data().video_ID;

                for(let i = 0; i < videoScore; i++) {
                    testVideoCard.getElementById('star-group').children[i].setAttribute("class", "fa fa-star checked");
                }

                testVideoCard.getElementById("go").onclick = function setVideoId() {
                localStorage.setItem ('videoID', doc.data().video_ID);
                }
                document.getElementById("contentHere").appendChild(testVideoCard);
            } else {
                console.log("No such document!");
            }
        })
    })
}

    // Getting details of the video from the Video collection and display them in the relevant element.
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


    // Generate a random video by getting a random number and display it inside the relevant element.
    function randomVideo() {
        db.collection("Videos").get().then(doc => {
        size = doc.size;
        Videos = doc.docs;
        let n = Math.floor(Math.random() * (size + 1));
        randomVid = Videos[n].data();
        let score = randomVid.score;
        for(let index = 0; index < 5; index++) {
            document.getElementById('star-gp').children[index].setAttribute("class", "fa fa-star");
        }

        for(let i = 0; i < score; i++) {
            document.getElementById('star-gp').children[i].setAttribute("class", "fa fa-star checked");
        }
        let collection = "review"
        localStorage.setItem('videoID', randomVid.video_ID);
        $("#randomDescription").text(randomVid.details);
        $("#videoLength").text(randomVid.length + " minutes");
        $("#gameModereview").attr("href", "read-review.html?collection="+ collection +"?id=" + Videos[n].data().video_ID)
    })
    }

    // Clean every child under an element.
    function cleanData() {
        let element = document.getElementById("contentHere");
        while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    }


    // Clean the current area of showing video cards and display
    // videos that matches the length in the parameter.
    function filter(x) {
        cleanData();
    db.collection("Videos").where("length", "==", x).get()
        .then(filterVideo => {
            filterVideo.forEach(doc => {
                if (doc.exists) {

                    let videoTitle =doc.data().title;
                    let videoDetails = doc.data().details;
                    let videoId = doc.data().video_ID;
                    let videoThumbnail = "http://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
                    let videoLength = doc.data().length;
                    let videoScore = doc.data().score;
                    let videoReview = doc.data().review
                    let collection = "review"

                    let testVideoCard = videoCardTemplate.content.cloneNode(true);
                    testVideoCard.querySelector('h5').innerHTML = videoTitle;
                    testVideoCard.querySelector('.card-text').innerHTML = videoDetails;
                    if(doc.data().length == 1) {
                        testVideoCard.querySelector('small').innerHTML = "Duration: " + videoLength + " minute";
                    } else {
                        testVideoCard.querySelector('small').innerHTML = "Duration: " + videoLength + " minutes";
                    }                    testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                    testVideoCard.getElementById("readreview").href = "read-review.html?collection="+ collection +"?id=" + doc.data().video_ID;
                    for(let i = 0; i < videoScore; i++) {
                        testVideoCard.getElementById('star-group').children[i].setAttribute("class", "fa fa-star checked");
                    }
                    testVideoCard.getElementById("go").onclick = function setVideoId() {
                    localStorage.setItem ('videoID', doc.data().video_ID);

                    }

                    document.getElementById("contentHere").appendChild(testVideoCard);
                } else {
                    console.log("No such document!");
                }
            })
        })
    }

    // checks if the user if they exists and runs in most pages
    function checkUser() {
        firebase.auth().onAuthStateChanged(user => {
            // checks if the user exists
            if(!user) {
                // redirects the user to the login page
                window.location.href = "index.html";
            } else {
                // user is logged in
            }
        })
    }

    // signs out the user from the web application
    function signOut() {
        // signs out the user
        firebase.auth().signOut().then(function () {
            console.log("Signed Out");
            // runs the function to check if the user exists
            checkUser();
            // error if the function does not work
        }, function (error) {
            console.error("Sign Out Error", error);
        });
    }

    // Display the review based on the video id get on the previous page and
    // calculate the average score of the video by getting all review score of that video
    // and updating it in the Video collection.
    function displayReview() {
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");
    let reviewCardGroup = document.getElementById("reviewCardGroup");
    let url = window.location.href;
    let videoid = url.split('id=')[1];
    db.collection("Reviews").where("video_ID", "==",videoid).get()
    .then(allReviews => {
        let overallScore = 0;
        let averageScore = 0;
        allReviews.forEach(doc => {
            if (doc.exists) {

                let reviewTitle = doc.data().title;
                let reviewDes = doc.data().descirption;
                let reviewer = doc.data().name;
                let reviewdate = doc.data().date;
                let level = doc.data().level;
                let score = doc.data().score;
                let vidTitle;
                overallScore += score;
                averageScore = overallScore / allReviews.size;

                // Update average score of the video to firestore when displaying the reviews from user
                db.collection("Videos").where("video_ID", "==", videoid).get().then(query => {
                    query.forEach(vid => {
                        vidTitle = vid.data().title;
                        $("#testTitle").text(vidTitle);
                        let vidDoc = vid.id
                        db.collection("Videos").doc(vidDoc).update({
                            score: averageScore

                        })
                    })
                })
                let testReviewCard = reviewCardTemplate.content.cloneNode(true);
                testReviewCard.querySelector('.card-header').innerHTML = reviewTitle;
                testReviewCard.querySelector('.card-text').innerHTML = reviewDes;
                testReviewCard.getElementById('date').innerHTML = reviewdate;
                testReviewCard.querySelector('.card-title').innerHTML = reviewer;
                testReviewCard.getElementById('level').innerHTML = level;
                for(let i = 0; i < score; i++) {
                    testReviewCard.getElementById('review-star').children[i].setAttribute("class", "fa fa-star checked");
                }
                localStorage.setItem('videoID', videoid);

                //testVideoCard.getElementById('thumbnail').src = videoThumbnail;
                //testVideoCard.querySelector('a').onclick = function setVideoId() {
                //localStorage.setItem ('videoID', doc.data().video_ID);

                document.getElementById("reviewHere").appendChild(testReviewCard);
            } else {
                console.log("No such document!");
            }
        })
    })
}

