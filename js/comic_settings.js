//comic_settings.js was created by geno7, with much needed assistance from Dannarchy

//this is the main file you'll be messing with to manage and update your comic. most (not all) of the main toggle-able settings are here.

//comic_archive has more settings pertaining to the archive page, and comic_show has settings pertaining to the main place that pages of your comic are displayed.

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 47; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files.
//YOU MUST UPDATE THIS NUMBER EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

// COMIC PAGE SETTINGS
const folder = "img/comics"; //directory of the folder where you keep all the comics
const image = "pg"; //what you'll name all your comic pages
const imgPart = "_"; //special character(s) you put after the page number to subdivide pages into multiple image files (ie pg2_1, pg2_2, etc)
const ext = "png"; //file extension of your comic pages

//THUMBNAIL SETTINGS
const thumbFolder = "img/thumbs"; //directory of the folder where you keep all the thumbnail images for the comics, in case you want the archive page to use thumbnails.
const thumbExt = "png"; //file extension of thumbnails
const thumbDefault = "default"; //name of the default thumbnail that displays when no thumbnail is set, located in the directory you set thumbFolder to.

//NAVIGATION SETTINGS
const navText = ["First", "Previous", "Next", "Last"]; //alt text for your nav images, or just the text that shows up if you're not using images
const navFolder = "img/comicnav"; //directory where nav images are stored
const navExt = "png"; //file extension of nav images
const navScrollTo = "#showComic"; //id of the div you want the page to automatically scroll to when you click to the next comic. will turn off if you delete text between quotation marks

if (pg == 0) {
  pg = maxpg;
} //display MOST RECENT COMIC when the webpage is loaded. if you want to instead have the FIRST COMIC displayed first, change maxpg to 1.

//pgData holds all the parameters for each of your pages. copypaste this and fill out accordingly:
/* 
    {
        pgNum: ,
        title: "",
        date: writeDate([YEAR],[MONTH],[DAY]),
        altText: "",
        imageFiles: "",
        authorNotes: ``
    },
*/
//Note: the formatting is important! The whole thing won't show up if you forget to include the commas or curly braces in the right place.

