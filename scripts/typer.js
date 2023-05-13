//instance variables
var timerVis = false
var timer = document.getElementById("time");
let startTime = 60;
var textDisplay = document.getElementById("genText");
var inputText = document.getElementById("typeBox");
var score = 0;
var charTyped = 0;
var wordsTyped = 0;
var docScore = document.getElementById("Score");
var text = "";
var opaqueBackground = document.getElementById("typeSpace");
var checkbox = document.getElementById("checkbox");
var LPM = document.getElementById("LPM");
var WPM = document.getElementById("WPM");
var chart = document.getElementById("myChart");
var gameContent = document.getElementById("gameContent");
var typed = false;
var x=0;
var i=0;
var light=true;
var easyMode = document.getElementsByClassName("difficultyChoice")[0];
var medMode = document.getElementsByClassName("difficultyChoice")[1];
var hardMode = document.getElementsByClassName("difficultyChoice")[2];
var background = document.getElementById("background");
var gameChoiceBtn = document.getElementById("gameChoiceBtn");
var gameSelect = document.getElementById("gameSelect");
var dif = "hard";
var isMusic = true;
var floatWords = document.getElementById('floatyCircles').getElementsByTagName('li');
var floatItem = document.getElementsByClassName("word");
const wordArr1 = ["String", "Listen", "Keyboard", "Cloud", "Piano", "Headset", "Note", "Sound", "Volume", "Lyric"];
const wordArr2 = ["Apple", "Banana", "Carrot", "Diamond", "Earth", "Fire", "Gorilla", "Helmet", "Iceberg", "Jackal"];

//Initalizes Game on Start
function startGame() {
    if(timerVis) {
        timer.style.display = "none";
        timerVis = false;
    }
    if(startTime<=0){
        canvasDiv.style.display = "none";
        var helpText = document.getElementById("helpText");
        if(helpText.style.display == "block") {
            helpText.style.display = "none";
        }
        i=0;
        score = 0;
        docScore.innerText = "SCORE";
        textDisplay.innerText = "";
        inputText.style.display = "inline-block";
        LPM.innerText = "LPM";
        WPM.innerText = "WPM";
        startButton.innerHTML = "START";
        startTime = 60;
        timer.style.display = "block";
        timerVis = true;
        text = getRandomText();
        returnSnippet(text);
        var itv1 = setInterval(function countDown() {
            startTime--;
            timer.innerHTML = "TIME: " + startTime;
            if(startTime <= 0 || startTime < 1)
            {
                clearInterval(itv1);
                textDisplay.innerText = "TIMES UP!";
                inputText.style.display = "none";
                LPM.innerText = "LPM " + charTyped;
                WPM.innerText = "WPM " + wordsTyped;
                startButton.innerHTML = "PLAY AGAIN";
                canvasDiv.style.display = "block";
                gameContent.style.marginTop = "65px";
            }
        }, 1000);
    }
    else {
        timer.style.display = "block";
        timerVis = true;
        text =  getRandomText();
        returnSnippet(text);
        var itv1 = setInterval(function countDown() {
            startTime--;
            timer.innerHTML = "TIME: " + startTime;
            if(startTime == 1){
                endWordCount();
            }
            if(startTime <= 0 || startTime < 1)
            {
                clearInterval(itv1);
                textDisplay.innerText = "TIMES UP!";
                inputText.style.display = "none";
                LPM.innerText = "LPM " + charTyped;
                WPM.innerText = "WPM " + wordsTyped;
                startButton.innerHTML = "PLAY AGAIN";
                gameContent.style.marginTop = "65px";
                canvasDiv.style.display = "block";
            }
        }, 1000);
    }
}

//Score and type-checking functionality
inputText.addEventListener("input", () => {
    var disText = textDisplay.querySelectorAll('span');
    var inputCharacters = inputText.value.split('');
    disText.forEach((disCharacter, pos) => {
        var inputChar = inputCharacters[pos];
        if(inputChar == null)
        {
            disCharacter.classList.remove("correct");
            disCharacter.classList.remove("incorrect");
            typed = false;
        }
        else if(inputChar == disCharacter.innerText)
        {
            disCharacter.classList.add("correct");
            disCharacter.classList.remove("incorrect");
            score++;
            typed = true;
        }
        else 
        {
            disCharacter.classList.remove("correct");
            disCharacter.classList.add("incorrect");
            score--;
            typed = true;
        }
        docScore.innerText = "SCORE " + score;
    })
    if (typed) 
    {
        returnSnippet(text);
        disText.forEach((disCharacter, pos) => {
            var inputChar = inputCharacters[pos];
            if(inputChar == " ") 
            {
                wordsTyped++;
            }
        })
    }
    charTyped++;
})

