const characterNames = ['Albedo', 'Alhaitham', 'Aloy', 'Amber', 'Itto', 'Baizhu', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Chongyun', 'Collei', 'Cyno', 'Dehya', 'Diluc', 'Diona', 'Dori', 'Eula', 'Faruzan', 'Fischl', 'Ganyu', 'Gorou', 'Hutao', 'Jean', 'Kazuha', 'Kaeya', 'Ayaka', 'Ayato', 'Kaveh', 'Keqing', 'Kiara', 'Klee', 'K-Sara', 'Shinobu', 'Layla', 'Lisa', 'Mika', 'Mona', 'Nahida', 'Nilou', 'Ningguang', 'Noelle', 'Qiqi', 'Raiden', 'Razor', 'Rosaria', 'Kokomi', 'Sayu', 'Shenhe', 'Heizou', 'Sucrose', 'Childe', 'Thoma', 'Tighnari', 'Aether', 'Lumine', 'Venti', 'Scara', 'Xianglin', 'Xiao', 'Xingqiu', 'Xinyan', 'YaeMiko', 'Yanfei', 'Yaoyao', 'Yelan', 'Yoimiya', 'YunJin', 'Zhongli']
const characterWeapon = [
    { name: "Broom", damage: 7, strength: 3, ammo: 1, type: "Special" },
    { name: "Slipper", damage: 7, strength: 10, ammo: 2, type: "Special" },
    { name: "Belt", damage: 10, strength: 10, ammo: 1, type: "Special" },
    { name: 'Knife', damage: 8, strength: 10, ammo: 1, type: "Slash" },
    { name: 'Grenade', damage: 10, strength: 10, ammo: 1, type: "Throwable" },
    { name: 'Stick', damage: 2, strength: 10, ammo: 1, type: "Slash" },
    { name: 'Ak47', damage: 10, strength: 10, ammo: 30, type: "Gun" },
    { name: 'Dynamite', damage: 20, strength: 10, ammo: 1, type: "Throwable" },
    { name: 'Sword', damage: 7, strength: 10, ammo: 1, type: "Slash" },
    { name: 'Spear', damage: 7, strength: 10, ammo: 1, type: "Slash" },
    { name: 'WaterBucket', damage: 1, strength: 1, ammo: 1, type: "Special" },
    { name: 'HandGun', damage: 20, strength: 10, ammo: 12, type: "Gun" }
]

const skills = [
    //Heal
    { skillname: 'Not Today', skillType: 'Heal', skillValue: 50, target: 'self' },
    { skillname: 'Power Heal', skillType: 'Heal', skilldamage: 100, target: 'all' },
    { skillname: 'Drink Water', skillType: 'Heal', skilldamage: 20, target: 'all' },
    //Damage
    { skillname: 'Explosion', skillType: 'Damage', skillValue: 20, target: 'all' },
    { skillname: 'God Blast U', skillType: 'Damage', skilldamage: 30, target: 'oponent' },
    { skillname: 'Kamekaze', skillType: 'Damage', skilldamage: 50, target: 'all' },
    //Stun
    { skillname: 'Think fast', skillType: 'Stun', skilldamage: 5, duration: 2, target: 'oponent' },
    { skillname: 'Taste the rainbow', skillType: 'Stun', skilldamage: 5, duration: 1, target: 'all' },
    { skillname: 'Why u so fat', skillType: 'Stun', skilldamage: 1, duration: 1, target: 'oponent' },
]

const locations = ['Monstaldt', 'Liyue', 'Inuzuma', 'Sumeru', 'Fountain']
const charMindState = ['Happy', 'Sad', 'Powerful', 'Playful', 'Lucky', 'Dead', 'Hungry', 'Unlucky', 'Horny', 'Feard', 'Greedy']

let characterOnField = {}

function generateWeapon() {
    let newWeapon = characterWeapon[Math.floor(Math.random() * (characterWeapon.length - 1))]
    newWeapon.strength = Math.floor(Math.random() * 100)
    if (newWeapon.type == 'Gun') {
        newWeapon.ammo = Math.floor(Math.random() * 50)
    } else if (newWeapon.type == 'Throwable') {
        newWeapon.ammo = Math.floor(Math.random() * 10)
    }
    return newWeapon
}

function addCharacters() {
    if (Object.keys(characterOnField).length == characterNames.length) {
        alert('Maximum characters reached')
    } else {
        let name = characterNames[Math.floor(Math.random() * (characterNames.length - 1))]
        let mind = charMindState[Math.floor(Math.random() * (charMindState.length - 1))]
        while (characterOnField.hasOwnProperty(name)) {
            name = characterNames[Math.floor(Math.random() * (characterNames.length - 1))]
        }
        let health = 100
        let startingweapon = []

        let weaponCount = Math.floor(Math.random() * 1)
        //Check Mind condition
        if (mind == 'Dead') {
            health = 1
        } else if (mind == 'Horny') {
            health = 69
        } else if (mind == 'Unlucky') {
            health = Math.floor(Math.random() * 50)
            startingweapon.push(characterWeapon[10])
            weaponCount = -1
        } else if (mind == 'Greedy') {
            health = 150
            weaponCount = 4
        }

        for (let i = 0; i <= weaponCount; i++) {
            startingweapon.push(generateWeapon())
        }

        const characterData = {
            charName: name,
            charHealth: health,
            charWeapon: startingweapon,
            skillDetail: skills[Math.floor(Math.random() * (skills.length - 1))],
            skill1: true,
            skill2: false,
            passive: true,
            currentLocation: locations[Math.floor(Math.random() * (locations.length - 1))],
            mindState: mind,
            kill: 0,
            run: 0,
        }
        characterOnField[name] = characterData

        var newCharacter = document.createElement('div')
        var parent = document.querySelector('.charactersBox')

        newCharacter.className = 'characterBox'
        newCharacter.style.setProperty = '--i:0.1s'
        newCharacter.classList.add(name)
        newCharacter.innerHTML = `
    <div class="headData">
        <p class="name">${characterData.charName}</p>
        <div class="health ${characterData.charHealth < 75 ? characterData.charHealth < 25 ? "healthLow" : "healthDown" : ""}" data-percent="${characterData.charHealth}" style="--h:${characterData.charHealth}%"></div>
    </div>
    <div class="weaponData">
        ${characterData.charWeapon.map((data) => `<p class="weapon">${data.name == null ? "" : data.name}</p>`).join(' ')}
        
    </div>
    <div class="skillData">
        <div class="skillPoint ${characterData.skill1 == true ? "skillon" : ""} ${characterData.skillDetail.skillType == 'Damage' ? "DamageType" : characterData.skillDetail.skillType == 'Heal' ? "HealType" : "StunType"}"></div>
        <div class="skillPoint ${characterData.skill2 == true ? "skillon" : ""}""></div>
    </div>    
    `
        parent.prepend(newCharacter)
        newCharacter.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

        // update Data
        updateCounts()
    }
}

window.addEventListener("load", () => {
    for (let i = 0; i < 5; i++) {
        addCharacters()
    }
    updateCounts()

    var counter = 0;
    var i = setInterval(function () {
        generateEvents()
        counter++;
        if (counter === 1000) {
            clearInterval(i);
        }
    }, 2000);
});

function updateCounts() {
    document.querySelector('.totalCount').innerHTML = Object.keys(characterOnField).length
    let lc = 0, dc = 0
    const keys = Object.keys(characterOnField);
    keys.forEach((key) => {
        if (characterOnField[key].charHealth != 0) {
            lc++
        } else {
            dc++
        }
    })
    document.querySelector('.aliveCount').innerHTML = lc
    document.querySelector('.deadCount').innerHTML = dc
}

function scrollToElement(dir) {
    const scrollTo = document.querySelectorAll('.characterBox')
    if (dir == 'up') {
        scrollTo[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    } else {
        scrollTo[scrollTo.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
}

const events = [
    { eventType: 'search', eventIcon: 'travel_explore', eventText: 'Klee found some grenades.' },
    { eventType: 'skill', eventIcon: 'playing_cards', eventText: 'Klee Used Explosion to demolish Kazuha.' },
    { eventType: 'heal', eventIcon: 'health_and_safety', eventText: 'Kazuha Used Heal.' },
    { eventType: 'kill', eventIcon: 'skull', eventText: 'Klee killed Kazuha with a Grenade.' },
    { eventType: 'challenge', eventIcon: 'comic_bubble', eventText: 'Raiden challenged Klee to a battle.' },
    { eventType: 'run', eventIcon: 'podiatry', eventText: 'Klee ran away' },
]

function generateEvents() {
    var newEvent = document.createElement('div')
    var parent = document.querySelector('.eventsContainer')
    let theEvent = events[Math.floor(Math.random() * (events.length - 1))]

    newEvent.className = 'event'
    newEvent.classList.add(theEvent.eventType)
    newEvent.innerHTML = `
        <span class="material-symbols-outlined">
            ${theEvent.eventIcon}
        </span>
        <p>${theEvent.eventText}</p>
        <p>${displayTime()}</p>
    `
    parent.prepend(newEvent)
}

function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if(hours>12){
        hours = hours - 12;
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds;
    return str;
}