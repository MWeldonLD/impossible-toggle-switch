// Defines user properties. Each user Name + unique Key shows a user for targeting in LaunchDarkly
var user = {
    name: 'Megan Weldon',
    key: 'my-random-user-key',
};

// Creates a label div for initial load   
var labelDiv = document.createElement('div');
document.body.appendChild(labelDiv);
labelDiv.appendChild(document.createTextNode('loading...'));

// Creates a div for feature
var featureDiv = document.createElement('div');
document.body.appendChild(featureDiv);

// New feature script to load only if Flag Value is True
var newFeature = document.createElement('script');
newFeature.src = './newfeature.js';

// Creates a new LDClient instance with your environment-specific SDK key
var ldclient = LDClient.initialize('YOUR CLIENT-SIDE ID HERE', user);

// Evaluates LaunchDarkly new-toggle-switch Flag Value 
// Renders new feature if returned Flag Value is True
function renderld() {
    var flagValue = ldclient.variation('new-toggle-switch', false);
    
    if (flagValue == true) {
        var label = user.name + ', try the new switch... 🐻';
        var feature = featureDiv.setAttribute("id", "app");
        document.head.appendChild(newFeature);
    }
    else {
        var label = '🐻 No switch for you, ' + user.name + '!';
        var feature = featureDiv.innerHTML = "";
    }
    labelDiv.replaceChild(document.createTextNode(label), labelDiv.firstChild);
    featureDiv.replaceChild(document.createElement(feature), featureDiv.firstChild);

    // Console log for LaunchDarkly SDK connection checking
    console.log("SDK successfully connected! The value of new-toggle-switch is " + flagValue + " for " + user.name)
};

ldclient.on('ready', renderld);
ldclient.on('change', renderld);