//Retrieves User Word Count
function endWordCount() {
    var disText = textDisplay.querySelectorAll('span');
    var inputCharacters = inputText.value.split('');
    disText.forEach((disCharacter, pos) => {
        var inputChar = inputCharacters[pos];
        if(inputChar == " ") 
        {
            wordsTyped++;
        }
    })
}

//Returns snippet of text from storage for user to type
function returnSnippet(text) {
    var newText = text.split(' ').slice(i, i+=20).join(' ');
    i+=20;
    textDisplay.innerText = null;
    inputText.value = null;
    var periodFound = false;
    newText.split('').forEach(character => {
        const newSpan = document.createElement('span');
        newSpan.innerText = character;
        if(periodFound)
        {
            periodFound = false;
            newSpan.style.display = "inline-block";
            newSpan.style.width = "5px";
        }
        if(character == ".")
        {
            periodFound = true;
        }
        textDisplay.appendChild(newSpan);
    })
}

//Animation for light-mode
function lightMode() {
    if(light)
    {
        opaqueBackground.style.backgroundColor =  "rgb(0 0 0 / 33%)";
        light = false;
    }
    else 
    {
        opaqueBackground.style.backgroundColor = "rgba(255, 255, 255, 0.358)";
        light = true;
    }
}

//Keeps track of diffcutly selected
function chooseDifEasy() {
    dif ="easy";
    background.style.background = "#4ec864";
    gameChoiceBtn.style.background = "#4ec864";
}
function chooseDifMed() {
    dif = "med";
    background.style.background = "orange";
    gameChoiceBtn.style.background = "orange";
}
function chooseDifHard() {
    dif = "hard";
    background.style.background = "#c84e4e";
    gameChoiceBtn.style.background = "#c84e4e";
}

//keeps track of game mode selected
function gameModeSelect(){
    if(isMusic) {
        isMusic = false;
        for(var i=0;i<10;i++) {
            var img = document.getElementsByClassName("img")[i];
            // floatyWords.fontSize = 0;
            img.style.display = "none";
            var img2 = document.getElementsByClassName("img2")[i];
            img2.style.display = "block";
            floatItem[i].innerHTML = wordArr2[i];
        }

    }
    else {
        isMusic = true;
        
        for(var i=0;i<10;i++) {
            var img = document.getElementsByClassName("img")[i];
            img.style.display = "block";
            var img2 = document.getElementsByClassName("img2")[i];
            img2.style.display = "none";
            floatItem[i].innerHTML = wordArr1[i];
        }
    }
}

//gets randome Text based on game modes from the arrays below.
function getRandomText() {
    if(dif=="easy" && isMusic) {
        return easySongs[randomNum(0,2)];
    }
    else if(dif=="med" && isMusic) {
        return medSongs[randomNum(0,2)];
    }
    else if(dif=="hard" && isMusic) {
        return hardSongs[randomNum(0,2)];
    }
    else if(dif=="easy" && !isMusic) {
        return easyWords[randomNum(0,2)];
    }
    else if(dif=="med" && !isMusic) {
        return medWords[randomNum(0,2)];
    }
    else if(dif=="hard" && !isMusic) {
        return hardWords[randomNum(0,2)];
    }

}

//returns random number between a range
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Storage of Songs and Texts for User to Type
const easySongs = ["I've never seen a diamond in the flesh. \
I cut my teeth on wedding rings in the movies. \
And I'm not proud of my address. \
In a torn up town, no postcode envy. \
But every song's like. \
Gold teeth, Grey Goose, trippin' in the bathroom. \
Bloodstains, ball gowns, trashin' the hotel room. \
We don't care. \
We're driving Cadillacs in our dreams .\
But everybody's like. \
Cristal, Maybach, diamonds on your timepiece. \
Jet planes, islands, tigers on a gold leash. \
We don't care. \
We aren't caught up in your love affair. \
And we'll never be royals (royals). \
It don't run in our blood. \
That kind of luxe just ain't for us. \
We crave a different kind of buzz. \
Let me be your ruler (ruler). \
You can call me queen bee. \
And baby, I'll rule (I'll rule, I'll rule, I'll rule). \
Let me live that fantasy.",

"Shine bright like a diamond. \
Shine bright like a diamond. \
Find light in the beautiful sea. \
I choose to be happy. \
You and I, you and I. \
We're like diamonds in the sky. \
You're a shooting star I see. \
A vision of ecstasy. \
When you hold me, I'm alive. \
We're like diamonds in the sky. \
I knew that we'd become one right away. \
Oh, right away. \
At first sight I felt the energy of sun rays. \
I saw the life inside your eyes. \
So shine bright, tonight, you and I. \
We're beautiful like diamonds in the sky. \
Eye to eye, so alive. \
We're beautiful like diamonds in the sky.",

"Right, my yiy just changed. \
You just buzzed the front gate. \
I thank God you came. \
How many more days could I wait?. \
I made plans with you. \
And I won't let em fall through. \
I, I, I, I, I. \
I think I'd lie for you. \
I think I'd die for you. \
Jodeci Cry For You. \
Do things when you want me to. \
Like controlla, controlla. \
Yeah, like controlla, controlla. \
Yeah, okay, you like it. \
When I get, aggressive, tell you to. \
Go slower, go faster. \
Like controlla, controlla. \
Yeah, like controlla, controlla."

];

