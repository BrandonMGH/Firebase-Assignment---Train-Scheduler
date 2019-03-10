var config = {
    apiKey: "AIzaSyAX2qmhytK91eiKiBNFv-qkuerf9iC9-oU",
    authDomain: "cbc-project1-2019.firebaseapp.com",
    databaseURL: "https://cbc-project1-2019.firebaseio.com",
    projectId: "cbc-project1-2019",
    storageBucket: "cbc-project1-2019.appspot.com",
    messagingSenderId: "736856851843"
  };
  firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
    var newRow = $("<tr>");
    var newTrain = $("<td>");
    var newDestination = $("<td>");
    var updatedFrequncy = $("<td>");
    var updatedArrival = $("<td>");
    var minutesTillArrivall = $("<td>");

    newTrain.text(snapshot.val().trainName);
    newDestination.text(snapshot.val().destination);
    updatedFrequncy.text(snapshot.val().frequency); 
    
    var tFrequency = (snapshot.val().frequency);
    var firstTime = (snapshot.val().firstArrival);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % tFrequency;
    
    var tMinutesTillTrain = tFrequency - tRemainder;
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var nextTrainSmall = moment(nextTrain).format("HH:mm");
    
    updatedArrival.text(nextTrainSmall).val(); 

    minutesTillArrivall.text(tMinutesTillTrain).val(); 


    newRow.append(newTrain, newDestination, updatedFrequncy, updatedArrival, minutesTillArrivall);

    $("#table-body").prepend(newRow);
})


$("#submit-button").click(function (event) {
    event.preventDefault();
    var  trainName = $("#train-name-text").val();
    var destination = $("#destination-text").val();
    var frequency = $("#frequency-text").val();
    var firstArrival = $("#next-arrival-text").val();
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstArrival: firstArrival,
    });
    
    $("#train-name-text").val("");
    $("#destination-text").val("")
    $("#frequency-text").val("");
    $("#next-arrival-text").val("");
})