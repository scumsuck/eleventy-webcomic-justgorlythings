/**
 * This script is originally from here:
 * https://github.com/woody180/vanilla-javascript-emoji-picker
 * I've modified it, mostly removing emojis to try to keep the script size down, and removing the drag events, choosing instead to affix the emojis to a particular spot.
 * You can always grab the original from the link above to revert all changes.
 */
const EmojiPicker = function(options) {

    this.options = options;
    this.trigger = this.options.trigger.map(item => item.selector);
    this.insertInto = undefined;
    let emojiesHTML = '';
    let categoriesHTML = '';

    this.lib = function(el = undefined) {

        const isNodeList = (nodes) => {
            var stringRepr = Object.prototype.toString.call(nodes);
        
            return typeof nodes === 'object' &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
                (typeof nodes.length === 'number') &&
                (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
        }

        return {

            el: () => {
                // Check if is node
                if (!el) {
                    return undefined;
                } else if (el.nodeName) {
                    return [el];
                } else if (isNodeList(el)) {
                    return Array.from(el)
                } else if (typeof(el) === 'string' || typeof(el) === 'STRING') {
                    return Array.from(document.querySelectorAll(el));
                } else {
                    return undefined;
                }
            },

            on(event, callback, classList = undefined) {
                if (!classList) {
                    this.el().forEach(item => {
                        item.addEventListener(event, callback.bind(item))
                    })
                } else {
                    this.el().forEach(item => {
                        item.addEventListener(event, (e) => {
                            if (e.target.closest(classList)) {

                                let attr = undefined;

                                if (Array.isArray(classList)) {
                                    const stringifiedElem = e.target.outerHTML;

                                    const index = classList.findIndex(attr => stringifiedElem.includes(attr.slice(1)));

                                    attr = classList[index];
                                }

                                callback(e, attr)
                            }
                        })
                    })
                }
            },

            css(params) {
                for (const key in params) {
                    if (Object.hasOwnProperty.call(params, key)) {
                        const cssVal = params[key];
                        this.el().forEach(el => el.style[key] = cssVal)
                    }
                }
            },

            attr(param1, param2 = undefined) {

                if (!param2) {
                    return this.el()[0].getAttribute(param1)
                }
                this.el().forEach(el => el.setAttribute(param1, param2))
            },

            removeAttr(param) {
                this.el().forEach(el => el.removeAttribute(param))
            },
            
            addClass(param) {
                this.el().forEach(el => el.classList.add(param))
            },

            removeClass(param) {
                this.el().forEach(el => el.classList.remove(param))
            },
            
            slug(str) {
                return str
                    .toLowerCase()
                    .replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+|[\_]+/ig, '-')
                    .replace(/ +/g,'-')
                    ;
            },

            remove(param) {
                this.el().forEach(el => el.remove())
            },

            val(param = undefined) {
                let val;

                if (param === undefined) {
                    this.el().forEach(el => {
                        val = el.value;
                    })
                } else {
                    this.el().forEach(el => {
                        el.value = param;
                    })
                }

                return val;
            },

            text(msg = undefined) {
                if (msg === undefined) {
                    return el.innerText;
                } else {
                    this.el().forEach(el => {
                        el.innerText = msg;
                    })
                }
            },

            html(data = undefined) {
                if (data === undefined) {
                    return el.innerHTML;
                } else {
                    this.el().forEach(el => {
                        el.innerHTML = data;
                    })
                }
            }
        }
    };

    const emojiObj = {
        'People': [
            {
                "emoji": "😀",
                "title": "Grinning Face"
            },
            {
                "emoji": "😃",
                "title": "Grinning Face with Big Eyes"
            },
            {
                "emoji": "😄",
                "title": "Grinning Face with Smiling Eyes"
            },
            {
                "emoji": "😁",
                "title": "Beaming Face with Smiling Eyes"
            },
            {
                "emoji": "😆",
                "title": "Grinning Squinting Face"
            },
            {
                "emoji": "😅",
                "title": "Grinning Face with Sweat"
            },
            {
                "emoji": "🤣",
                "title": "Rolling on the Floor Laughing"
            },
            {
                "emoji": "😂",
                "title": "Face with Tears of Joy"
            },
            {
                "emoji": "🙂",
                "title": "Slightly Smiling Face"
            },
            {
                "emoji": "🙃",
                "title": "Upside-Down Face"
            },
            {
                "emoji": "😉",
                "title": "Winking Face"
            },
            {
                "emoji": "😊",
                "title": "Smiling Face with Smiling Eyes"
            },
            {
                "emoji": "😇",
                "title": "Smiling Face with Halo"
            },
            {
                "emoji": "🥰",
                "title": "Smiling Face with Hearts"
            },
            {
                "emoji": "😍",
                "title": "Smiling Face with Heart-Eyes"
            },
            {
                "emoji": "🤩",
                "title": "Star-Struck"
            },
            {
                "emoji": "😘",
                "title": "Face Blowing a Kiss"
            },
            {
                "emoji": "😗",
                "title": "Kissing Face"
            },
            {
                "emoji": "☺️",
                "title": "Smiling Face"
            },
            {
                "emoji": "😚",
                "title": "Kissing Face with Closed Eyes"
            },
            {
                "emoji": "😙",
                "title": "Kissing Face with Smiling Eyes"
            },
            {
                "emoji": "🥲",
                "title": "Smiling Face with Tear"
            },
            {
                "emoji": "😋",
                "title": "Face Savoring Food"
            },
            {
                "emoji": "😛",
                "title": "Face with Tongue"
            },
            {
                "emoji": "😜",
                "title": "Winking Face with Tongue"
            },
            {
                "emoji": "🤪",
                "title": "Zany Face"
            },
            {
                "emoji": "😝",
                "title": "Squinting Face with Tongue"
            },
            {
                "emoji": "🤑",
                "title": "Money-Mouth Face"
            },
            {
                "emoji": "🤗",
                "title": "Smiling Face with Open Hands"
            },
            {
                "emoji": "🤭",
                "title": "Face with Hand Over Mouth"
            },
            {
                "emoji": "🤫",
                "title": "Shushing Face"
            },
            {
                "emoji": "🤔",
                "title": "Thinking Face"
            },
            {
                "emoji": "🤐",
                "title": "Zipper-Mouth Face"
            },
            {
                "emoji": "🤨",
                "title": "Face with Raised Eyebrow"
            },
            {
                "emoji": "😐",
                "title": "Neutral Face"
            },
            {
                "emoji": "😑",
                "title": "Expressionless Face"
            },
            {
                "emoji": "😶",
                "title": "Face Without Mouth"
            },
            {
                "emoji": "😶‍🌫️",
                "title": "Face in Clouds"
            },
            {
                "emoji": "😏",
                "title": "Smirking Face"
            },
            {
                "emoji": "😒",
                "title": "Unamused Face"
            },
            {
                "emoji": "🙄",
                "title": "Face with Rolling Eyes"
            },
            {
                "emoji": "😬",
                "title": "Grimacing Face"
            },
            {
                "emoji": "😮‍💨",
                "title": "Face Exhaling"
            },
            {
                "emoji": "🤥",
                "title": "Lying Face"
            },
            {
                "emoji": "😌",
                "title": "Relieved Face"
            },
            {
                "emoji": "😔",
                "title": "Pensive Face"
            },
            {
                "emoji": "😪",
                "title": "Sleepy Face"
            },
            {
                "emoji": "🤤",
                "title": "Drooling Face"
            },
            {
                "emoji": "😴",
                "title": "Sleeping Face"
            },
            {
                "emoji": "😷",
                "title": "Face with Medical Mask"
            },
            {
                "emoji": "🤒",
                "title": "Face with Thermometer"
            },
            {
                "emoji": "🤕",
                "title": "Face with Head-Bandage"
            },
            {
                "emoji": "🤢",
                "title": "Nauseated Face"
            },
            {
                "emoji": "🤮",
                "title": "Face Vomiting"
            },
            {
                "emoji": "🤧",
                "title": "Sneezing Face"
            },
            {
                "emoji": "🥵",
                "title": "Hot Face"
            },
            {
                "emoji": "🥶",
                "title": "Cold Face"
            },
            {
                "emoji": "🥴",
                "title": "Woozy Face"
            },
            {
                "emoji": "😵",
                "title": "Face with Crossed-Out Eyes"
            },
            {
                "emoji": "😵‍💫",
                "title": "Face with Spiral Eyes"
            },
            {
                "emoji": "🤯",
                "title": "Exploding Head"
            },
            {
                "emoji": "🤠",
                "title": "Cowboy Hat Face"
            },
            {
                "emoji": "🥳",
                "title": "Partying Face"
            },
            {
                "emoji": "🥸",
                "title": "Disguised Face"
            },
            {
                "emoji": "😎",
                "title": "Smiling Face with Sunglasses"
            },
            {
                "emoji": "🤓",
                "title": "Nerd Face"
            },
            {
                "emoji": "🧐",
                "title": "Face with Monocle"
            },
            {
                "emoji": "😕",
                "title": "Confused Face"
            },
            {
                "emoji": "😟",
                "title": "Worried Face"
            },
            {
                "emoji": "🙁",
                "title": "Slightly Frowning Face"
            },
            {
                "emoji": "☹️",
                "title": "Frowning Face"
            },
            {
                "emoji": "😮",
                "title": "Face with Open Mouth"
            },
            {
                "emoji": "😯",
                "title": "Hushed Face"
            },
            {
                "emoji": "😲",
                "title": "Astonished Face"
            },
            {
                "emoji": "😳",
                "title": "Flushed Face"
            },
            {
                "emoji": "🥺",
                "title": "Pleading Face"
            },
            {
                "emoji": "😦",
                "title": "Frowning Face with Open Mouth"
            },
            {
                "emoji": "😧",
                "title": "Anguished Face"
            },
            {
                "emoji": "😨",
                "title": "Fearful Face"
            },
            {
                "emoji": "😰",
                "title": "Anxious Face with Sweat"
            },
            {
                "emoji": "😥",
                "title": "Sad but Relieved Face"
            },
            {
                "emoji": "😢",
                "title": "Crying Face"
            },
            {
                "emoji": "😭",
                "title": "Loudly Crying Face"
            },
            {
                "emoji": "😱",
                "title": "Face Screaming in Fear"
            },
            {
                "emoji": "😖",
                "title": "Confounded Face"
            },
            {
                "emoji": "😣",
                "title": "Persevering Face"
            },
            {
                "emoji": "😞",
                "title": "Disappointed Face"
            },
            {
                "emoji": "😓",
                "title": "Downcast Face with Sweat"
            },
            {
                "emoji": "😩",
                "title": "Weary Face"
            },
            {
                "emoji": "😫",
                "title": "Tired Face"
            },
            {
                "emoji": "🥱",
                "title": "Yawning Face"
            },
            {
                "emoji": "😤",
                "title": "Face with Steam From Nose"
            },
            {
                "emoji": "😡",
                "title": "Enraged Face"
            },
            {
                "emoji": "😠",
                "title": "Angry Face"
            },
            {
                "emoji": "🤬",
                "title": "Face with Symbols on Mouth"
            },
            {
                "emoji": "😈",
                "title": "Smiling Face with Horns"
            },
            {
                "emoji": "👿",
                "title": "Angry Face with Horns"
            },
            {
                "emoji": "💀",
                "title": "Skull"
            },
            {
                "emoji": "☠️",
                "title": "Skull and Crossbones"
            },
            {
                "emoji": "💩",
                "title": "Pile of Poo"
            },
            {
                "emoji": "🤡",
                "title": "Clown Face"
            },
            {
                "emoji": "👹",
                "title": "Ogre"
            },
            {
                "emoji": "👺",
                "title": "Goblin"
            },
            {
                "emoji": "👻",
                "title": "Ghost"
            },
            {
                "emoji": "👽",
                "title": "Alien"
            },
            {
                "emoji": "👾",
                "title": "Alien Monster"
            },
            {
                "emoji": "🤖",
                "title": "Robot"
            },
            {
                "emoji": "😺",
                "title": "Grinning Cat"
            },
            {
                "emoji": "😸",
                "title": "Grinning Cat with Smiling Eyes"
            },
            {
                "emoji": "😹",
                "title": "Cat with Tears of Joy"
            },
            {
                "emoji": "😻",
                "title": "Smiling Cat with Heart-Eyes"
            },
            {
                "emoji": "😼",
                "title": "Cat with Wry Smile"
            },
            {
                "emoji": "😽",
                "title": "Kissing Cat"
            },
            {
                "emoji": "🙀",
                "title": "Weary Cat"
            },
            {
                "emoji": "😿",
                "title": "Crying Cat"
            },
            {
                "emoji": "😾",
                "title": "Pouting Cat"
            },
            {
                "emoji": "💋",
                "title": "Kiss Mark"
            },
            {
                "emoji": "✋",
                "title": "Raised Hand"
            },
            {
                "emoji": "👌",
                "title": "OK Hand"
            },
            {
                "emoji": "🤌",
                "title": "Pinched Fingers"
            },
            {
                "emoji": "👍",
                "title": "Thumbs Up"
            },
            {
                "emoji": "👎",
                "title": "Thumbs Down"
            },
            {
                "emoji": "👏",
                "title": "Clapping Hands"
            },
            {
                "emoji": "🤝",
                "title": "Handshake"
            },
            {
                "emoji": "🙏",
                "title": "Folded Hands"
            },
            {
                "emoji": "💅",
                "title": "Nail Polish"
            },
            {
                "emoji": "💪",
                "title": "Flexed Biceps"
            },
            {
                "emoji": "👂",
                "title": "Ear"
            },
            {
                "emoji": "👀",
                "title": "Eyes"
            },
            {
                "emoji": "👁️",
                "title": "Eye"
            },
            {
                "emoji": "👅",
                "title": "Tongue"
            },
            {
                "emoji": "👄",
                "title": "Mouth"
            },
            {
                "emoji": "👶",
                "title": "Baby"
            },
            {
                "emoji": "🧓",
                "title": "Older Person"
            },
            {
                "emoji": "👴",
                "title": "Old Man"
            },
            {
                "emoji": "👵",
                "title": "Old Woman"
            },
            {
                "emoji": "🙎‍♀️",
                "title": "Woman Pouting"
            },
            {
                "emoji": "🙅",
                "title": "Person Gesturing No"
            },
            {
                "emoji": "🙅‍♂️",
                "title": "Man Gesturing No"
            },
            {
                "emoji": "💁",
                "title": "Person Tipping Hand"
            },
            {
                "emoji": "💁‍♂️",
                "title": "Man Tipping Hand"
            },
            {
                "emoji": "💁‍♀️",
                "title": "Woman Tipping Hand"
            },
            {
                "emoji": "🙋",
                "title": "Person Raising Hand"
            },
            {
                "emoji": "🙋‍♂️",
                "title": "Man Raising Hand"
            },
            {
                "emoji": "🙋‍♀️",
                "title": "Woman Raising Hand"
            },
            {
                "emoji": "🙇",
                "title": "Person Bowing"
            },
            {
                "emoji": "🙇‍♂️",
                "title": "Man Bowing"
            },
            {
                "emoji": "🙇‍♀️",
                "title": "Woman Bowing"
            },
            {
                "emoji": "🤦",
                "title": "Person Facepalming"
            },
            {
                "emoji": "🤦‍♂️",
                "title": "Man Facepalming"
            },
            {
                "emoji": "🤦‍♀️",
                "title": "Woman Facepalming"
            },
            {
                "emoji": "🤷",
                "title": "Person Shrugging"
            },
            {
                "emoji": "🤷‍♂️",
                "title": "Man Shrugging"
            },
            {
                "emoji": "🤷‍♀️",
                "title": "Woman Shrugging"
            },
            {
                "emoji": "🤴",
                "title": "Prince"
            },
            {
                "emoji": "👸",
                "title": "Princess"
            },

            {
                "emoji": "👼",
                "title": "Baby Angel"
            },
            {
                "emoji": "🧙",
                "title": "Mage"
            },
            {
                "emoji": "🧙‍♂️",
                "title": "Man Mage"
            },
            {
                "emoji": "🧙‍♀️",
                "title": "Woman Mage"
            },
            {
                "emoji": "🧚",
                "title": "Fairy"
            },
            {
                "emoji": "🧚‍♂️",
                "title": "Man Fairy"
            },
            {
                "emoji": "🧚‍♀️",
                "title": "Woman Fairy"
            },
            {
                "emoji": "🧛",
                "title": "Vampire"
            },
            {
                "emoji": "🧛‍♂️",
                "title": "Man Vampire"
            },
            {
                "emoji": "🧛‍♀️",
                "title": "Woman Vampire"
            },
            {
                "emoji": "🧜",
                "title": "Merperson"
            },
            {
                "emoji": "🧜‍♂️",
                "title": "Merman"
            },
            {
                "emoji": "🧜‍♀️",
                "title": "Mermaid"
            },
            {
                "emoji": "🧝",
                "title": "Elf"
            },
            {
                "emoji": "🧝‍♂️",
                "title": "Man Elf"
            },
            {
                "emoji": "🧝‍♀️",
                "title": "Woman Elf"
            },
            {
                "emoji": "🧟",
                "title": "Zombie"
            },
            {
                "emoji": "🏃",
                "title": "Person Running"
            },
            {
                "emoji": "💃",
                "title": "Woman Dancing"
            },
            {
                "emoji": "🕴️",
                "title": "Person in Suit Levitating"
            },
            {
                "emoji": "👯",
                "title": "People with Bunny Ears"
            },
            {
                "emoji": "🎃",
                "title": "Jack-O-Lantern"
            },
            {
                "emoji": "🩸",
                "title": "Drop of Blood"
            }
        ],
        'Nature': [
            {
                "emoji": "🙈",
                "title": "See-No-Evil Monkey"
            },
            {
                "emoji": "🙉",
                "title": "Hear-No-Evil Monkey"
            },
            {
                "emoji": "🙊",
                "title": "Speak-No-Evil Monkey"
            },
            {
                "emoji": "💥",
                "title": "Collision"
            },
            {
                "emoji": "💫",
                "title": "Dizzy"
            },
            {
                "emoji": "💦",
                "title": "Sweat Droplets"
            },
            {
                "emoji": "🌚",
                "title": "New Moon Face"
            },
            {
                "emoji": "🌝",
                "title": "Full Moon Face"
            },
            {
                "emoji": "🌞",
                "title": "Sun with Face"
            },
            {
                "emoji": "⭐",
                "title": "Star"
            },
            {
                "emoji": "🌈",
                "title": "Rainbow"
            },
            {
                "emoji": "🔥",
                "title": "Fire"
            },
            {
                "emoji": "✨",
                "title": "Sparkles"
            }
        ],
        'Objects': [
            {
                "emoji": "💌",
                "title": "Love Letter"
            },
            {
                "emoji": "💣",
                "title": "Bomb"
            },
            {
                "emoji": "🔪",
                "title": "Kitchen Knife"
            },
            {
                "emoji": "🎉",
                "title": "Party Popper"
            },
            {
                "emoji": "🔮",
                "title": "Crystal Ball"
            },
            {
                "emoji": "🔫",
                "title": "Water Pistol"
            },
            {
                "emoji": "🔗",
                "title": "Link"
            }
        ],
        'Symbols': [
            {
                "emoji": "💘",
                "title": "Heart with Arrow"
            },
            {
                "emoji": "💖",
                "title": "Sparkling Heart"
            },
            {
                "emoji": "💔",
                "title": "Broken Heart"
            },
            {
                "emoji": "❤️‍🔥",
                "title": "Heart on Fire"
            },
            {
                "emoji": "❤️‍🩹",
                "title": "Mending Heart"
            },
            {
                "emoji": "💯",
                "title": "Hundred Points"
            },
            {
                "emoji": "💢",
                "title": "Anger Symbol"
            },
            {
                "emoji": "💬",
                "title": "Speech Balloon"
            },
            {
                "emoji": "🗯️",
                "title": "Right Anger Bubble"
            },
            {
                "emoji": "💭",
                "title": "Thought Balloon"
            },
            {
                "emoji": "💤",
                "title": "Zzz"
            },
            {
                "emoji": "❓",
                "title": "Red Question Mark"
            },
            {
                "emoji": "❗",
                "title": "Red Exclamation Mark"
            },
            {
                "emoji": "✅",
                "title": "Check Mark Button"
            },
            {
                "emoji": "❌",
                "title": "Cross Mark"
            }
        ],
        'Flags': [
            {
                "emoji": "🏁",
                "title": "Chequered Flag"
            },
            {
                "emoji": "🚩",
                "title": "Triangular Flag"
            },
            {
                "emoji": "🏳️‍🌈",
                "title": "Rainbow Flag"
            },
            {
                "emoji": "🏳️‍⚧️",
                "title": "Transgender Flag"
            },
            {
                "emoji": "🏴‍☠️",
                "title": "Pirate Flag"
            }
        ]
    };

    const categoryFlags = {
        'People': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M437.02,74.98C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.98C26.629,123.333,0,187.62,0,256 s26.629,132.668,74.98,181.02C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.98 C485.371,388.668,512,324.38,512,256S485.371,123.333,437.02,74.98z M256,472c-119.103,0-216-96.897-216-216S136.897,40,256,40 s216,96.897,216,216S375.103,472,256,472z"/> </g> </g> <g> <g> <path d="M368.993,285.776c-0.072,0.214-7.298,21.626-25.02,42.393C321.419,354.599,292.628,368,258.4,368 c-34.475,0-64.195-13.561-88.333-40.303c-18.92-20.962-27.272-42.54-27.33-42.691l-37.475,13.99 c0.42,1.122,10.533,27.792,34.013,54.273C171.022,389.074,212.215,408,258.4,408c46.412,0,86.904-19.076,117.099-55.166 c22.318-26.675,31.165-53.55,31.531-54.681L368.993,285.776z"/> </g> </g> <g> <g> <circle cx="168" cy="180.12" r="32"/> </g> </g> <g> <g> <circle cx="344" cy="180.12" r="32"/> </g> </g> <g> </g> <g> </g> <g> </g> </svg>',
        'Nature': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 354.968 354.968" style="enable-background:new 0 0 354.968 354.968;" xml:space="preserve"> <g> <g> <path d="M350.775,341.319c-9.6-28.4-20.8-55.2-34.4-80.8c0.4-0.4,0.8-1.2,1.6-1.6c30.8-34.8,44-83.6,20.4-131.6 c-20.4-41.6-65.6-76.4-124.8-98.8c-57.2-22-127.6-32.4-200.4-27.2c-5.6,0.4-10,5.2-9.6,10.8c0.4,2.8,1.6,5.6,4,7.2 c36.8,31.6,50,79.2,63.6,126.8c8,28,15.6,55.6,28.4,81.2c0,0.4,0.4,0.4,0.4,0.8c30.8,59.6,78,81.2,122.8,78.4 c18.4-1.2,36-6.4,52.4-14.4c9.2-4.8,18-10.4,26-16.8c11.6,23.2,22,47.2,30.4,72.8c1.6,5.2,7.6,8,12.8,6.4 C349.975,352.119,352.775,346.519,350.775,341.319z M271.175,189.319c-34.8-44.4-78-82.4-131.6-112.4c-4.8-2.8-11.2-1.2-13.6,4 c-2.8,4.8-1.2,11.2,4,13.6c50.8,28.8,92.4,64.8,125.6,107.2c13.2,17.2,25.2,35.2,36,54c-8,7.6-16.4,13.6-25.6,18 c-14,7.2-28.8,11.6-44.4,12.4c-37.6,2.4-77.2-16-104-67.6v-0.4c-11.6-24-19.2-50.8-26.8-78c-12.4-43.2-24.4-86.4-53.6-120.4 c61.6-1.6,120.4,8.4,169.2,27.2c54.4,20.8,96,52,114,88.8c18.8,38,9.2,76.8-14.4,105.2 C295.575,222.919,283.975,205.719,271.175,189.319z"/> </g> </g> <g> </g> <g> </g> <g> </g> </svg>',
        'Objects': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 461.977 461.977" style="enable-background:new 0 0 461.977 461.977;" xml:space="preserve"> <g> <path d="M398.47,248.268L346.376,18.543C344.136,8.665,333.287,0,323.158,0H138.821c-10.129,0-20.979,8.665-23.219,18.543 L63.507,248.268c-0.902,3.979-0.271,7.582,1.775,10.145c2.047,2.564,5.421,3.975,9.501,3.975h51.822v39.108 c-6.551,3.555-11,10.493-11,18.47c0,11.598,9.402,21,21,21c11.598,0,21-9.402,21-21c0-7.978-4.449-14.916-11-18.47v-39.108h240.587 c4.079,0,7.454-1.412,9.501-3.975C398.742,255.849,399.372,252.247,398.47,248.268z"/> <path d="M318.735,441.977h-77.747V282.388h-20v159.588h-77.747c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10h175.494 c5.522,0,10-4.477,10-10C328.735,446.454,324.257,441.977,318.735,441.977z"/> </g> <g> </g> <g> </g> <g> </g> </svg>',
        'Symbols': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30.487 30.486" style="enable-background:new 0 0 30.487 30.486;" xml:space="preserve"> <g> <path d="M28.866,17.477h-2.521V15.03h-2.56c0.005-2.8-0.304-5.204-0.315-5.308l-0.088-0.67L22.75,8.811 c-0.021-0.008-0.142-0.051-0.317-0.109l2.287-8.519L19,4.836L15.23,0.022V0l-0.009,0.01L15.215,0v0.021l-3.769,4.815L5.725,0.183 l2.299,8.561c-0.157,0.051-0.268,0.09-0.288,0.098L7.104,9.084l-0.088,0.67c-0.013,0.104-0.321,2.508-0.316,5.308h-2.56v2.446H1.62 l0.447,2.514L1.62,22.689h6.474c1.907,2.966,5.186,7.549,7.162,7.797v-0.037c1.979-0.283,5.237-4.838,7.137-7.79h6.474l-0.447-2.67 L28.866,17.477z M21.137,20.355c-0.422,1.375-4.346,6.949-5.907,7.758v0.015c-1.577-0.853-5.461-6.373-5.882-7.739 c-0.002-0.043-0.005-0.095-0.008-0.146l11.804-0.031C21.141,20.264,21.139,20.314,21.137,20.355z M8.972,15.062 c-0.003-1.769,0.129-3.403,0.219-4.298c0.98-0.271,3.072-0.723,6.065-0.78v-0.03c2.979,0.06,5.063,0.51,6.04,0.779 c0.09,0.895,0.223,2.529,0.219,4.298L8.972,15.062z"/> </g> <g> </g> <g> </g> <g> </g> </svg>',
        'Flags': '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill-rule="evenodd"><g id="037---Waypoint-Flag" fill-rule="nonzero" transform="translate(0 -1)"><path id="Shape" d="m59.0752 28.5054c-3.7664123-1.873859-7.2507049-4.2678838-10.3506-7.1118 1.5923634-6.0211307 2.7737841-12.14349669 3.5361-18.3248.1788-1.44-.623-1.9047-.872-2.0126-.7016942-.26712004-1.4944908-.00419148-1.8975.6293-5.4726 6.5479-12.9687 5.8008-20.9053 5.0054-7.9985-.8-16.2506-1.6116-22.3684 5.4114-.85552122-1.067885-2.26533581-1.5228479-3.5837-1.1565l-.1377.0386c-1.81412367.5095218-2.87378593 2.391025-2.3691 4.2065l12.2089 43.6891c.3541969 1.2645215 1.5052141 2.1399137 2.8184 2.1435.2677318-.0003961.5341685-.0371657.792-.1093l1.0683-.2984h.001c.7485787-.2091577 1.3833789-.7071796 1.7646969-1.3844635.381318-.677284.4779045-1.478326.2685031-2.2268365l-3.7812-13.5327c5.5066-7.0807 13.18-6.3309 21.2988-5.52 8.1094.81 16.4863 1.646 22.64-5.7129l.0029-.0039c.6044387-.7534187.8533533-1.7315007.6826-2.6822-.0899994-.4592259-.3932698-.8481635-.8167-1.0474zm-42.0381 29.7446c-.1201754.2157725-.3219209.3742868-.56.44l-1.0684.2983c-.4949157.1376357-1.0078362-.1513714-1.1465-.646l-12.2095-43.6895c-.20840349-.7523825.23089143-1.5316224.9825-1.7428l.1367-.0381c.12366014-.0348192.25153137-.0524183.38-.0523.63429117.0010181 1.19083557.4229483 1.3631 1.0334l.1083.3876v.0021l6.2529 22.3755 5.8468 20.9238c.0669515.2380103.0360256.4929057-.0859.708zm40.6329-27.2925c-5.4736 6.5459-12.9707 5.7974-20.9043 5.0039-7.9033-.79-16.06-1.605-22.1552 5.1558l-5.463-19.548-2.0643-7.3873c5.5068-7.0794 13.1796-6.3119 21.3045-5.5007 7.7148.7695 15.6787 1.5664 21.7373-4.7095-.7467138 5.70010904-1.859683 11.3462228-3.332 16.9033-.1993066.7185155.0267229 1.4878686.583 1.9844 3.1786296 2.9100325 6.7366511 5.3762694 10.5771 7.3315-.0213812.2768572-.1194065.5422977-.2831.7666z"/></g></g></svg>'
    };

    const icons = {
        close: '<svg style="height: 11px !important;" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><path d="M28.94,26,51.39,3.55A2.08,2.08,0,0,0,48.45.61L26,23.06,3.55.61A2.08,2.08,0,0,0,.61,3.55L23.06,26,.61,48.45A2.08,2.08,0,0,0,2.08,52a2.05,2.05,0,0,0,1.47-.61L26,28.94,48.45,51.39a2.08,2.08,0,0,0,2.94-2.94Z"/></svg>'
    }

    const functions = {

        styles: () => {

            const styles = `
                <style>
                    .fg-emoji-container {
                        width: 100%;
                        border-radius: 5px;
                        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
                        background-color: white;
                        overflow: hidden;
                        margin-bottom: 10px;
                    }

                    .fg-emoji-container svg {
                        max-width: 100%;
                        box-sizing: border-box;
                        width: 15px;
                        height: 15px;
                    }

                    .fg-emoji-picker-category-title {
                        display: block;
                        margin: 20px 0 0 0;
                        padding: 0 10px 5px 10px;
                        font-size: 16px;
                        font-family: sans-serif;
                        font-weight: bold;
                        flex: 0 0 calc(100% - 20px);
                        border-bottom: 1px solid #ededed;
                    }

                    .fg-emoji-nav {
                        background-color: #646772;
                    }

                    .fg-emoji-nav li a svg {
                        transition: all .2s ease;
                        fill: white;
                    }

                    .fg-emoji-nav li:hover a svg {
                        fill: black;
                    }

                    .fg-emoji-nav ul {
                        display: flex;
                        flex-wrap: wrap;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        border-bottom: 1px solid #dbdbdb;
                    }

                    .fg-emoji-nav ul li {
                        flex: 1;
                    }

                    .fg-emoji-nav ul li a {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 40px;
                        transition: all .2s ease;
                    }

                    .fg-emoji-nav ul li a:hover {
                        background-color: #e9ebf1;
                    }

                    .fg-emoji-nav ul li.active a {
                        background-color: #e9ebf1;
                    }

                    .fg-emoji-nav ul li.emoji-picker-nav-active a {
                        background-color: #e9ebf1;
                    }

                    .fg-emoji-nav ul li.emoji-picker-nav-active a svg {
                        fill: #646772;
                    }

                    .fg-emoji-picker-move {
                        /* pointer-events: none; */
                        cursor: move;
                    }

                    .fg-picker-special-buttons a {
                        background-color: ${this.options.specialButtons ? this.options.specialButtons : '#ed5e28'};
                    }

                    .fg-picker-special-buttons:last-child a {
                        box-shadow: inset 1px 0px 0px 0 rgba(0, 0, 0, 0.11);
                    }

                    .fg-emoji-list {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        overflow-y: scroll;
                        overflow-x: hidden;
                        height: 213px;
                    }

                    .fg-emoji-picker-category-wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        flex: 1;
                    }

                    .fg-emoji-list li {
                        position: relative;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        flex: 0 0 calc(100% / 15);
                        height: 50px;
                    }

                    .fg-emoji-list li a {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        text-decoration: none;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        font-size: 23px;
                        background-color: #ffffff;
                        border-radius: 3px;
                        transition: all .3s ease;
                    }
                    
                    .fg-emoji-list li a:hover {
                        background-color: #ebebeb;
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', styles);
        },
        
        render: (e, attr) => {

            emojiList = undefined;

            const index = this.options.trigger.findIndex(item => item.selector === attr);
            this.insertInto = this.options.trigger[index].insertInto;

            if (!emojiesHTML.length) {

                for (const key in emojiObj) {
                    if (emojiObj.hasOwnProperty.call(emojiObj, key)) {
                        const categoryObj = emojiObj[key];

                        
                        categoriesHTML += `<li>
                            <a title="${key}" href="#${key}">${categoryFlags[key]}</a>
                        </li>`;

                        emojiesHTML += `<div class="fg-emoji-picker-category-wrapper" id="${key}">`;
                            emojiesHTML += `<p class="fg-emoji-picker-category-title">${key}</p>`;
                            categoryObj.forEach(ej => {
                                emojiesHTML += `<li data-title="${ej.title.toLowerCase()}">
                                    <a title="${ej.title}" href="#">${ej.emoji}</a>
                                </li>`;
                            });
                        emojiesHTML += '</div>';
                    }
                }
            }


            if (document.querySelector('.fg-emoji-container')) {
                this.lib('.fg-emoji-container').remove();
            }


            const picker = `
                <div class="fg-emoji-container">
                    <nav class="fg-emoji-nav">
                        <ul>
                            ${categoriesHTML}

                            ${this.options.closeButton ? `<li class="fg-picker-special-buttons"><a id="fg-emoji-picker-close-button" href="#">`+icons.close+`</a></li>` : ''}
                        </ul>
                    </nav>

                    <div>
                        <!--<div class="fg-emoji-picker-loader-animation">
                            <div class="spinner">
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                        </div>-->

                        <ul class="fg-emoji-list">
                            ${emojiesHTML}
                        </ul>
                    </div>
                </div>
            `;

            document.getElementById('emojiSelect').insertAdjacentHTML('beforeend', picker);
        },


        closePicker: (e) => {

            e.preventDefault();

            this.lib('.fg-emoji-container').remove();
        },


        checkPickerExist(e) {

            if (document.querySelector('.fg-emoji-container') && !e.target.closest('.fg-emoji-container')) {

                functions.closePicker.call(this, e);
            }
        },


        setCaretPosition: (field, caretPos) => {
            var elem = field
            if (elem != null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                } else {
                    if (elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else {
                        elem.focus();
                    }
                }
            }
        },


        insert: e => {

            e.preventDefault();
            
            const emoji = e.target.innerText.trim();
            const myField = document.querySelectorAll(this.insertInto);
            const myValue = emoji;

            // Check if selector is an array
            myField.forEach(myField => {

                if (document.selection) {
                    myField.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                } else if (myField.selectionStart || myField.selectionStart == "0") {
                    const startPos = myField.selectionStart;
                    const endPos = myField.selectionEnd;
                    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
                    
                    functions.setCaretPosition(myField, startPos + 2)
                    
                } else {
                    myField.value += myValue;
                    myField.focus()
                }

                myField.dispatchEvent(new InputEvent('input'));
                if (this.options.closeOnSelect) {
                    functions.closePicker.call(this, e);
                }

            })
        },


        categoryNav: e => {
            e.preventDefault();

            const link          = e.target.closest('a');

            if (link.getAttribute('id') && link.getAttribute('id') === 'fg-emoji-picker-close-button') return false;

            const id            = link.getAttribute('href');
            const emojiBody     = document.querySelector('.fg-emoji-list');
            const destination   = emojiBody.querySelector(`${id}`);

            this.lib('.fg-emoji-nav li').removeClass('emoji-picker-nav-active');
            link.closest('li').classList.add('emoji-picker-nav-active');

            emojiBody.scrollTop = destination.offsetTop - emojiBody.offsetHeight;
        }
    };



    const bindEvents = () => {

        this.lib(document.body).on('click', functions.closePicker, '#fg-emoji-picker-close-button');
        this.lib(document.body).on('click', functions.checkPickerExist);
        this.lib(document.body).on('click', functions.render, this.trigger);
        this.lib(document.body).on('click', functions.insert, '.fg-emoji-list a');
        this.lib(document.body).on('click', functions.categoryNav, '.fg-emoji-nav a');
    };

    

    (() => {

        // Start styles
        functions.styles();

        // Event functions
        bindEvents.call(this);
        
    })()
}
