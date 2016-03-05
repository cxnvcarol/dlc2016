/**
 * Created by mzeyen on 3/5/16.
 */
var RandomEncountersGenerator = {
    // constructor
    initialize: function() {
        // empty
    },
    // get random number between [0, 100[
    getMonster: function() {
        percentage = Math.floor(Math.random() * 100);
        if(percentage >= 60.0) {
            return monsters[Math.random() * monsters.length]
        }
    },
    // monster database
    monsters: [
        {
            name: 'WeakMonster',
            strength: 1,
            health: 20
        },
        {
            name: 'StrongMonster',
            strength: 2,
            health: 30
        }
    ]

};