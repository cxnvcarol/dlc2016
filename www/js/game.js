/**
 * Created by mzeyen on 3/5/16.
 */
var TargetDB = {
    targets: [
        {
            name: 'first',
            descr: 'Find the lala. It matters a little.',
            position: {
                longitude: 0,
                latitude: 0
            },
            points: 0
        }
    ],
    rewards: [
        {
            shopName: McDonalds,
            descr: '50% Off a Happy Meal',
            points: 10
        },
        {
            shopName: Engelhorn,
            descr: '5% Off',
            points: 100
        }
    ]
};

var Quest = {
    // assign a quest to the player
    acquire: function(duration, currentPosition) {
        // based on interests and available time select quest/target
        return target;
    },
    // track the position of the current quest
    follow: function(target, currentPosition) {
        // get direction to target based on current position
        // get current position
        // return normalized 2d direction vector
        return direction;
    },
    // finish quest if correct qr code is scanned
    finish: function(scanned) {
        // compare scanned to current target id
        // if they are the same reset current target and add to history
    }
};


var Game = {
    log: {
        currentTarget: 0,
        targetHistory: new Array(),
        currentPoints: 0,
        totalPoints: 0,
        currentRewards: new Array()
    },
    start: function() {
        // start game
    },
    gatherItems: function() {
        // gather shop items
    },
    buyItem: function(id) {
        // buy item with given id
    }
};