const medSongs = ["Sometimes, all I think about is you. \
Late nights in the middle of June. \
Heat waves been fakin’ me out. \
Can’t make you happier now. \
Sometimes, all I think about is you. \
Late nights in the middle of June. \
Heat waves been fakin’ me out. \
Can’t make you happier now. \
Usually I put somethin’ on TV. \
So we never think about you and me. \
But today I see our reflections clearly. \
In Hollywood, layin’ on the screen. \
You just need a better life than this. \
You need somethin’ I can never give. \
Fake water all across the road. \
It’s gone now, the night has come, but. \
Sometimes all I think about is you. \
Late nights in the middle of June. \
Heat waves been fakin’ me out. \
Can’t make you happier now.",

"Turn up the radio. \
Blast your stereo. \
Right now. \
This joint is fizzlin. \
It's sizzlin. \
Right. \
Yo check this out right here. \
Dude wanna hate on us (dude). \
Dude need to ease on up (dude). \
Dude wanna act on up. \
But dude get shut like flava shut (down). \
Chick say she ain't down. \
But chick backstage when we in town (ha). \
She like man on drum (boom). \
She wanna hit n' run (err). \
Yeah, that's the speed. \
That's who we do. \
That's who we be. \
B-L-A-C-K E-Y-E-D P to the E. \
Then the A to the S. \
When we play you shake your ass. \
Shake it, shake it, shake it girl. \
Make sure you don't break it, girl. \
Cause we gonna.",

"I love the way you walk into the room. \
Body shining lightin' up the place. \
And when you talk, everybody stop. \
'Cause they know you know just what you sayin. \
The way that you protect your friends. \
Baby I respect you for that. \
And when you grow you'll take everyone you love along. \
I love that stuff. \
Don't fly me away. \
Don't need to buy a diamond key to unlock my heart. \
You shelter my soul, you're my fire when I'm cold. \
I want you to know. \
You had me at hello. \
Hello, hello. \
'Cause you had me at hello. \
Hello, hello. \
'Cause it was many years ago. \
Baby when you stole my cool. \
'Cause you had me at hello. \
Hello, hello. \
I get so excited when you travel with me. \
Baby while I'm on my grind. \
And never will I ever let my hustle. \
Come between me and my family time and. \
You keep me humble, I like this type. \
'Cause you know there's more to life. \
And if I need ya, you will be here. \
You will make the sacrifice."
];

const hardSongs = ["Si, sabes que ya llevo un rato mirandote. \
Tengo que bailar contigo hoy. \
Vi que tu mirada ya estaba llamandome. \
Muestrame el camino que yo voy. \
Oh, tu, tu eres el iman y yo soy el metal. \
Me voy acercando y voy armando el plan \
Solo con pensarlo se acelera el pulso. \
Ya, ya me estas gustando más de lo normal \
Todos mis sentidos van pidiendo mas. \
Esto hay que tomarlo sin ningun apuro \
Despacito. \
Quiero respirar tu cuello despacito. \
Deja que te diga cosas al oido. \
Para que te acuerdes si no estás conmigo. \
Despacito.", 

"This flippity dippity-hippity hip-hop. \
You don't really wanna get into a pushin' match. \
With this rappity brat, packin' a MAC in the back of the Ac'. \
Backpack rap crap, yap-yap, yackety-yack. \
And at the exact same time, I attempt these lyrical acrobat stunts while I'm practicin' that. \
I'll still be able to break a fricken' table. \
Over the back of a couple of maggots and crack it in half. \
Only realized it was ironic, I was signed to Aftermath after the fact. \
How could I not blow? All I do is drop bombs. \
Feel my wrath of attack \
Rappers are havin' a rough time period, here's a maxi pad. \
It's actually disastrously bad for the wack. \
While I'm masterfully constructing this masterpièce. \
'Cause I'm beginnin' to feel like a Rap God, Rap God. \
All my people from the front to the back nod, back nod. \
Now, who thinks their arms are long enough to slap box, slap box? \
Let me show you maintainin' this shit ain't that hard, that hard. \
Everybody want the key and the secret to rap immortality like Ι have got.",

"Babylon position the queen and set the pawn. \
And start transform like Deceptacon. \
Anytime delegates have a discrepence. \
Well a bare tension with some long weapons. \
Night vision upon the attack mission. \
Colaliton of folly-ticians get switch on. \
If you look in the face of the newly born. \
The newly born face malnutrition. \
Suspicion to what is them ambition. \
Total destruction start to ignition. \
And the world still a fight over religion. \
Everyone have a right to a decision. \
Superstition the people reflect upon, something nuh right. \
I man suspect a con. \
Cause them lost inna darkness beyond. \
And none shall escape except the ones, who. \
Exodus with no question, \
Better put on your khaki uniform."
]