const pgData = [
  {
    pgNum: 1, //what page number it is
    title: "Break-Up", //the title of the page (leaving this blank will default it to "Page X")
    date: writeDate(2021, 1, 15), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
    altText:
      "Comic in the format of the American Chopper chair-throwing meme.  First panel states: 'he can't be an uke!' 'yes he can he's a twink!'.  Second panel states: 'You're perpetuating the stereotype of youth and femininity in connection to submission!' 'You're overthinking yaoi!'.  Third panel states: 'I'm a top and want more tiny tops' 'I'm a bottom'.", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
    imageFiles: 1, //how many image files this page is split into
    authorNotes: `
            <p>The very first comic.  Though there are societal expectations connected to sexual roles, in the end top/bottom just depends on personal preference.  Let's all find what's most comfortable for us personally!
            `,
  },
  {
    pgNum: 2,
    title: "Name Order",
    date: writeDate(2021, 2, 9),
    altText:
      "A two panel comic.  First panel is a girl with a cat-eared beanie pointing and jeering at a ponytailed girl reading a book.  Beanie girl says 'Haha!  SasuNaru is POOPY.;.  Second panel is a close up of ponytailed girl enraged and snotty.  'It's NARUsasu, binch.;",
    imageFiles: 1,
    authorNotes: `
            <p>When you write my callout post, <a href=
            https://archiveofourown.org/works/29393070
            ">please get the name order correct!</a>  It's a very different ship because of my arbritrary characterizations that go against the popular fanon norm, as expressed by the contrary name order!
            `,
  },
  {
    pgNum: 3,
    title: "Girls and Boys",
    date: writeDate(2021, 3, 1),
    altText:
      "Three panel comic.  First panel depicts two girls in a bed.  A weiner dog lays between them.  Voices from outside ask, 'What do they talk about all night?' 'Boys,probably'.  Second panel focuses on the two girls touching hands, a word bubble from both of them depicts two men, a Spy and a Scout, about to embrace.  The third panel zooms in closer to their mutually depraved faces.  Their thought bubble now depicts the beginning of the two men having intercourse.",
    imageFiles: 1,
    authorNotes: `
            <p>Liv and Sophie are gal pals.  They share a bed.  And they spend all night talking about cute stories they make up for each other.
            `,
  },
  {
    pgNum: 4,
    title: "Idle Hands",
    date: writeDate(2021, 3, 19),
    altText:
      "Three panel comic.  First panel depicts a girl at church with her mom.  The preacher is spewing a lot of words that are almost impossible to read.  The most prominent, largest words are PENETRATING and IMAGE OF CHRIST.  Second panel crops to the girl's head, her brain is opened up literally to show two men, Scout and Spy, about to embrace.  One man is in the image of christ with a leather mask, and the other man is a devil with horns and red hoody.  The third panel depicts the girl smiling, as her thoughts turn to the two men tongue kissing.",
    imageFiles: 1,
    authorNotes: `
            <p>There's no better place to rotate yaoi apples in your brain than church.  All that eternal damnation they warn you about, and all the gratuituous discussion of Jesus's suffering, makes for GREAT conflict in romance stories.
            `,
  },
  {
    pgNum: 5,
    title: "Insomnia",
    date: writeDate(2021, 10, 6),
    altText:
      "Three panel comic.  First panel is Liv in her bed, looking at her phone while the clock says 4am.  She thinks 'Can't sleep...'.  Second panel, she closes her eyes.  'Think Sexy Thoughts.'  Third panel, she rests easy next to Sophie and their weenie.  Her thought bubble is full of Willem Dafoe and Green Goblins.",
    imageFiles: 1,
    authorNotes: `
            <p>Aphantasia must suck if you have ADHD and insomnia.  How do you fall asleep if you can't just conjure up comforting images of your favorite Green Goblin moments?
            `,
  },
  {
    pgNum: 6,
    title: `Melancholy`,
    date: writeDate(2021, 10, 7),
    altText:
      "Three panel comic.  First panel depicts Liv crying incoherently.  Second panel is a parody of the SNES Silver Surfer failure screen with Liv crying in place of the Surfer.  Third panel, she thinks 'at least I have my dignity.' while surrounded by nude photos of Basile on her wall, as well as her computer screen saver being Basile.  There are tissues all over the floor.  A weenie offers Liv a sock.",
    imageFiles: 1,
    authorNotes: `
            <p>Sadness can hit at any time.  Remember who you are, and what you stand for.  Make sure Jill doesn't eat that sock.
            `,
  },
  {
    pgNum: 7,
    title: `Goin' Blind`,
    date: writeDate(2021, 10, 9),
    altText:
      "Two panel comic.  First panel depicts Liv at her laptop, drooling with her headphones on.  Basile is scowling at her, hunched over with his cane and glasses.  He states, 'BAH!  Kids and their computers -- you'll go BLIND!'.  Second panel depicts Liv and Basile on the couch together watching TV and drooling.  Basile is completely zonked out watching the TV screen, covered up with a warm blanket.  Liv has fallen asleep and is snoring.",
    imageFiles: 1,
    authorNotes: `
            <p>Don't let boomers tell you that the computer's bad for your eyes.  Their eyes are already gone from 3am infomercials and old age.
            `,
  },
  {
    pgNum: 8,
    title: `Self Ship (yume)`,
    date: writeDate(2021, 10, 28),
    altText:
      "Two panel comic. Panel 1 shows Liv and Ollie holding Norman Osborn's hand.  Liv: 'I fell in love with the Green Goblin from Spider-Man 2002 when I was 9 years old. I had never seen a more beautiful man.'  Ollie: 'All the other kids made fun of me! 'Ew he's UGLY and OLD!'. They had Justin Timberlake, well, I had my Dafoe!' Panel 2 shows Liv as a mad scientist about to press a button.  Norman Osborn is strapped into his goblinization chamber like Spiderman 2002.  Liv: 'And now that I'm a grown ass man, and gobby is only 3x my age, I can draw this copyrighted character doing anything I want.'  Gobby: 'Cold...'  Liv: 'Back to formula.' Liv: 'I still haven't met a man who can meet my goblin standards.'",
    imageFiles: 1,
    authorNotes: `
                <p>Yumejoshi are self-shippers.  Yume = Dream.  Joshi = Girl.  It's not uncommon for lesbians of the Yume or Fu variety to have crushes on celebrity men, or fictional male characters.  Keep on dreamin', Liv!
                `,
  },
  {
    pgNum: 9,
    title: `Sick Day`,
    date: writeDate(2022, 2, 24),
    altText:
      "Two panel comic. First panel depicts Liv with a thermometer in her mouth and two weenies next to her in bed.  She thinks, 'Why do I feel so poopy?'  Her emails say things like 69 orders to ship TODAY!  420 unread messages!  Take dogs out!  WORLDWIDE DEATH!.  She has hospital bills, and a notice that her house is going to be run over.  Second panel depicts Liv thinking about what she did that week.  She binged ramen and junk food, and spent all night on the computer with vidya games and HTML coding til 4:20 am.  She thinks, 'Couldn't be...'",
    imageFiles: 1,
    authorNotes: `
                    <p>It's hard to keep up with world events and personal stuff.  Especially if world events affect you.  I don't think the human brain was meant to process so much stress, oppression, and information, especially without communal help.  And ESPECIALLY with social media promoting black hole arguments that suck the life out of users while enabling clicks and profits.
                    <p>Stardew Valley is a good videogame to try and destress with, especially multiplayer mode so you can talk to your friends.  
                    `,
  },
  {
    pgNum: 10,
    title: `Cope`,
    date: writeDate(2022, 4, 6),
    altText:
      "Three panel comic.  Liv has recieved a message on social media:'I hate you you suck ur yaoi sux n ur ugly lol'.  She is about to respond with 'KILL YOURS'.  Second panel, she is fuming and sweaty.  She thinks, 'I'm so mad'.  Third panel, she is humping Basile's butt while Basile nonchalantly reads a Good Housekeeping magazine.  She screams 'I'm gonna have sex with my wife.'",
    imageFiles: 1,
    authorNotes: `
                        <p>You may recieve strange messages on social media.  Try not to give in to your evil side.  Just remember that you are very sexy and you have a very sexy wife, and those LOSERS on the other side of the screen can't even get a date with their left hand.
                        `,
  },
  {
    pgNum: 11,
    title: `Le Artiste & Das Model`,
    date: writeDate(2022, 4, 14),
    altText:
      "Six panel comic.  Panel 1: Basile is posed seductively while Liv draws.  Basile states 'Oh, I am so lnoely on zis cold winter night, won't--'.  Liv says 'NOT NOW WOMAN.'  Panel 2: Liv points at her crude nude drawing of Basile.  'I'm making ART.  Wanna be useful?  POSE.'  Basile is unimpressed.  Panel 3:  Basile's sexy be-stocking legs frame Liv at her drawing desk.  Panel 4: Liv draws frantically with her tongue out. Panel 5: Close up on Basile, he pouts, 'How long must I pose like this?'.  Panel 6: Liv scowls at Basile's stiff pose.  'Until I get a GOOD ref for my yaoi.'",
    imageFiles: 1,
    authorNotes: `
                            <p>Do not be afraid to use references for art.  Poses are hard to create in your head, so create them irl.  If you cannot get a photo of yourself, try asking your friends or wife to pose for you.  They may be the perfect inspiration you need to jumpstart your visual story!
                            <p>Thank you to Shane for helping me sketch compositions for the last page with Basile pouting :) Friendship is magic.
                            `,
  },

  {
    pgNum: 12,
    title: `FUN-Damental`,
    date: writeDate(2022, 5, 19),
    altText:
      "Two panel comic.  First panel depics a little girl with a short ponytail crying while reaching out.  A anonymous hand gives her a book with a caterpillar on it, the title stating 'hungry'.  The word bubbles state: 'As a preschooler, I could never sleep during naptime.  I just CRIED cuz I wanted to go home.' 'BUT!  I had a very kind teacher who let me read books instead of forcing government mandated nap time.'  Second panel depicts the same girl, grown up, wearing a smoking robe while reading and smoking a olde timey pipe.  The book she's reading is titled 'The curious lives of cadavers'.  She has two other books next to her: 'Twitter Birds Never Fly', and 'Dick Fight Island'.  Behind her is a portrait of herself sitting on a chair next to the portrait of herself.  There is a fireplace, the light casting dark shadows in the room.  The final word bubble states: 'Thank you for instilling my life-long love of reading'.",
    imageFiles: 1,
    authorNotes: `
                <p>All those book titles are real.  Please peruse quality literature!  <p>Thanks to the couple of good teachers for all your hard work and bending the rules a lil to help lil ADHD (and other possible undiagnnosed mental disorders) kids out.
                `,
  },
  {
    pgNum: 13,
    title: `Art School`,
    date: writeDate(2022, 5, 21),
    altText:
      "Two panel comic.  First panel depicts a girl handing her blind teacher a sculpture of an apple.  The bottom label says RIGHT way to hand in homework.  She says, 'Here's my final sculpture!'  Second panel depicts the same girl and teacher, except now the girl is forcing the teacher to touch her sculpture.  The label reads ' WRONG way to hand in homework.'  The sculpture is of the teacher's head, much like the Lionel Richie video, but this sculpture also has large perky boobies.  The girl states, 'This is how I see you.'",
    imageFiles: 1,
    authorNotes: `
            <p>Guest starring my original characters do nut steel, Tiger Herbie and Lil' Ronnie.
            <p>Some gorl scoutz are not yet married.  Some gorl scouts are less fujoshi and more yumejoshi.  Some gorl scoutz should learn etiquette before showing fanart to their subject!
            <p>Inspired by this one commercial that kept playing a couple years ago, with Lionel Richie presenting a sculpture of himself to Chance the Rapper.
            `,
  },

  {
    pgNum: 14,
    title: `Art School Pt. 2`,
    date: writeDate(2022, 6, 1),
    altText:
      "Two panel comic.  First panel depicts a girl happily texting her concerned teacher on the toilet.  Her text says 'going 2 b late got diahreaa'.  The bottom label says 'RIGHT way to contact teacher'.  Second panel depicts the same girl and teacher, except now the girl is wearing a mask and saying into her phone '..hello...'.  The teacher is in his bed in lingerie and looking very worried.  The label reads ' WRONG way to contact teacher'",
    imageFiles: 1,
    authorNotes: `
            <p>Guest starring my original characters do nut steel, Tiger Herbie and Lil' Ronnie.
            <p>
            How did Lil' Ronnie get her professor's number?!?!  Do cellphones exist in this timeline?!  Aren't they in the 80's!?!  Many questions, none of will be answered.
            <p>By the way, have you visited the new "About" and "Characters" links at the top of the page?  You should, they're fun!
            `,
  },

  {
    pgNum: 15,
    title: `Professional Artist`,
    date: writeDate(2022, 6, 6),
    altText:
      "Two panel comic.  First panel depicts Spider-Man and the Green Goblin kissing while the Goblin has his guts out from  his glider piercing him.  Spider-Man says 'You may have hurt MJ and Aunt May, and you may be my best friend's dad, but I can SAVE YOU with TONGUE-TO-MOUTH resuscitation!'.  Second panel depicts Liv at her desktop computer.  Two weenie dogs stare at her from under her desk.  She's thinking 'how can they NOT give me morbillions?' while typing an e-mail to Willem Dafoe proposing Spider-Man 4. ",
    imageFiles: 1,
    authorNotes: `
    <p>Back to Liv's life.  
    <p>She's a huge fan of Spider-Man 2002, as we all should be.  The great thing about Willem Dafoe is that he's never too old for any role, because he always looked old even when he was young!  And he seems pretty chill with crazy proposals like getting naked and barking on all fours in multiple films.  Do you think he'd like Liv's Spider-Man romance mango?
    <p>One of the things you learn when as a professional artist: do not be afraid to be your genuine self!  Sure you'll get rejected a lot... but no one else can think of the weird cracked out things you do in the same weird cracked up way!
    `,
  },

  {
    pgNum: 16,
    title: `Self Published Artist`,
    date: writeDate(2022, 6, 7),
    altText:
      "Two panel comic.  First panel depicts Jesse and Walter from the show Breaking Bad.  Jesse holds Walter passionately, and purses his lips.  Walter is nervously pointing a finger at his chin.  Jesse says, ' Yo...Mr. WHITE...I love you.  BITCH.'.  Walter says 'B-but...Jesser!  I'm MARRIED and have CANCER,'.  Second panel, Liv is bursting out of an office door.  She's wearing a full suit with pants, and holding papers that say 'Leaky Dad Season 1.5;.  She's angry, and being pelted with tomatoes and bananas.  A voice from the dark doorway says 'GET OUT!'.  Liv says, 'OUT, AM I?!  You'll regret not buying this script for a morbillion dollars...",
    imageFiles: 1,
    authorNotes: `
        <p>Sometimes the art we make is too big-brained for a mainstream audience or monetized publication.  Publishers who focus on making money by appealing to a large, general audience cannot possible understand the passionate emotions and melodrama we depict in our dank yaoi.
        <p>This is why the life of a self-published artist may be fruitful.  You will not have steady work, but you will be able to make whatever you want for whoever you want with no one breathing down your neck.  And it is that much rewarding when you find the few other big-brainers who have the high IQ required to understand your art.
        `,
  },

  {
    pgNum: 17,
    title: `Oscorp Pride`,
    date: writeDate(2022, 6, 10),
    altText: "6 panel comic about rainbow capitalism, starring Harry and Norman Osborn.",
    imageFiles: 1,
    authorNotes: `
        <p>🌈 Happy Pride month! 💲
        From your friends at Oscorp™.
        <p>Script:
            <p>Panel 1, a rainbow titled “OSCORP PRIDE!” hovers over a naughty, smiling Mr. Osborn.  

            <p>Panel 2, Osborn holds pins stating “she/her”, “they/them” with the lesbian flag and transgender flag color schemes on each one respectively.  "We like to celebrate Pride by replacing a downer RIOT with FUN SHOPPING SPREE.  For starters, buy a pronoun pin with flag colors we stole from YOUR COMMUNITY without compensating the creators!“.
            
            <p>Panel 3, Osborn holds up a rainbow spider-man comic. "REPRESENTATION MATTERS! So we’ll make one gay fake cartoon background character, and kill'em so we don’t have to write'em again!  REAL GAY HUMAN WORKERS will be ABUSED and UNDERPAID. Then we’ll donate profits to politicians who actively campaign for HOMOPHOBIC RACIST WORLD DESTROYING SHIT!”.
            
            <p>Panel 4, Osborn hugs his nervously smiling son. “We even added an O to OLGBTQ for OSCORP!  Cuz at Oscorp, you queers are like FAMILY!  See my son Harry here?  He’s one o’ them TRANSEXUALS.  Now that’s visibility!”
            
            <p>Panel 5, Norman punches Harry. “Say THANK YOU to corporations for even paying ATTENTION to your PATHETIC ASS!”  Harry’s tooth is falling out, yet he states “Thank you Daddy!”.
            
            <p>Panel 6, Osborn drives a tank. “Don’t forget!  We only care about HOMOs once a year, but the military-industrial entertainment complex is FOREVER!  There’s no ethical consumption under capitalism, so just GIVE UP and GIVE IN to the capitalist fandom that ties CONSOOMerism to IDENTITY!  Corporate Pride RULES!”
            `,
  },
  {
    pgNum: 18,
    title: `Back to Formula`,
    date: writeDate(2022, 6, 30),
    altText: "2 panel comic about rainbow capitalism, starring Harriet and Norma Osborn.",
    imageFiles: 1,
    authorNotes: `
            <p>🌈Happy end of Pride month!  It’s time to go back to formula.💸

            <p>Script:

            <p>Panel 1: June 30th 2022.  Ms. Osborn, the CEO, hugs her daughter.  Harriet is thankful for this rare display of affection and squeals, “MOM!”.  Ms. Osborn states, “Harry, you’ve been GREAT #REPRESENTATION for Oscorp this month.  I love you, my gay pathetic daughter.”  Rainbows explode everywhere, with hearts and bright stars.

            <p>Panel 2: July 1st 2022.  The palette is now reduced to black, dull red, and blue. Ms. Osborn pushes her daughter out of frame.  She has an Uncle Sam hat on, and packs a pistol and cigar.  She states, “Alright, you got your monthly hug allowance.  Get this rainbow CRAP offa me, it’s time to shill the IRON PATRIOT war machine.”  Harriet smiles with watery, teary eyes.  “Thank you so much mommy, please remember me next year!”. 
            `,
  },

  {
    pgNum: 19,
    title: `Assigned Kin`,
    date: writeDate(2022, 6, 30),
    altText:
      "1 panel comic.  Maggie and Shane sit on the couch, watching Spider-Man cartoons.  On the screen is Doc Ock, the long haired greasy one from Ultimate Spider-Man.  Maggie's eyes pop out and they say AWOOGA!  This Do Cock is the HOTTEST SEXIEST piece o' ass right?  Most THOT-APUS SLUT!  Shane sits on the couch with his thumb on his chin in the Think Emoji pose, having the same long black hair as Do Cock.  Jack and Jill are jumping around happily next to him.",
    imageFiles: 1,
    authorNotes: `
            <p>Guest starring Maggie and Shane, with Liv as the artist.
            <p>Sometimes you may notice trends in the cartoon characters you get attached to.  Don't be embarassed.  It just means that you have developed very good taste that's specific to yourself.  Embrace your type!
                `,
  },
  {
    pgNum: 20,
    title: `Exhibition (Art School pt. 3)`,
    date: writeDate(2022, 7, 16),
    altText:
      "2 panel comic.  First panel, Tiger Herbie is proudly showcasing his abstract sculpture, which appears to be three curving long forms entwined.  With his arms cross and a judgemental frown, he asks 'what do you THINK it means??' to the anonymous viewer.  The caption reads 'Correct way to exhibit artwork: Exude confidence and project dominance on viewers.  Second panel, Lil' Ronnie is showing Tiger Herbie her sculpture and pushing him by the butt.  It's a giant sculpture of him, in the pose of Michelangelo's David, complete with Jheri curl and sunglasses.  Tiger (who has no light perception) has his hand on the sculpture to observe the form, accidentally feeling the crotch.  He asks Ronnie, 'What is this?'.  Ronnie smiles and replies, 'Don't worry 'bout it'.  Next to the sculpture of Tiger are sculptures of a Minion and Amogus.",
    imageFiles: 1,
    authorNotes: `
            <p>Guest starring Lil' Ronnie and Tiger Herbie.
            <p>It's very exciting to exhibit your art publically!  You may wish to appear in person to observe live reactions, or to troll viewers.  <p>Abstract art like Tiger's sculptures may question the viewer's intelligence, and make the artist seem standoffish or pretentious.  Figurative art like Lil' Ronnie's may question the viewer's grasp on reality, and make the artist seem like a danger to society.  No form of art is better than the other, it's all subject to personal taste.
                `,
  },

  {
    pgNum: 21,
    title: `Sharing Space`,
    date: writeDate(2022, 6, 15),
    altText:
      "1 panel comics.  Many figures lay in bed sleeping, holding each other like dominos.  A weenie dog cuddles a sock, who is being cuddled by another weenie, who is being cuddled by Sophie, who is being hugged in one arm by Liv.  Liv is also holding a dakimakura depicting Willem Dafoe in her other hand.  There is a chihuahua laying on Sophie's body, and one more weenie laying between Liv's legs.  On the bed are various objects, such as a Green Goblin plushie, dog toys, and a Lambchop toy.",
    imageFiles: 1,
    authorNotes: `
            <p>What is most important in life?  Your wife, weenies, and Willem Dafoe dakimkaura.  They can all share space in your heart, for you have much love to give.
                `,
  },

  {
    pgNum: 22,
    title: `Tsundere`,
    date: writeDate(2022, 10, 17),
    altText:
      "2 panel comic.  Panel one: Liv has thrown a tomato at Basile's shoulder from outside a window, and she's making a face of disgust with her tongue out.  She exclaims YUCKY!  Basile was going t play his clarinet, but he's now grimacing at the tomato on his shoulder.  There are three potted house plants under the window.  Panel two:  Liv now has heart eyes, with her hands clasped together near her face.  She says 'ah... musoo...' like a Sim character listening to pleasant music.  Basile is now playing his clarinet with his eyes closed, ignoring everything especially the wet tomato stain on his shoulder.",
    imageFiles: 1,
    authorNotes: `
            <p>I'd probably equate the 'tsundere' character archetype as the thought process of 'he's mean to you because he likes you'.  Sometimes it's just way too gay and vulnerable to show your true feelings, so you have to hide them under the veneer of 'I don't like you, stinky smelly french BAKA!!!' lest others sense your weakness.  <p>If you try to reenact this anime archetype irl, you'll probably end up friendless and with a shoe to the face.  And that's why we keep things in fake cartoons, fake!
                `,
  },

  {
    pgNum: 23,
    title: `Yucky!`,
    date: writeDate(2022, 10, 17),
    altText:
      "2 panel comic.  Panel 1 of 2, captioned YUCKY!  Liv is going YUCK at Ollie, who is almost naked save for a tight jockstrap with a very large bulge.  Ollie is making a fuckboy face, biting his lip and making a think emoji thumb motion on his chin.  Panel 2 of 2, captioned YUMMY!.  Liv is pointing approvingly with a smile at Basile.  Basile has his eyes closed, smoking a cigarette, and his arm behind his hunched back.  his other arm is holding his cane, with shaky lines around his limbs.  His bald spot is quite prominent.",
    imageFiles: 1,
    authorNotes: `
            <p>Boys have COOTIES.  Gorls ACTUALLY like stinky crappy hunched over old men, with depression, and terminal illness!

            <p>There's quite a history of lesbians, fujoshi or otherwise, finding 'unattainable' men attractive alongside their usual gal pals.  Whether that's older authority figures, far away celebrities, or cartoon characters, these guys often aren't considered real attainable partners by the mind because they will never be interacted with.  Thus they're fair game for thirst!  They're basically just Barbie dolls for the brain to play with.
            
            <p>If you find this conundrum of attraction and sexuality confusing, take it up with the quandry of nerves we call the human mind.  Or take it up with the growing number of fangirls online openly thirsting after (fictional) ojii-chans!
                `,
  },

  {
    pgNum: 24,
    title: `Gurl Gaming!`,
    date: writeDate(2023, 03, 03),
    altText:
      "3 panel comic.  Panel 1 of 2: Liv is playing on her phone, thinking about feeding her virtual dogs and chickens.  Her real life weenie dogs are pleading at her with broken hearts.  Panel 2 of 3, Liv is freezing in real life in a blanket and beanie while playing Oregon Trail and freezing ingame. Panel 3 of 3, Liv has virtual reality goggles on and is drooling and happy with a boner.  Basile is standing behind her, annoyed, and fully dressed in his bdsm gear.",
    imageFiles: 1,
    authorNotes: `
            <p>One may find themselves occupied in the fantasy realm of video games.  Taking trips through stories and creating your own characters in media is fun!  Remember to come back home sometimes for your wife and children.
          
            <p>Long time no comic!  I've been hoarding a bunch of comic sketches for Just Gorly Thingz in the last couple of months.  I'll find the time to edit them for internet consumption :)
            <p>This gamer comic is an experiment in more concise pencils with halftone colors.  Theoretically having sketchy pencils for lineart will save me time on editing these comics!  But in practice, I've found that I've been spending more time erasing and trying to clarify these lines than I would when I do my plain ink lineart.  I want to keep playing with my art in these comics still!
            <p>Finally, I've changed the name of the comic slightly from "Just Girly Things" to "Just Gorly Thingz".  That'll probably make it easier for me to look for my own stuff, and have a zine name that's vaguely possible to search.
                `,
  },

  {
    pgNum: 25,
    title: `Nightmare`,
    date: writeDate(2023, 03, 15),
    altText:
      "5 panel comic.  Panel 1: Liv is sleeping next to Sophie happily.  Liv thinks: I had a good day and can't wait to sleep.  Panel 2: The style shifts to scraggly black and white.  Liv stares downat her blurry hands.  Panel 3: Multiple hands and arms grab and cover Liv, the only thing visible now her eye.  Panel 4: The style shifts back to the cartoon style.  Liv is huffing and sweating, now awake and worried.  Sophie says off camera 'you ok?'.  Panel 5: Sophie and Liv hug sadly.  Sophie says 'let's draw porn til we fall asleep.'.  Their weenie dogs look up at them.",
    imageFiles: 1,
    authorNotes: `
            <p>Keep your fujofriends close!  They'll always know the best way to cheer you up after some bad times.  Take it easy on yourself, you don't always have to pretend everything is ok.
            <p>Trying some new panel formats outside of the 3 panel newspaper strip style.  They'll be fun every once in a while when I feel like devoting a few hours to experimentation :) Gotta keep things fresh and interesting for my attention deficit.
                `,
  },

  {
    pgNum: 26,
    title: `Movie Night`,
    date: writeDate(2023, 04, 20),
    altText:
      "4 panel comic.  Panel 1: A fish holding a gun is talking to a banana.  Fish says seriously, 'cocaine... caused 9/11...'.  The banana says 'But I love you!'.  Panel 2: Liv, Sophie, Ronnie, and Basile are sitting on the couch in various states of mediocrity.  Panel 3:  The fish is now rubbing against the banana, both in states of ecstacy.  The fish says 'YES! I want you to [censored] and [censored] me until I'm pregnant with your demon seed!'.  The banana says 'I love you!'.  Panel 4: The gang is cheering, Liv is pointing and pogging, Ronnie claps like a seal, Sophie is holding an Oscar award and crying.  Basile is still asleep but wearing cat ears and lingerie.",
    imageFiles: 1,
    authorNotes: `
            <p>Art is subjective.  Thus, yaoi is subjective.  What may be tasteless and lowbrow to others could be the best thing ever to you.  And what may seem popular among other fujos might not fit your own tastes.  You have to go out of your way to find things that you like, especially if your preferences are rare!  <p>Don't forget to share your dank discoveries with your fujofriends.<p>Also, I'm gonna start prepping to print the first 30 strips of this comic as a physical zine.  Read more on my <a href="https://ko-fi.com/post/Making-the-Just-Gorly-Thingz-zine-J3J1KLMUK">ko-fi post</a> :)
                `,
  },

  {
    pgNum: 27,
    title: `Unhealthy Fetishization`,
    date: writeDate(2023, 05, 01),
    altText:
      "3 panel comic.  Panel 1: Liv is feeding goop to a sickly Basile.  She says 'Who's a cute widdle gwampa?  Who's trapped in a bed and adorably dependent?'.  Panel 2: Liv walks away and is about to step on a banana peel on top of a rake. Sophie gasps and reaches towards Liv.  Liv says happily, 'I'm so glad I'm young and virile, full of health to help the old folks--'.  Panel 3: Liv is now in Basile's sick bed, with Sophie somberly tending to her.  She is very sad and crying.  Basile's in the background but he's in a coffin.",
    imageFiles: 1,
    authorNotes: `
            <p>Old man ukes rock.  They can be grumpy and weak, sicky and in need of care.  <p>Objectifying, fetishizing, and romanticizing frailty and angst is all fun and games until you break both your quads and you have become the old man uke.  <p>Perhaps this is why people will call others out for fetishizing 'unhealthy' relationships.  If we fetishize health, will live forever?!?  <p>Yes.  In our yaoi we will.  <p>Still working on the print version of this comic.  <a href="https://ko-fi.com/post/Making-of-Just-gorly-things-zine-U7U3KQ7LP">Here's some progress on the zine in this ko-fi post</a> :)
                `,
  },
  {
    pgNum: 28,
    title: `Emotional Support`,
    date: writeDate(2023, 05, 01),
    altText:
      "3 panel comic.  Panel 1: Nightwing from Batman is harassing batman with a smile.  'Yo Bruce, wanna get buttfucked?'.  Batman angrily responds 'my parents are DEAD'.  Panel 2: Nightwing from Batman is grabbing Slade's ass with a smile.  Slade asks 'Wanna fuck my butt?' and Nightwing responds 'OK'.  A side note says Evil pussy: not even once.  Panel 3: Liv has been drawing these comics.  Sophie hovers over her shoulder and says 'Dude, they should totally hire you to write comics.  Liv says with a curly smile, 'I dun need their validation as long as I got you <3'.  ",
    imageFiles: 1,
    authorNotes: `
            <p>People usually mean well when they say you should work for Didnymarbel, and apply for corporate cartooning jobs.  In your own journey as an artist, you may find it more rewarding to parody corporate characters in homosexual situations in your free time.   <p>Sure you get a PAYCHECK and probably HEALTH INSURANCE with a studio job.  But once you're hired by a corporate entitity, everything you draw belongs to them. And you can't even draw buttsex and post it no more since you're associated publically with a family friendly brand!
            <p> The life of an independent artist means you depend more than anything else on the support of your peers.  No paycheck, no insurance, but you can choose your own art direction!  And let that direction be as bootylicious as possible..
                `,
  },
  {
    pgNum: 29,
    title: `The Croco-Dilf Hunter`,
    date: writeDate(2023, 05, 01),
    altText:
      "A collage page of various sketches of Liv, animals, and Basile.  The first title above Liv reads: Time 2 Learn From...Tha Croco-Dilf Hunter.  Next to liv are various sketches of naturalistically drawn animals, including a Llama, rabbit, beaver, capybara, molerat, rat, and meercat.  Above them reads 'WRONG!  This is not how animals look.' Below these animals are the same type of animals, but drawn with bug eyes and buck teeth.  Above them, the title reads: 'Correct.  This is correct identification!'.  A sticky note next to Liv and the animals reads: Learn from Liv!  Proper animal identification is important.  Impress your family, awe your instagram friends!  And it might save you, when you find yourself in the MAW OF...THE DEADLIEST SNATCH.'  Below the sticky note is a sketch of Basile, very hunched over and creature like.  Various written notes point to his interest points, like Poor Vision, Sulfurous Scent next to his cigarette, and Bald PAtch (to attract Mates).  The final sticky note reads: IF you find it?  CATCH IT!",
    imageFiles: 1,
    authorNotes: `
            <p>Learn how to identify and draw animals with The Croco-Dilf Hunter, and save yourself from The Deadliest Snatch!  You can find the Snatch lurking in the dairy section of the grocery store, or sleeping on recliners during noon-time.  Just remember... if you find it?  Catch it!  The Snatch fetches a pretty penny on the Croco-Dilf market!
                `,
  },
  {
    pgNum: 30,
    title: `Fujofriends`,
    date: writeDate(2023, 05, 28),
    altText:
      "A five panel comic.  Panel 1: Liv is drooling while at her computer.  A printer behind her is making WHRRRR sounds and pushing out paper.  Panel 2: Liv is cutting the paper from the printer, and stapling them into zines.  Her hands are bloody and covered in bandages.  PAnel 3: Liv and Sophie are tabling at a convention with their zines.  Next to them, a more popular table has many visitors.  Ronnie comes to meet Liv and Sophie, and they each say 'Bello' to each other.  Panel 4: Ronnie shows Liv the zine she made about Tiger Herbie (titled Cute), and they hapily trade zines in a Yume To Fujo energy exchange.  Panel 5: Lil Ronnie, Liv, and Sophie hug ecstatically.  Yume to FUjo to Hime.  We <3 our Fujofriends!",
    imageFiles: 1,
    authorNotes: `
            <p>The final comic of the <a href="https://store.scumsuck.com/products/Just-Gorly-Thingz-a-lesbian-fujoshi-comic-zine-p551752573">first Just Gorly Thingz zine</a>. I wanted to make a comic about making zines in my zine full of comics, go figure!  And I wanted to tell people the inspirations for this comic as well as the <A href="https://fujofans.scumsuck.com/">Fujofans web listing</a>.
            <p>And why make comics?  Other than because your body will not let you rest until you put a piece of art out?  DA FUJOFRIENDS!  You'll meet some amazing (and some completely awful) people by sharing your thoughts through art, and having others reciprocate with their own opinions.  It's a big lonely world out there... but it's a lil' less lonely when you know there's at least one old man uke enthusiast out there who's also fighting the good fight.
    <p>Comics and zines are probably not the best financial choice for Selling Art because of the time and emotional investment they take.  You can sell one big print for $20 easily, while a comic with 40 pages, each with 5 panels, will be considered expensive at $10.  But dangit, it feels good to weave narratives and characters!
                `,
  },

  {
    pgNum: 31,
    title: `Himejoshi`,
    date: writeDate(2023, 06, 03),
    altText:
      "A three panel comic.  Panel 1: A computer monitor displays a latex spy in boobs and butt pose, with a gun facing the camera.  The boobs and butt are enormous.  A voice off screen proclaims 'DISGUSTING!  Only straight cis men would enjoy SEXIST TRASH like this!'.  Panel 2: Liv is viewing her computer evilly and giggling hehehe.  The image of spy's boob and butt are reflected in her glasses.  She is labeled THE VIEWER.  Panel 3: Sophie looks at the camera and gives it a nonchalant thumbs up, while she is painting Latex Spy on the canvas.  She is labeled DA ARTIST.",
    imageFiles: 1,
    authorNotes: `
            <p>Remember:  Boobs and butt are for everyone to enjoy and draw.  Shoutouts to she/hers that like she/hers with big booba.  They are more powerful than we can ever know.
            <p>Just like we have the term 'fujoshi' for girls who like gay male ships, 'himejoshi' are girls who like lesbian ships.  It comes to no surprise that folks who may like one sort of gay media, can enjoy other types of gay media regardless of gender or sexuality!  Solidarity among artists and viewers!
                `,
  },

  {
    pgNum: 32,
    title: `Touch Grass`,
    date: writeDate(2023, 06, 21),
    altText:
      "Two panel comic.  Panel 1, Basile is seated in front of a computer, hunched over, with a withered wojak face in black and white art.  He is typing with crappy bent fingers on the keybaord, and there's some misc. pills next to him.  Behind him, the text reads &quot;Life is pain, I hate-&quot;.  Panel 2, Basile is now outside in full color.  He is smiling slightly and crying.  Stray cats surround him, eating the food that he's left out in bowls and aluminum cake pans.  The sun is shining with a bucktoothed Scout face.  A chicken rests on his outstretched arm.  Text above him proclaims, Humanity Restored.",
    imageFiles: 1,
    authorNotes: `
            <p>If you work on the computer, it is imperative that you go outside at ALL COSTS.  Technology drains vital energy that can only be refilled by YOU giving love to other beings.  Like stinky stray cats, or chickens pecking at your palms.
            <p>Even if it's not work, this is important for internet hobbyists like fujoshi!  It's fun to engage with other fans online.  When shit stanks, as it often does in the baby fight club known as "The Internet", take a step outside and try to talk to real people or real cats.  Meow.  Meow.  PURR.
                `,
  },

  {
    pgNum: 33,
    title: `The Grind`,
    date: writeDate(2023, 07, 2),
    altText:
      "Five panel comic.  Panel 1: Liv, Sophie, and their two dachshunds are holding  hands and dancing in a circle happily.  They are outdoors with rose bushes and trees, having fun in nature.  Panel 2: Liv is happily pour a bucket of rainwater onto a tomato plant, which has grown 2 little red fruits.  Panel 3: Liv and Sophie are playing Rock Band with scrunched faces, having fun pounding the drums and playing the plastic guitar.  Panel 4: Liv has a button up shirt with tie and vest now.  She sits down at a computer desk, and puts her punch card into the clock-in machine, with a complacent smile.  Panel 5: Liv has gone grayscale and scraggly, her expression turned into withered silent pain as she works on the computer.",
    imageFiles: 1,
    authorNotes: `
            <p>Have fun and live in the moment!  We only grind so we can enjoy life with our family and friends outside of work.  The snapshots we see on social media of each other's leisure time doesn't paint the full picture of the work we do to get that leisure time...
            <p>But at least our tomato plant IRL has a couple lil fruits :D And we somehow got pumpkins growing from last year's Halloween Haul?  Freakin' sick.
                `,
  },

  {
    pgNum: 34,
    title: `Parental Supervision`,
    date: writeDate(2023, 09, 30),
    altText:
      "A comic titled 'Parental Supervision', parodying the Iceberg meme that shows neutral things you find by casually surfing online (indicated by Liv with a happy expression), too much internet (Liv is tired) to shit that no one needs to know (Liv is shriveled and mummified).  The casual iceberg: Stardew Valley Mods, Schizoaffective art, Torrents, Lemon Party, FF7 Yuri, Spongebob yaoi, Oregon Trail, Paint Tool Sai, Doujinshi Translations, Ice mummy Wikipedia Article, Sims 2 omgwtfbbq, sonic fetish porn.  Mid iceberg: rotten, anti/proship discourse, machine learning = police tracking, discord groomers, web3 shills, mr. hands, farming kiwis, irl gore forums, motherless, google is watching you. Lowest iceberg: columbiners, suicides on tumblr, animal snuff/rape footage, live murders, the proper term is 'csem', unmoderated fediverse servers, 'anti/pro-contact' discourse, 'dm for taboo telegram chat' The final panel is Liv throwing her computer monitor through a window, crying 'ENOUGH.'",
    imageFiles: 1,
    authorNotes: `
            <p>Parental supervision, as in I'm old enough to be a parent now and I'm so lucky I don't have kids.  Ain't no way you can warn anyone for this shit.  But you just learn this shit looking for spongebob yaoi online.
            
            <p>So I spare you, my loyal reader, by blurring everything I wish I never learned from the internet.  I wish I could forget!!!  

            <p>If you already know, the full comic filename is <span class="spoilers">pg34-full.png</span> on this site.
                `,
  },
  {
    pgNum: 35,
    title: `Late Bloomer`,
    date: writeDate(2023, 10, 7),
    altText:
      "A comic titled Late Bloomer.  First panel: The aftermath of a mushroom cloud explosion.  Characters from Spiderverse are scattered facedown in the dirt, like hobie, the spot, and miguel.  Liv and Sophie are sitting in the middle of the mushroom cloud, playing with small figures.  There are two gravestones titled Animators and Age Discourse.  Second Panel: Live and Sophie are holding up their Spiderman and Goblin toys.  3rd Panel: They make their spiderman and goblin kiss closeup!  Mwah!! 4th panel: Sophie reaches down into the dirt and grabs Miguel.  5th panel: Sophie clacks Miguel against Spiderman and Goblin to join in their merriment.  Mwah!",
    imageFiles: 1,
    authorNotes: `
            <p>As usual, I'm a year or decade late to [insert popular movie here].  I'm happy being this way!  Especially with superhero crap.  People get really heated over literally nothing with superhero crap.  
            <p>I'm perfectly fine playing with the older characters that people don't care about any more... less people to have bad opinions about guys in spandex slapping each other.  And I'll be happy to absorb the knowledge of newer versions of characters too!  Once everything's cooled down and everyone's forgotten about them too :P
            <p>Oh yeah, new Spiderverse is cool.  Good first half.  Slog of a second half.  A lot of characters, wish they all had time to breathe!  Wish there was a wee bit more re-focus on widdle baby Miles and his own family drama.  Now where's the goblin that's NOT just a stock image cameo?
                `,
  },
  {
    pgNum: 36,
    title: `Catching up on Hero Academia`,
    date: writeDate(2023, 10, 16),
    altText:
      "One panel comic.  Liv is standing in the middle of a hallway with two rooms as choices.  The right room is the Reading Room, with a buff All Might next to it.  Inside are many Dekus in various stages of reading and sleeping.  The left room is the All Might Death waiting room, with a skeletal skinny Might guarding it.  Inside is one very angry Deku in his hero costume, waiting on fire.",
    imageFiles: 1,
    authorNotes: `
            <p>The last time I was really into MHA was in like 2017.  It was a fun time!  But I'm still waiting (and only really interested) for All Might to die.  And so is everyone else I still talk to from that time :)
                `,
  },
  {
    pgNum: 37,
    title: `Favorite Fruit`,
    date: writeDate(2023, 10, 30),
    altText:
      "Five panel comic.  First panel, Liv is walking down a museum hall of paintings with a peach shaped backpack.  She looks sad.  The paintings are of veiny eggplants.  She thinks to herself, 'Seems like they don't got my favorite fruit at this gallery...'.  Second panel, Liv spots someone hanging up a painting of a peach fruit.  Her eyes pop out in surprise.  Third panel, we zoom in on the peach painting.  It is old and holey and wrinkly, with a maggot coming out of a hole.  Liv thinks, ' It's beautiful.  Withered, wrinkled, in need of a strapping stem for support.'  Fourth panel, Liv shakes the painter Sophie by the shoulders.  She cries, 'YOU!  You made this?'  Sophie is flabbergasted, and replies 'yeah'.  Fifth panel, Liv and Sophie engage in a passionate make-out session with hands on each other's face and shoulders.",
    imageFiles: 1,
    authorNotes: `
            <p>Finding just one other person who likes the same rare specifc taste as you is like making an emotional soulbond, even with no words.
                `,
  },

  {
    pgNum: 38,
    title: `My yaoi, my life.`,
    date: writeDate(2023, 11, 27),
    altText:
      "'My yaoi!' Ollie holding Basile across the arm where Basile is holding his cane.  Basile looks annoyed.  Ollie looks stupidly happy.  An arrow points to Ollie saying Me!  An arrow points to Basile saying My boo <3 'My life.'  Two Basiles face each other.  One is lighting the others cigarette.  They're both hunched over with canes.  One has 'me' labeled on him with an arrow.  The other lighting his candle says 'my boo'.",
    imageFiles: 2,
    authorNotes: `
            <p>You live long enough to become the old sickly uke.
                `,
  },

  {
    pgNum: 39,
    title: `Girls go through this irl...`,
    date: writeDate(2023, 12, 13),
    altText:
      "Just Gorly Things #39: a 3 panel comic about catcalling and sexual harassment.  Panel 1 'Girls go through this IRL': a gruff man points at Liv and says Nice Ass!  Liv yells at him with her fist shaking, Get lost pervert!  Panel 2 'So their yaoi looks like this...': Ollie mirrors the first panel's gruff man and points intimidatingly at Basile.  'nice ass!' Ollie says, as Basile walks away and says 'Get lost pervert!'  Panel 3 'and their yuri looks like this': Liv is now in the place of Ollie, drawn very crudely and goofily.  Next to her is a character that looks suspiciously like a female Willem Dafoe, bending over a desk showing off her financial assets.  Liv says 'Nice ass!'.  Not-Willem says 'Wanna smash?'",
    imageFiles: 1,
    authorNotes: `
            <p>A lot of sexual harassment stories in yaoi and yuri is easily explainable: bad things happen to a lot of girls in real life, so they mirror their experiences onto cartoons instead of perpetuating them IRL.
                `,
  },
  {
    pgNum: 40,
    title: `Reversible Dynamics?`,
    date: writeDate(2023, 12, 25),
    altText:
      "Just Gorly Things #40: a 4 panel comic about A x B character dynamics.  Panel 1: 'Name order (AxB) can denote top/bottom, but what about non-sexual pairings?' Below the text is a drawing of Spongebob kissing a grumpy Squidward under the mistletoe.  Panel 2: 'Because I like one-sided affection in ships, the name order then denotes who is chasing who in the dynamic.  So I’m usually non-reversible cuz I want specific characters to be the beloved.' Below the text is a drawing of Squidward with a crazed look in his eyes, holding a mistletoe above scared Spongebob's head.  To their left, is a stop sign with the words NO RIBA on it.  Panel 3:'But!  Sometimes there are exceptions. With age gap AxB, I like B as the cool beloved, while A is the annoying tiny Spunchbop trying to become friends.  An Alternate Universe where A&B swap personalities and age would visually look like BxA, but in essence be AxB. So technically reversible.' Underneath the text on the left is a drawing of a cool Demoman brandishing his sticky launcher gun and smiling proudly, while a nerdy looking Scout behind Demoman preses his fingers together with a doodoo eating grin.  On the right, the dynamics have flipped and now Demoman has a goofy grin while holding Scout in his hand, trying to tickle the unsmiling Scout's chin.  This Demoman wears a crown, and this Scout wears a hoodie with sunglasses.  Panel 4: 'Yaoi is a culinary art to find the perfect flavor for yourself!  In normal math, AxB always results in the same result no matter the order. But the order of ingredients can be crucial in cooking! For my favorite recipes: First add A, where A is a silly chibi seme spunkbob. Add B, where B can be older, larger, and cooler. Then mix that in with a ridiculous concoction of “no sex, no established relationship”. And end with no reciprocation, to the point where other people wonder why you even call it a ship.  It’s the IDEA of the relationship, what could possibly be, but will NEVER become!  And there you have it!  Steiner math!' The drawing next to the text is a nerdy looking Liv with big glasses and slicked hair.  The wall of text fades to black as it drones on.",
    imageFiles: 1,
    authorNotes: `
            <p>Trying to explain how my brain determines what is the tastiest dynamic for a set of characters.  Your mileage may vary for yourself.  We all have different tastes and differing ways to cook our favorite yaoi!
                `,
  },
  {
    pgNum: 41,
    title: `Reversible Bromance and Selfcest`,
    date: writeDate(2024, 1, 3),
    altText:
      "Just Gorly Things #41: a 2 panel comic about Reversible bromance and selfcest dyanamics.  Panel 1: A drawing of Demoman and Soldier from TF2 about to kiss, their foreheads knocking together.  The text reads 'In cases with no 'gap', same age, same build, similar personalities... riba is ok.  Hell I probably want 'em to side!*  Next to the Demoman and Soldier are two playful Scouts from TF2, one blue scout balancing upside down on the red scout's butt.  The text next to the scouts reads, ' As is the case with clonecest or selfcest!  They're the same!  I can't choose!  Let's just SIDE!*'  Underneath this panel is the footnote ' *side = no top.bottom penetration'.  Panel 2: A drawing of a boy scout being kissed against a chainlink fence, held up by a gorl scout that is holding him up by his legs.  Text reads: ' In the case of selfcest AND genderbend?  No steiner math needed.  Gurls always top!'  A drawing next to the scouts is the label for NO RIBA, with a person with crossed arms and frowning face surrounded by two rotating arrows.",
    imageFiles: 1,
    authorNotes: `
            <p>S'more thoughts on what makes my yaoi dynamix reversible or not.  This time bromance and selfcest flavored, which usually means reversible since the characters are more similar.
                `,
  },

  {
    pgNum: 42,
    title: `The top's burden`,
    date: writeDate(2024, 2, 22),
    altText:
      "Just Gorly Things #42: Goobus and Grunt.  Panel 1: Goober is a compact young man with a naughty thinking face looking at his thought bubble.  In the thought bubble is himself wearing a ski mask terrorizing a latex masked bottom who is tied up.  The caption below reads, 'Goober thinks tops can do whatever to their hapless bottoms,'.  Panel 2: Grunt is the same-looking as Goober.  He is wearing a ski mask in his panel, looking very tired with his tongue hanging out, and holding a hammer and nail.  The latex masked man is now chained to a crucifix, and angrily screams 'DO IT'.  The caption below reads, 'Grunt realizes he must keep the ceaseless hunger of his bottom satiated lest he be devoured phallus-to-limb by the hole.",
    imageFiles: 1,
    authorNotes: `
            <p>There's a misconception that tops are automatically doms (and vice versa), and that doms are always mean daddies that abuse their sub.  I would like to present my tribute to power bottoms and service tops.
                `,
  },

  {
    pgNum: 43,
    title: `Popular Interpretation`,
    date: writeDate(2024, 5, 18),
    altText:
      "Just Gorly Things #43: Popular Interpretation.  Panel 1: labeled In Text.  A short guy with a chubby face is sitting down pouting angrily.  Formless fingers point down at him, saying various things such as 'LOL YOU LOOK LIKE A KID', 'HAHA SHORT', and 'BABY'.  The pouting guy says 'I'm 34'.  Panel 2: labeled In Fanart.  The same short guy is now drawn mostly naked in undies, with a lot of body hair and muscles and a chiseled jawline.  He says 'I'm 34 and fuck'.  Panel 3: labeled When It could Be Like This... The short guy is drawn naked, booty pounding a larger chubby guy with a beard and horned helmet.  the short guy is screaming 'I'm 34 and get carded and fuck'.  Another caption on the image reads 'Let babyfaces, shawties, and low test kings be hairless!  And top.'",
    imageFiles: 1,
    authorNotes: `
            <p>Whenever I call a rideshare the driver tells me 'shouldn't you be in school'.  It's certainly an experience to have people assume you're a kid when you're a grown ass babyman!
                `,
  },
  {
    pgNum: 44,
    title: `Trolley Problem`,
    date: writeDate(2024, 12, 5),
    altText:
      "Five panel comic.  The title is Trolley Problem: A 'Just Gorly Things' Comic #44.  First panel: Closeups on busts.  A character with a ponytail and red hoodie is listening on a 90's style phone with a vacant expression.  On her left is a similar character wearing a blue hoodie and a cap, holding up a pistol and smiling.  The blue  hoodie character says 'If you don't talk to me, I will talk to the only people online who will -- racist pedophiles.  Then I will kill myself and shoot up a mall.'  Second panel: Zoom out to full body shot.  The red hoodie character is smaller and more poorly drawn.  Next to her is a taller scruffier character without any color.  He says 'If you don't have sex with me, I will [drawing of hitler, baby's face, gun]'. Third panel:  Zoom out farther, til all you can see is the top of the cartoon world's grass that the characters stand on, out in gray space with stars.  The red hoodie character is even tinier and stick figure like.  Next to her is another vaguely scrawled character with cat ears.  She says 'If you stop being friends with me, I will leak your porn to your boss and then [hitler drawing, baby, gun]'.Fourth panel:  Zoom out so far that you can see each  character is standing on cube shaped blocks of grass and dirt, like the minecraft icon, in black space with indistinct stars.  The red hoodie character is very tiny and un-detailed.  Next to it on the second floating minecraft block is a stick figure with a vague anime girl icon for a head.  The anime girl icon says 'If you kick me from your minecraft server, I will doxx and ddos you, and then I will [hitler cartoon, baby, gun].'  The fifth panel is in white space, with no comic panel outline.  The red hoodie character shrugs with a pensive expression.  It says 'What can ya do?'  Smaller text reads, 'if you don't get it... good... you're in a better place.'  Another caption reads 'by maggie age 45'",
    imageFiles: 1,
    authorNotes: `
            <p>Many such cases.  It ain't just one specific occurrence!  It's kinda tiring to be force-femmed into someone's mommy cuz lest they turn into the Joker.  This is fujo related cuz who hasn't had that overbearing fujofriend or fujo server mate? :D</p>

            <p>Long time no post too!  2024 was a complete blank for me.  I spent a very long time in booger brain time prison.  I have a lot of comic ideas queued up and written in Obsidian though, so maybe you guys will enjoy those when I get them drawn.  Also some vague comics I had drawn but not edited or scanned.. hard life.</p>
                `,
  },

  {
    pgNum: 45,
    title: `A Jabroni Mark's Guide to Movies About Fantasy Grooming`,
    date: writeDate(2025, 1, 10),
    altText:
      "Three page comic about Nosferatu (2024), Phantom of The Opera (2004), and Labyrinth (1986).  Detailed alt text with dialogue in author's notes below. ",
    imageFiles: 3,
    authorNotes: `
<p>  Watched that one vampire movie with Willem Dafoe in it.  Had some thoughts about the Yumejoshi appeal, enough to fill 3 pages of comics.  The alt text got too long, so read the transcription below 😊

            <p><strong>First page:</strong> 'Nosferatu (2024) is one of several movies with “confusing lol so random” sexual themes, in the same vein as Phantom of The Opera (2004) and Labyrinth (1986).  I think horror-romance confuses a lot of movie goers because these movies have GIRLtm appeal and girls are not supposed to like scary things. Don’t worry!  I will help you understand these scary themes in: A Jabroni Mark's Guide to Movies about Fantasy Grooming.  The first panel depicts the moustached Count Orlok creeping over a little girl.  The girl says 'I am lonely & puberty is confusing & I'm 16 years old.  Orlok says'Orlok has logged in' with a discord icon next to the text.  The 2nd panel has the same dialogue, but swaps the little girl for Christine from Phantom of The Opera, and Orlok for Erik the Phantom.  The 3rd panel repeats the dialogue, with Sarah and Jareth from Labyrinth.   
            
            <p><strong>Second page:</strong> First panel, Orlok is behind a grown woman Ellen, gripping her boobs and starting to bite her neck.  Ellen swoons with her eyes closed, and hand above her forehead dramatically.  She says 'Is this the real life?  Is this just fantasy?  Should I feel bad for feeling good in my daddy dom ravishment fantasies?'.  Orlok says 'A coerced 'yes' is consent lol*'.  Thomas Hutter sits in a lonely chair behind Orlok and Ellen, looking a bit sad, and says 'damn'.  The asterisked point reads 'The fantasy of maidenhood taken forcibly, without the 'burden' of choice, is freedom from the typical expectations of femininity'.  The second panel repeats the dialogue from the first panel, but with Christine, Erik, and Raoul in the cuck chair.  The third panel repeats the same dialogue with Jareth, Sarah, and that baby from the movie.  
            
            <p><strong>Third and final page:</strong>  First panel, Ellen is naked, still swooning, and gripping a flaming dead Orlok.  She states 'It's been titillating, but I gotta kill you now to restore peace.'  Orlok says 'Submit to yourself, your power...', which is a line from Robert Eggers's screenplay for Nosferatu.  Thomas is holding his head and yelling in the background.  The 2nd panel repeats the pattern from the first panel, with Christine gripping Erik while Erik screams from her kiss.  Raoul is yelling in the background.  Erik's dialogue differs, with lyrics from 'All I ask of  You (Reprise)'  I gave you my music... made your song take wing, and now you've repaid me, denied me and betrayed me... as a figment of your imagination I do as you wish, as a gaslight groomer.' 

            <p> The final section reads: 'TL:DR; In the controlled realm of fantasy, girls want to act submissive to their dreamed-up daddy dom.  But the daddy dom is the real sub because they are only a puppeteered manifestation of the girl’s freudian ID and desires.  Childhood trauma can and will intersect with adult fantasies.  
It’s a worked shoot, brother.'

<p><strong>EXTRA CREDIT:</strong> Do scripted wrestlers have more fun beating each other up in the ring, or getting punched in real life?
                `,
  },

  {
    pgNum: 46,
    title: `Denial part 1`,
    date: writeDate(2025, 2, 14),
    altText:
      "Two panel comic. Panel 1, captioned Sad Yume: Lil Ronnie is holding a drawing of herself as a baby holding hands with Nosferatu from the Eggers film. She is crying and breaking her pencil. She screams 'DADDY I LOVE HIM! He's NOT a groomer bobo it's PLATONIC'.  Panel 2, captioned GLAD YUME!: Lil Ronnie is crotch chopping at a strap on dildo on her crotch. Her tongue is stuck out and she is grinning evilly. She stares at Nosferatu in the background, who is naked, bent over with his cavernous asshole out, and his heavy cock n' balls dangling in the wind. She says 'DADDY I LOVE HIM! cuz he's a stinky smelly uggo shitty discord groomer'. the website url is gorly.scumsuck.com",
    imageFiles: 1,
    authorNotes: `
<p>Yumejoshi meta in which I have no horse in 🐎

<p>Just thought it’s funny when people try to defend the morals of fake cartoon villains, because the fake cartoon villains you like reflect on your personal morals of course, because conspicuous consumption is the only way to display morality in our Joker Society that intentionally tries to distract from real world issues by shifting energy and emotion to fake stuff 😜🤪😵🥴

A<p>NYWAYS changing color schemes of my comic after 46 pages… Very smart and well organized I am. 🤔 I’ll just leave the other pages in the warm color scheme and randomly start doing everything afterwards all purple. Wanted to post these panels first to see how the new colors look… i’ll finish inking the next parts sometime whenever I feel like it. yap yap yap

                `,
  },

  {
    pgNum: 47,
    title: `Groupie RPF`,
    date: writeDate(2025, 6, 15),
    altText:
      "Two page comic titled Groupie RPF. Page one, panel 1: A dude with long hair and a leather outfit asks Liv 'HEY SWEATY want some fuck???'.  Liv stares blankly at nothing, smiling, and says 'i wanna watch you have sex with your best friend'.  Panel 2: Liv continues to stare blankly and drools a little.  The dude squints and frowns at her.  Panel 3: Liv is in a baby jail frowning, surrounded by cops.  The dude points at her and says 'OFFICERS she came onto ME'.   Page 2, panel 1: Liv is in jail sleeping, when her phone vibrates.  Panel 2: The phone has a text from 'dude', where he typed 'i'm sry i got scared i bail u'.  Liv texts back 'can i have free tix'.  Panel 3: The dude is now having missionary sex with his best friend, also a dude with long wavy hair.  The dude looks back at Liv and asks 'Can we make fuck now?'.  Liv is sitting in the background on a chair with a lamp lighting her blank expression.  She says 'uhhhhhhhhhh i dunno'.  Panel 4: The dude is now ass up and naked, with his butt and boobs shiny and red.  He says 'I'm a MAN and only GIRLS make fuck in the B hole!'.  Liv holds up a large dildo and vaseline jar, in a scientist outfit, saying 'It has to be this way.'.  End comic.",
    imageFiles: 2,
    authorNotes: `
<p>  Try this ONE SIMPLE TRICK to get laid (in your mind palace) at your next concert. Results guaranteed!

<p>  If musicians get to write a bunch of songs like My Sharona and Christine Sixteen about (underage) girls they may have bung (IN KAYFABE), girls have the right to write a bunch of stories on wattpad about those musicians bunging each other.  And themselves bunging musicians.


                `,
  },
];

//below is a function you dont rly need to mess with but if you're more experienced with js you can

function findGetParameter(parameterName) {
  //function used to write a parameter to append to the url, to give each comic page its own unique url
  let result = null,
    tmp = [];
  let items = location.search.substr(1).split("&");
  for (let index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

function writeDate(year, month, day) {
  //write date of comic page
  const date = new Date(year, month - 1, day)
    .toDateString() //format date as Day Month Date Year
    .toString() //convert it to a string
    .slice(4); //remove the Day
  return date;
}
