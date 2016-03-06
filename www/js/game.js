/**
 * Created by mzeyen on 3/5/16.
 */
var QRCodeMapping = {
    t2_position_one: 0,
    t2_position_two: 1,
    t2_position_three: 2,
    t2_position_four: 3
};

var TargetDB = {
    targets: [
        {
            name: "JWolfskinQuest",
            title: "Fight the wolfs!",
            descr: "Although the FRAPORT is usually known as a very civilized environment, it's time you go back to your inner hunter. Fight the wolfs and get their skin!",
            position: {
                longitude: 8.570677042007446,
                latitude: 50.0501323567298,
            },
            points: 0
        },

        {
            name: "StarbucksQuest",
            title: "That's a cheap reach for the stars!",
            descr: "A mermaid glances at you while you initiate your own personal relaxation mode... Even if you take the small timeout to go!",
            position: {
                longitude: 8.573868870735167,
                latitude: 50.051372391135324,
            },
            points: 0
        },

        {
            name: "FossilQuest",
            title: "What a day for paleontology!",
            descr: "Here at FRAPORT, you cannot only travel through space, but also through time! Visit the glamorous jurrassic ages and maybe even find your personal souvenir!",
            position: {
                longitude: 8.571395874023438,
                latitude: 50.05015991339804,
            },
            points: 0
        },

        {
            name: "MDonaldsQuest",
            title: "A truely international clown!",
            descr: "Some people are hating it, but much larger share of people are loving it! No surprise - this company serves its customers the quickest food since more that 75 years.",
            position: {
                longitude: 8.573498725891112,
                latitude:  50.04784854285611,
            },
            points: 0
        },

        {
            name: "SpecialQuest",
            title: "Why did I came here again?",
            descr: "We know you had so much fun exploring this beautiful hub! We're also sad you have to leave. With so many tears in our eyes, this special quest is worth more XP than every other quest in the game. The task? Get to your gate in time!",
            position: {
                longitude: 8.567174,
                latitude:  50.046467,
            },
            points: 50,
        }



    ],
    rewards: [
        {
            shopName: 'McDonalds',
            descr: '50% Off a McMenu',
            points: 10
        },
        {
            shopName: 'Engelhorn',
            descr: '5% Off',
            points: 100
        }
    ]
};

var Quest = {
    // assign a quest to the player
    acquire: function(duration, currentPosition) {
        // based on interests and available time select quest/target
        var comp = function(a, b) {
            var d1 = distanceBetweenPositions(
                currentPosition.lati,
                currentPosition.long,
                a.position.lati,
                a.position.long
            );
            var d2 = distanceBetweenPositions(
                currentPosition.lati,
                currentPosition.long,
                b.position.lati,
                b.position.long
            );
            return d1 - d2;
        };
        var sorted = TargetDB.targets.sort(comp);
        var result = new Array();
        for(q in sorted) {
            var i = $.inArray(q, TargetDB.targets);
            result.push(i);
        }
        return result;
        /*var closest = {id: 0, dist: Infinity};
        for(i = 0; i < TargetDB.targets.length; i++) {
            d = distanceBetweenPositions(
                currentPosition.lati,
                currentPosition.long,
                TargetDB.targets[i].position.latitude,
                TargetDB.targets[i].position.longitude);
            if(d <= closest.dist && $.inArray(closest.id, Game.log.targetHistory) < 0) {
                closest.dist = d;
                closest.id = i;
            }
        }
        return closest.id;*/
    },
    // track the position of the current quest and draw an arrow on map in radius l and with width u.
    follow: function(target, currentPosition, distFromCurr, arrowWidth, arrowHeight) {
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
            x: currentPosition.x + distFromCurr * direction.x,
            y: currentPosition.y + distFromCurr * direction.y
        };
        var e_1 = {
            x: currentPosition.x - arrowWidth * normal.x + arrowHeight * direction.x,
            y: currentPosition.y - arrowWidth * normal.y + arrowHeight * direction.y
        };
        var e_2 = {
            x: currentPosition.x + arrowWidth * normal.x + arrowHeight * direction.x,
            y: currentPosition.y + arrowWidth * normal.y + arrowHeight * direction.y
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
        var pos = recalculatePosition();
        this.log.currentTarget = Quest.acquire(duration, pos);
        var cq = this.log.currentTarget;
        while(cq == this.log.currentTarget) {

        }
    }
};