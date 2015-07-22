var upgradesList = [
    {
        id: "upgrade-book",
        name: "Book",
        cost: 10,
        costMultiplier: 1.3, // amount by which cost is multiplied with each upgrade
        clickGain: 1,
        idleGain: 0,
        level: 0,
        playerLevelIncrease: 1  // how much buying this upgrade increases player's level
    },
    {
        id: "upgrade-training",
        name: "Training",
        cost: 25,
        costMultiplier: 1.3, // amount by which cost is multiplied with each upgrade
        clickGain: 2,
        idleGain: 0,
        level: 0,
        playerLevelIncrease: 1  // how much buying this upgrade increases player's level
    },
    {
        id: "upgrade-course",
        name: "Programming course",
        cost: 100,
        costMultiplier: 1.3,
        clickGain: 3,
        idleGain: 0,
        level: 0,
        playerLevelIncrease: 2
    },
    {
        id: "upgrade-coop",
        name: "Coop group",
        cost: 50,
        costMultiplier: 1.3,
        clickGain: 0,
        idleGain: 1,
        level: 0,
        playerLevelIncrease: 1
    }
];

var upgradesAmount = upgradesList.length;



var Upgrades = {
    build: function() {
        for(var i=0; i < upgradesAmount; ++i)
        {
            var upgrade = document.createElement("div");
            $(upgrade).addClass("upgrade");
            $(upgrade).attr("id", upgradesList[i].id);

            var cost = document.createElement("div");
            $(cost).addClass("cost");
            $(cost).text("$"+upgradesList[i].cost);

            var name = document.createElement("div");
            $(name).addClass("name");
            $(name).text(upgradesList[i].name + " " + (upgradesList[i].level+1));

            var effect = document.createElement("div");
            $(effect).addClass("effect");
            if(upgradesList[i].clickGain > 0)
                $(effect).text("+" + upgradesList[i].clickGain + " pts/click");

            if(upgradesList[i].idleGain > 0)
                $(effect).text("+" + upgradesList[i].idleGain + " pts/sec");

            $(upgrade).append(cost);
            $(upgrade).append(name);
            $(upgrade).append(effect);
            $(upgrade).click(this.clickUpgrade);
            $("#upgradesList").append(upgrade);
        }
    },

    updateUpgrade: function(upgradeNumber) {
        var upgrade = document.getElementById(upgradesList[upgradeNumber].id), upgradeChildren = upgrade.childNodes;

        console.log(upgradesList[upgradeNumber].cost);
        // Cost
        $(upgradeChildren[0]).text("$" + upgradesList[upgradeNumber].cost);

        // Name
        $(upgradeChildren[1]).text(upgradesList[upgradeNumber].name + " " + (upgradesList[upgradeNumber].level+1));

        //Effect
        if(upgradesList[upgradeNumber].clickGain > 0)
            $(upgradeChildren[2]).text("+" + upgradesList[upgradeNumber].clickGain + " pts/click");

        if(upgradesList[upgradeNumber].idleGain > 0)
            $(upgradeChildren[2]).text("+" + upgradesList[upgradeNumber].idleGain + " pts/sec");
    },

    updateAll: function() {
        for(var i=0; i < upgradesAmount; ++i)
            this.updateUpgrade(upgradesList[i].id);
    },

    clickUpgrade: function() {
        var upgradeNumber = 0;
        for(var i=0; i < upgradesAmount; ++i)
        {
            if(upgradesList[i].id == $(this).attr("id"))
            {
                upgradeNumber = i;
                break;
            }
        }

        if(cash >= upgradesList[upgradeNumber].cost)
        {
            // Can afford
            Player.clickPower += upgradesList[upgradeNumber].clickGain;
            Player.idlePower += upgradesList[upgradeNumber].idleGain;
            updatePower();

            Player.level += upgradesList[upgradeNumber].playerLevelIncrease;

            cash -= upgradesList[upgradeNumber].cost;
            updateCash();

            upgradesList[upgradeNumber].cost = Math.round(upgradesList[upgradeNumber].cost * upgradesList[upgradeNumber].costMultiplier);
            ++upgradesList[upgradeNumber].level;

            Upgrades.updateUpgrade(upgradeNumber);
        }
        else
        {
            // Insufficient funds
        }
    }
};