const characterNames = ['Albedo','Alhaitham','Aloy','Amber','Itto','Baizhu','Barbara','Beidou','Bennett','Candace','Chongyun','Collei','Cyno','Dehya','Diluc','Diona','Dori','Eula','Faruzan','Fischl','Ganyu','Gorou','Hutao','Jean','Kazuha','Kaeya','Ayaka','Ayato','Kaveh','Keqing','Kiara','Klee','K-Sara','Shinobu','Layla','Lisa','Mika','Mona','Nahida','Nilou','Ningguang','Noelle','Qiqi','Raiden','Razor','Rosaria','Kokomi','Sayu','Shenhe','Heizou','Sucrose','Childe','Thoma','Tighnari','Aether','Lumine','Venti','Scara','Xianglin','Xiao','Xingqiu','Xinyan','YaeMiko','Yanfei','Yaoyao','Yelan','Yoimiya','YunJin','Zhongli']
const characterWeapon = ['Broom','Slipper','Belt','Knife','Grenade','Stick','Ak47','Dynamite','Sword','Spear','WaterBucket','HandGun']

let characterOnField = {}

function addCharacters() {
    let name =  characterNames[Math.round(Math.random()*characterNames.length-1)]
    
    // console.log(characterOnField.hasOwnProperty(name))

    while(characterOnField.hasOwnProperty(name)){
        name =  characterNames[Math.round(Math.random()*characterNames.length-1)]
    }

    let health = Math.round(Math.random() * 100)
    let startingweapon = characterWeapon[Math.round(Math.random()*characterWeapon.length)]
    const characterData = {
        charName : name,
        charHealth : health,
        charWeapon : [startingweapon],
        skill1 : true,
        skill2: false,
        passive: true,
    }
    characterOnField[name] = characterData
    console.log(characterData)

    var newCharacter = document.createElement('div')
    var parent = document.querySelector('.charactersBox')

    newCharacter.className='characterBox'
    newCharacter.style.setProperty ='--i:0.1s'
    newCharacter.classList.add(name)
    newCharacter.innerHTML=`
    <div class="headData">
        <p class="name">${characterData.charName}</p>
        <div class="health ${characterData.charHealth<75?characterData.charHealth<25?"healthLow":"healthDown":""}" data-percent="${characterData.charHealth}" style="--h:${characterData.charHealth}%"></div>
    </div>
    <div class="weaponData">
        <p class="weapon">${characterData.charWeapon[0]}</p>
    </div>
    <div class="skillData">
        <div class="skillPoint ${characterData.skill1==true?"skillon":""}"></div>
        <div class="skillPoint ${characterData.skill2==true?"skillon":""}""></div>
    </div>    
    `
    parent.prepend(newCharacter)
    newCharacter.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

    // update Data
    updateCounts()
}

window.addEventListener("load", (event) => {
    for (let i = 0; i < 5; i++) {
        addCharacters()
    }
    console.log(characterOnField)
    updateCounts()
});

function updateCounts(){
    document.querySelector('.totalCount').innerHTML = Object.keys(characterOnField).length
    let lc=0,dc = 0
    const keys = Object.keys(characterOnField);
    keys.forEach((key)=>{
        if(characterOnField[key].charHealth != 0){
            lc++
        }else{
            dc++
        }
        console.log(`${key}: ${characterOnField[key].charHealth}`);
    })
    console.log(lc)
    document.querySelector('.aliveCount').innerHTML = lc
    document.querySelector('.deadCount').innerHTML = dc
}

function scrollToElement(dir){
    const scrollTo = document.querySelectorAll('.characterBox')
    console.log(scrollTo)
    if(dir == 'up'){
        scrollTo[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }else{
        scrollTo[scrollTo.length-1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
}