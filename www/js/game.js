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
            var len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
            return {
                x: vec.x / len,
                y: vec.y / len
            };
        };
        var R = 6371000; // metres
        var xyTarget = {
            x: R * Math.sin(target.lati) * Math.cos(target.long),
            y: R * Math.sin(target.lati) * Math.sin(target.long)
        };
        var xyCurr = {
            x: R * Math.sin(currentPosition.lati) * Math.cos(currentPosition.long),
            y: R * Math.sin(currentPosition.lati) * Math.cos(currentPosition.long)
        };
        var direction = normalize({x: xyTarget.x - xyCurr.x, y: xyTarget.y - xyCurr.y});
        var normal = {
            x: direction.y,
            y: - direction.x
        };
        var p = {
            x: currentPosition.x + l * direction.x,
            y: currentPosition.y + l * direction.y
        };
        var e_1 = {
            x: currentPosition.x - u * normal.x,
            y: currentPosition.y - u * normal.y
        };
        var e_2 = {
            x: currentPosition.x + u * normal.x,
            y: currentPosition.y + u * normal.y
        };
        drawArrow(
            Math.acos(p.y / R), Math.atan2(p.x, p.y),
            Math.acos(e_1.y / R), Math.atan2(e_1.x, e_1.y),
            Math.acos(e_2y / R), Math.atan2(e_2.x, e_2.y)
        );
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
        return TargetDB.rewards;
    },
    buyItem: function(id) {
        // buy item with given id
        this.log.currentPoints -= TargetDB.rewards[id].points;
        this.log.currentRewards.push(id);
    }
};