const easyWords = ["The sun finally set. The Goblin Deep \
became darker. The friends moved forward. \
They passed cautiously through the \
shattered doorway. It led into a great hall. \
Elf, sprite, and humans moved in silence, \
keeping near the wall. \
The cold light of the moon shone through \
the towering, stone-framed windows to \
their right. It glittered off the dust on \
the floor. They darted along in silence, \
moving past gaping doors and yawning \
windows. Vortagellan knew that the \
covering shadows could also hide a wellplaced guard. \
A portal to the Otherworld gaped open \
below them. It shone like a jewel. \
Several druids stood before it. Their \
staffs were joined to the shimmering \
disc by bright, blue bands of lights. \
Druid magic cracked and fizzed noisily. \
The druids were in a deep trance. They \
chanted spells to keep the portal open. \
Fairy folk—sprites, fauns, and goblins— \
streamed in and out of the doorway to the \
Otherworld. Lillian gasped in surprise. All \
of these little creatures were carrying full \
sacks on their backs.",
"One day when the mother goat was out, \
her kids heard a gruff voice outside. \
Open the door, said the gruff voice. \
Your mother is home with food. \
The little kids were hungry, but they \
remembered their mother’s warning. \
You are not our mother, they \
bleated. Your voice is too gruff! \
The wolf went away and chewed \
on a lump of chalk to make his \
voice softer. Then he returned \
to the goats’ cottage. \
The wolf went away and rubbed chalk on \
his feet. He returned to the cottage a third \
time. \
My little treasures, it’s your mother with \
yummy treats. \
The kids saw the white feet, heard the soft \
voice, and flung the door open. The wolf \
chased the terrified kids, catching them \
one by one and putting them in a sack. \
When he caught the sixth kid, he threw the \
sack over his shoulder and made for his lair. \
The seventh, smallest kid remained hidden. \
When the mother goat returned, she found \
the frightened kid and left at once to find \
the others.",
"Under a spreading chestnut-tree \
The village smithy stands \
The smith, a mighty man is he, \
With large and sinewy hands; \
And the muscles of his brawny arms \
Are strong as iron bands. \
His hair is crisp, and black, and long, \
His face is like the tan; \
His brow is wet with honest sweat, \
He earns whate’er he can, \
And looks the whole world in the face, \
For he owes not any man. \
Week in, week out, from morn till night, \
You can hear his bellows blow; \
You can hear him swing his heavy sledge, \
With measured beat and slow, \
Like a sexton ringing the village bell, \
When the evening sun is low. \
And children coming home from school \
Look in at the open door; \
They love to see the flaming forge, \
And hear the bellows roar, \
And catch the burning sparks that fly \
Like chaff from a threshing-floor."];
const medWords = ["A rat is a rodent, the most common mammal in the world. \
Rattus norvegicus is one of \
the approximately four hundred different kinds of rodents, \
and it is known by many names, \
each of which describes a trait or a perceived trait or sometimes a habitat: \
the earth rat, the roving rat, the barn rat, the field rat, the migratory rat, \
the house rat, the sewer rat, the \
water rat, the wharf rat, the alley rat, the gray rat, the brown rat, \
and the common rat. The average brown rat is large and stocky; it grows to be approximately \
sixteen inches long from its nose to its tail—the size of a large adult human male’s \
foot—and weighs about a pound, though brown rats have been measured by scientists and exterminators at twenty \
inches and up to two pounds. The brown rat is sometimes confused with the black rat, or \
Rattus rattus, which is smaller and once inhabited New York City and all of the cities of \
America but, since Rattus norvegicus pushed it out, is now relegated to a minor role.",
"At twelve I was an avid consumer of comic books—Supergirl being my favorite. I \
spent my allowance of a quarter a day on two twelve-cent comic books or a double issue \
for twenty-five. I had a stack of Legion of Super Heroes and Supergirl comic books in \
my bedroom closet that was as tall as I. I had a recurring dream in those days: that I had \
long blond hair and could fly. In my dream I climbed the stairs to the top of our apartment \
building as myself, but as I went up each flight, changes would be taking place. Step by \
step I would fill out: my legs would grow long, my arms harden into steel, and my hair \
would magically go straight and turn a golden color. . . . Supergirl had to be aerodynamic. \
Sleek and hard as a supersonic missile. Once on the roof, my parents safely asleep in their \
beds, I would get on tip-toe, arms outstretched in the position for flight and jump out my \
fifty-story-high window into the black lake of the sky. From up there, over the rooftops, I \
could see everything, even beyond the few blocks of our barrio;1 with my X-ray vision I \
could look inside the homes of people who interested me. Once I saw our landlord, whom \
I knew my parents feared, sitting in a treasure-room dressed in an ermine coat and a large \
gold crown.",
"There were no milk deliveries to residences on Saturdays, just to commercial businesses, \
and there were relatively few of these in the Borough. My father would finish his deliveries \
early, then swing by the house for Bobby Marconi and me so we could “surf the truck.” The \
empty metal milk crates were by then stacked and roped off against the side panels to prevent \
them from sliding and bouncing around when he turned corners. His careful stacking left \
most of the back empty, and Bobby and I would stand in the space created, our feet planted \
firmly on the ribbed floor, and pretend to surf, our arms out at our sides to keep our balance \
as the truck rattled along the wide Borough streets. I always surfed in the forward position, \
an advantage because you could see the turns coming. Bobby, as athletic in the milk truck \
as he was elsewhere, surfed more or less blind behind me."]; 
const hardWords = ["To Terry Fox, the one-legged runner whose \
life was the antithesis of self-aggrandizement, the thought he would be the first \
Canadian depicted on a circulating coin \
would be considered loony. \
Fox asked every Canadian for a dollar \
toward cancer research when he dipped his \
prosthesis into the frigid waters of St. John’s \
harbour on April 12, 1980, and began his \
cross-Canada marathon. \
In 2005, that small change has added up to \
more than $360 million through the annual \
Terry Fox Marathon of Hope across Canada \
and worldwide. \
To mark the 25th anniversary of the run, the \
Royal Canadian Mint unveiled a one-dollar \
commemorative circulation coin Monday on \
the campus of Simon Fraser University. Fox \
was an undergraduate student and basketball \
player at SFU when a malignant tumour was \
discovered in his right leg in 1977. It resulted \
in amputation. A bronze statue of Fox, one of \
many such tributes across Canada, looks \
over the academic quadrangle of the \
university, just a short stroll from the theatre \
where Monday’s unveiling was held. ",
"Many Canadians are aware that problems \
with the nation’s health care system have \
resulted in a lack of hospital beds and \
medical equipment, overcrowded emergency \
rooms, long surgical and diagnostic waiting \
lists, and not enough long term care homes. \
But with 3.6 million Canadians unable to find \
a family doctor, a particularly insidious1 and \
growing problem is making itself evident. \
The family doctor is the cornerstone of the \
nation’s health care system. The vast majority \
of Canadians have said many times over that \
they want their family doctor to be their first \
point of contact in the health care system. \
Nevertheless, family doctors are becoming a \
dying breed. With diminishing access to that \
first point of contact, many Canadians in \
need of medical help are finding it \
increasingly difficult to receive timely and \
appropriate care. In my province of British \
Columbia, the conservative estimate is that \
200,000 British Columbians looking for a \
family doctor cannot find one.",
"But the ecstatic, eleven-year-old quiver in her voice, and the way she pirouetted on her bare toes as he \
led the horse out of the buggy shafts, made him feel that perhaps in picking up the poster he had been \
unworthy of his own seventeen years; so with an offhand shrug he drawled, “Everybody said it \
wouldn’t amount to much. A few ponies and an elephant or two—but what’s an elephant?” \
 3 She wheeled from him, resenting his attempt to scoff away such wonders. The bit of poster had spun a \
new world before her, excited her, given wild, soaring impetus to her imagination; and now, without in \
the least understanding herself, she wanted the excitement and the soaring, even though it might stab \
and rack her. \
 4 It was supper-time, her father just in from the field and turning the horses loose at the water-trough, so \
off she sped to greet him, her bare legs flashing, her throat too tight to cry out, passionate to \
communicate her excitement, to find response. "];