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
    // track the position of the current quest and draw an arrow on map in radius l and with width u.
    follow: function(target, currentPosition, u, l) {
        var normalize = function(vec) {
            var len = Math.sqrt(vec.long * vec.long + vec.lati * vec.lati);
            return {
                long:vec.long / len,
                lati:vec.lati / len
            };
        };
        var direction = {
            long: target.long - currentPosition.long,
            lati: target.lati - currentPosition.lati
        };
        direction = normalize(direction);
        var normal = {
            long: direction.lati,
            lati: - direction.long
        };
        var p = {
            long: currentPosition.long + l * direction.long,
            lati: currentPosition.lati + l * direction.lati
        };
        var e_1 = {
            long: currentPosition.long - u * normal.long,
            lati: currentPosition.lati - u * normal.lati
        };
        var e_2 = {
            long: currentPosition.long + u * normal.long,
            lati: currentPosition.lati + u * normal.lati
        };
        drawArrow(p.lati, p.long, e_1.lati, e_1.long, e_2.lati, e_2.long);
    },
    // finish quest if correct qr code is scanned
    finish: function(scanned, currentTarget) {
        // compare scanned to current target id
        // if they are the same reset current target and add to history
        if(scanned == currentTarget) {
            return {success: True, points: TargetDB.targets[currentTarget].points};
        }
        return {success: False, points: 0};
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
    start: function(duration) {
        // start game
    },
    gatherItems: function() {
        // gather shop items
    },
    buyItem: function(id) {
        // buy item with given id
    }
};