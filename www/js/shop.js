/**
 * Created by mzeyen on 3/5/16.
 */
var Shop = {
    initialize: function(gameObj) {
        this.items = TargetDB.rewards;
        this.log = gameObj.log;
        this.bindItems();
        this.updateAvailability();
    },
    updateAvailability: function() {
        if(this.log.currentPoints < this.items[0].points) {
            $('item1').disable();
        } else {
            $('item1').enable();
        }
        if(this.log.currentPoints < this.items[1].points) {
            $('item2').disable();
        } else {
            $('item2').enable();
        }
    },
    bindItems: function() {
        $('item1').click(function() {
            var item = this.items[0];
            if(this.log.currentPoints >= item.points) {
                this.log.currentPoints -= item.points;
                this.log.currentRewards.push(0);
            } else {
                alert('Not enough points');
            }
        });
        $('item2').click(function() {
            var item = this.items[1];
            if(this.log.currentPoints >= item.points) {
                this.log.currentPoints -= item.points;
                this.log.currentRewards.push(1);
            } else {
                alert('Not enough points');
            }
        });
    },
    showBoughtItems: function() {

    }
}