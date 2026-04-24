'use strict';

// ── Word list (inlined to avoid fetch/CORS issues on file://) ──────────────
const WORD_LIST = [
  { word: "sunburn",    first: "sun",    second: "burn"    },
  { word: "sunflower",  first: "sun",    second: "flower"  },
  { word: "sunshine",   first: "sun",    second: "shine"   },
  { word: "sunrise",    first: "sun",    second: "rise"    },
  { word: "sunset",     first: "sun",    second: "set"     },
  { word: "sunlight",   first: "sun",    second: "light"   },
  { word: "sunbeam",    first: "sun",    second: "beam"    },
  { word: "sunscreen",  first: "sun",    second: "screen"  },
  { word: "sunroof",    first: "sun",    second: "roof"    },
  { word: "sunstroke",  first: "sun",    second: "stroke"  },
  { word: "sunspot",    first: "sun",    second: "spot"    },
  { word: "sundown",    first: "sun",    second: "down"    },
  { word: "flowerbed",  first: "flower", second: "bed"     },
  { word: "flowerpot",  first: "flower", second: "pot"     },
  { word: "wallflower", first: "wall",   second: "flower"  },
  { word: "shinbone",   first: "shine",  second: "bone"    },
  { word: "setback",    first: "set",    second: "back"    },
  { word: "setdown",    first: "set",    second: "down"    },
  { word: "lighthouse", first: "light",  second: "house"   },
  { word: "lightbulb",  first: "light",  second: "bulb"    },
  { word: "lightweight",first: "light",  second: "weight"  },
  { word: "lightyear",  first: "light",  second: "year"    },
  { word: "burnout",    first: "burn",   second: "out"     },
  { word: "burnmark",   first: "burn",   second: "mark"    },
  { word: "heartburn",  first: "heart",  second: "burn"    },
  { word: "rooftop",    first: "roof",   second: "top"     },
  { word: "rooftree",   first: "roof",   second: "tree"    },
  { word: "sunroof",    first: "sun",    second: "roof"    },
  { word: "bedrock",    first: "bed",    second: "rock"    },
  { word: "bedroom",    first: "bed",    second: "room"    },
  { word: "bedside",    first: "bed",    second: "side"    },
  { word: "bedtime",    first: "bed",    second: "time"    },
  { word: "bedpost",    first: "bed",    second: "post"    },
  { word: "pothole",    first: "pot",    second: "hole"    },
  { word: "potluck",    first: "pot",    second: "luck"    },
  { word: "potshot",    first: "pot",    second: "shot"    },
  { word: "housefly",   first: "house",  second: "fly"     },
  { word: "household",  first: "house",  second: "hold"    },
  { word: "houseplant", first: "house",  second: "plant"   },
  { word: "housework",  first: "house",  second: "work"    },
  { word: "housemate",  first: "house",  second: "mate"    },
  { word: "housetop",   first: "house",  second: "top"     },
  { word: "rockslide",  first: "rock",   second: "slide"   },
  { word: "rockfall",   first: "rock",   second: "fall"    },
  { word: "rockstar",   first: "rock",   second: "star"    },
  { word: "rockfish",   first: "rock",   second: "fish"    },
  { word: "starfish",   first: "star",   second: "fish"    },
  { word: "starlight",  first: "star",   second: "light"   },
  { word: "stardust",   first: "star",   second: "dust"    },
  { word: "starboard",  first: "star",   second: "board"   },
  { word: "starburst",  first: "star",   second: "burst"   },
  { word: "fishpond",   first: "fish",   second: "pond"    },
  { word: "fishbowl",   first: "fish",   second: "bowl"    },
  { word: "fishtail",   first: "fish",   second: "tail"    },
  { word: "fishcake",   first: "fish",   second: "cake"    },
  { word: "fishnet",    first: "fish",   second: "net"     },
  { word: "goldfish",   first: "gold",   second: "fish"    },
  { word: "rockfish",   first: "rock",   second: "fish"    },
  { word: "dustbin",    first: "dust",   second: "bin"     },
  { word: "dustpan",    first: "dust",   second: "pan"     },
  { word: "dustcoat",   first: "dust",   second: "coat"    },
  { word: "duststorm",  first: "dust",   second: "storm"   },
  { word: "stardust",   first: "star",   second: "dust"    },
  { word: "boardwalk",  first: "board",  second: "walk"    },
  { word: "boardroom",  first: "board",  second: "room"    },
  { word: "boardgame",  first: "board",  second: "game"    },
  { word: "tailgate",   first: "tail",   second: "gate"    },
  { word: "tailwind",   first: "tail",   second: "wind"    },
  { word: "tailspin",   first: "tail",   second: "spin"    },
  { word: "tailback",   first: "tail",   second: "back"    },
  { word: "tailpipe",   first: "tail",   second: "pipe"    },
  { word: "windmill",   first: "wind",   second: "mill"    },
  { word: "windfall",   first: "wind",   second: "fall"    },
  { word: "windpipe",   first: "wind",   second: "pipe"    },
  { word: "windshield", first: "wind",   second: "shield"  },
  { word: "windstorm",  first: "wind",   second: "storm"   },
  { word: "windsock",   first: "wind",   second: "sock"    },
  { word: "woodwind",   first: "wood",   second: "wind"    },
  { word: "crosswind",  first: "cross",  second: "wind"    },
  { word: "tailwind",   first: "tail",   second: "wind"    },
  { word: "millstone",  first: "mill",   second: "stone"   },
  { word: "millpond",   first: "mill",   second: "pond"    },
  { word: "millwork",   first: "mill",   second: "work"    },
  { word: "fallout",    first: "fall",   second: "out"     },
  { word: "fallback",   first: "fall",   second: "back"    },
  { word: "storehouse", first: "store",  second: "house"   },
  { word: "storefront", first: "store",  second: "front"   },
  { word: "storeroom",  first: "store",  second: "room"    },
  { word: "bookstore",  first: "book",   second: "store"   },
  { word: "stormcloud", first: "storm",  second: "cloud"   },
  { word: "stormfront", first: "storm",  second: "front"   },
  { word: "stormwater", first: "storm",  second: "water"   },
  { word: "snowstorm",  first: "snow",   second: "storm"   },
  { word: "brainstorm", first: "brain",  second: "storm"   },
  { word: "rainstorm",  first: "rain",   second: "storm"   },
  { word: "firestorm",  first: "fire",   second: "storm"   },
  { word: "sandstorm",  first: "sand",   second: "storm"   },
  { word: "duststorm",  first: "dust",   second: "storm"   },
  { word: "stonewall",  first: "stone",  second: "wall"    },
  { word: "stonework",  first: "stone",  second: "work"    },
  { word: "stonefish",  first: "stone",  second: "fish"    },
  { word: "millstone",  first: "mill",   second: "stone"   },
  { word: "sandstone",  first: "sand",   second: "stone"   },
  { word: "keystone",   first: "key",    second: "stone"   },
  { word: "birthstone", first: "birth",  second: "stone"   },
  { word: "cornerstone",first: "corner", second: "stone"   },
  { word: "wallpaper",  first: "wall",   second: "paper"   },
  { word: "wallboard",  first: "wall",   second: "board"   },
  { word: "stonewall",  first: "stone",  second: "wall"    },
  { word: "waterfall",  first: "water",  second: "fall"    },
  { word: "waterproof", first: "water",  second: "proof"   },
  { word: "waterway",   first: "water",  second: "way"     },
  { word: "watercolor", first: "water",  second: "color"   },
  { word: "watermark",  first: "water",  second: "mark"    },
  { word: "waterfront", first: "water",  second: "front"   },
  { word: "waterwork",  first: "water",  second: "work"    },
  { word: "breakwater", first: "break",  second: "water"   },
  { word: "stormwater", first: "storm",  second: "water"   },
  { word: "rainwater",  first: "rain",   second: "water"   },
  { word: "groundwater",first: "ground", second: "water"   },
  { word: "groundwork", first: "ground", second: "work"    },
  { word: "groundhog",  first: "ground", second: "hog"     },
  { word: "playground", first: "play",   second: "ground"  },
  { word: "paperback",  first: "paper",  second: "back"    },
  { word: "paperwork",  first: "paper",  second: "work"    },
  { word: "paperweight",first: "paper",  second: "weight"  },
  { word: "paperboy",   first: "paper",  second: "boy"     },
  { word: "paperclip",  first: "paper",  second: "clip"    },
  { word: "wallpaper",  first: "wall",   second: "paper"   },
  { word: "sandpaper",  first: "sand",   second: "paper"   },
  { word: "newspaper",  first: "news",   second: "paper"   },
  { word: "markdown",   first: "mark",   second: "down"    },
  { word: "bookmark",   first: "book",   second: "mark"    },
  { word: "watermark",  first: "water",  second: "mark"    },
  { word: "birthmark",  first: "birth",  second: "mark"    },
  { word: "landmark",   first: "land",   second: "mark"    },
  { word: "postmark",   first: "post",   second: "mark"    },
  { word: "burnmark",   first: "burn",   second: "mark"    },
  { word: "bookworm",   first: "book",   second: "worm"    },
  { word: "bookshelf",  first: "book",   second: "shelf"   },
  { word: "bookcase",   first: "book",   second: "case"    },
  { word: "bookend",    first: "book",   second: "end"     },
  { word: "notebook",   first: "note",   second: "book"    },
  { word: "handbook",   first: "hand",   second: "book"    },
  { word: "workbook",   first: "work",   second: "book"    },
  { word: "logbook",    first: "log",    second: "book"    },
  { word: "schoolbook", first: "school", second: "book"    },
  { word: "playbook",   first: "play",   second: "book"    },
  { word: "wormhole",   first: "worm",   second: "hole"    },
  { word: "wormwood",   first: "worm",   second: "wood"    },
  { word: "woodpecker", first: "wood",   second: "pecker"  },
  { word: "woodland",   first: "wood",   second: "land"    },
  { word: "woodwork",   first: "wood",   second: "work"    },
  { word: "woodchuck",  first: "wood",   second: "chuck"   },
  { word: "woodwind",   first: "wood",   second: "wind"    },
  { word: "woodshed",   first: "wood",   second: "shed"    },
  { word: "firewood",   first: "fire",   second: "wood"    },
  { word: "dogwood",    first: "dog",    second: "wood"    },
  { word: "driftwood",  first: "drift",  second: "wood"    },
  { word: "workout",    first: "work",   second: "out"     },
  { word: "workload",   first: "work",   second: "load"    },
  { word: "workplace",  first: "work",   second: "place"   },
  { word: "workday",    first: "work",   second: "day"     },
  { word: "workbook",   first: "work",   second: "book"    },
  { word: "worksheet",  first: "work",   second: "sheet"   },
  { word: "workshop",   first: "work",   second: "shop"    },
  { word: "workforce",  first: "work",   second: "force"   },
  { word: "firework",   first: "fire",   second: "work"    },
  { word: "stonework",  first: "stone",  second: "work"    },
  { word: "housework",  first: "house",  second: "work"    },
  { word: "groundwork", first: "ground", second: "work"    },
  { word: "teamwork",   first: "team",   second: "work"    },
  { word: "clockwork",  first: "clock",  second: "work"    },
  { word: "overwork",   first: "over",   second: "work"    },
  { word: "fieldwork",  first: "field",  second: "work"    },
  { word: "landmark",   first: "land",   second: "mark"    },
  { word: "landscape",  first: "land",   second: "scape"   },
  { word: "landlord",   first: "land",   second: "lord"    },
  { word: "landslide",  first: "land",   second: "slide"   },
  { word: "landfall",   first: "land",   second: "fall"    },
  { word: "landmine",   first: "land",   second: "mine"    },
  { word: "landfill",   first: "land",   second: "fill"    },
  { word: "woodland",   first: "wood",   second: "land"    },
  { word: "farmland",   first: "farm",   second: "land"    },
  { word: "homeland",   first: "home",   second: "land"    },
  { word: "dreamland",  first: "dream",  second: "land"    },
  { word: "heartland",  first: "heart",  second: "land"    },
  { word: "roommate",   first: "room",   second: "mate"    },
  { word: "housemate",  first: "house",  second: "mate"    },
  { word: "classmate",  first: "class",  second: "mate"    },
  { word: "schoolmate", first: "school", second: "mate"    },
  { word: "playmate",   first: "play",   second: "mate"    },
  { word: "teammate",   first: "team",   second: "mate"    },
  { word: "shipmate",   first: "ship",   second: "mate"    },
  { word: "daydream",   first: "day",    second: "dream"   },
  { word: "daylight",   first: "day",    second: "light"   },
  { word: "daybreak",   first: "day",    second: "break"   },
  { word: "daytime",    first: "day",    second: "time"    },
  { word: "workday",    first: "work",   second: "day"     },
  { word: "birthday",   first: "birth",  second: "day"     },
  { word: "midday",     first: "mid",    second: "day"     },
  { word: "breakdown",  first: "break",  second: "down"    },
  { word: "breakthrough",first:"break",  second: "through" },
  { word: "breakout",   first: "break",  second: "out"     },
  { word: "breakwater", first: "break",  second: "water"   },
  { word: "daybreak",   first: "day",    second: "break"   },
  { word: "heartbreak", first: "heart",  second: "break"   },
  { word: "jailbreak",  first: "jail",   second: "break"   },
  { word: "heartbeat",  first: "heart",  second: "beat"    },
  { word: "heartland",  first: "heart",  second: "land"    },
  { word: "heartburn",  first: "heart",  second: "burn"    },
  { word: "heartfelt",  first: "heart",  second: "felt"    },
  { word: "downfall",   first: "down",   second: "fall"    },
  { word: "download",   first: "down",   second: "load"    },
  { word: "downpour",   first: "down",   second: "pour"    },
  { word: "downtown",   first: "down",   second: "town"    },
  { word: "downhill",   first: "down",   second: "hill"    },
  { word: "downside",   first: "down",   second: "side"    },
  { word: "downtime",   first: "down",   second: "time"    },
  { word: "markdown",   first: "mark",   second: "down"    },
  { word: "countdown",  first: "count",  second: "down"    },
  { word: "lockdown",   first: "lock",   second: "down"    },
  { word: "drumbeat",   first: "drum",   second: "beat"    },
  { word: "drumroll",   first: "drum",   second: "roll"    },
  { word: "drumstick",  first: "drum",   second: "stick"   },
  { word: "broomstick", first: "broom",  second: "stick"   },
  { word: "candlestick",first: "candle", second: "stick"   },
  { word: "lipstick",   first: "lip",    second: "stick"   },
  { word: "yardstick",  first: "yard",   second: "stick"   },
  { word: "backpack",   first: "back",   second: "pack"    },
  { word: "backyard",   first: "back",   second: "yard"    },
  { word: "backbone",   first: "back",   second: "bone"    },
  { word: "backfire",   first: "back",   second: "fire"    },
  { word: "backlash",   first: "back",   second: "lash"    },
  { word: "backlog",    first: "back",   second: "log"     },
  { word: "backroad",   first: "back",   second: "road"    },
  { word: "backtrack",  first: "back",   second: "track"   },
  { word: "backhand",   first: "back",   second: "hand"    },
  { word: "setback",    first: "set",    second: "back"    },
  { word: "paperback",  first: "paper",  second: "back"    },
  { word: "tailback",   first: "tail",   second: "back"    },
  { word: "horseback",  first: "horse",  second: "back"    },
  { word: "firework",   first: "fire",   second: "work"    },
  { word: "fireside",   first: "fire",   second: "side"    },
  { word: "firehouse",  first: "fire",   second: "house"   },
  { word: "fireball",   first: "fire",   second: "ball"    },
  { word: "firefly",    first: "fire",   second: "fly"     },
  { word: "fireplace",  first: "fire",   second: "place"   },
  { word: "firewood",   first: "fire",   second: "wood"    },
  { word: "firestorm",  first: "fire",   second: "storm"   },
  { word: "backfire",   first: "back",   second: "fire"    },
  { word: "crossfire",  first: "cross",  second: "fire"    },
  { word: "ballpark",   first: "ball",   second: "park"    },
  { word: "ballroom",   first: "ball",   second: "room"    },
  { word: "ballgame",   first: "ball",   second: "game"    },
  { word: "ballpoint",  first: "ball",   second: "point"   },
  { word: "snowball",   first: "snow",   second: "ball"    },
  { word: "fireball",   first: "fire",   second: "ball"    },
  { word: "football",   first: "foot",   second: "ball"    },
  { word: "eyeball",    first: "eye",    second: "ball"    },
  { word: "pinball",    first: "pin",    second: "ball"    },
  { word: "snowfall",   first: "snow",   second: "fall"    },
  { word: "snowflake",  first: "snow",   second: "flake"   },
  { word: "snowstorm",  first: "snow",   second: "storm"   },
  { word: "snowboard",  first: "snow",   second: "board"   },
  { word: "snowman",    first: "snow",   second: "man"     },
  { word: "snowplow",   first: "snow",   second: "plow"    },
  { word: "snowdrift",  first: "snow",   second: "drift"   },
  { word: "brainwave",  first: "brain",  second: "wave"    },
  { word: "brainwash",  first: "brain",  second: "wash"    },
  { word: "brainchild", first: "brain",  second: "child"   },
  { word: "heatwave",   first: "heat",   second: "wave"    },
  { word: "airwave",    first: "air",    second: "wave"    },
  { word: "keyboard",   first: "key",    second: "board"   },
  { word: "keyhole",    first: "key",    second: "hole"    },
  { word: "keystone",   first: "key",    second: "stone"   },
  { word: "keynote",    first: "key",    second: "note"    },
  { word: "keypad",     first: "key",    second: "pad"     },
  { word: "keychain",   first: "key",    second: "chain"   },
  { word: "blackboard", first: "black",  second: "board"   },
  { word: "blackbird",  first: "black",  second: "bird"    },
  { word: "blackberry", first: "black",  second: "berry"   },
  { word: "blackout",   first: "black",  second: "out"     },
  { word: "blacksmith", first: "black",  second: "smith"   },
  { word: "blackfish",  first: "black",  second: "fish"    },
  { word: "bluebird",   first: "blue",   second: "bird"    },
  { word: "bluebell",   first: "blue",   second: "bell"    },
  { word: "blueprint",  first: "blue",   second: "print"   },
  { word: "blueberry",  first: "blue",   second: "berry"   },
  { word: "birdhouse",  first: "bird",   second: "house"   },
  { word: "birdsong",   first: "bird",   second: "song"    },
  { word: "birdseed",   first: "bird",   second: "seed"    },
  { word: "birdwatch",  first: "bird",   second: "watch"   },
  { word: "birdcage",   first: "bird",   second: "cage"    },
  { word: "footprint",  first: "foot",   second: "print"   },
  { word: "footstep",   first: "foot",   second: "step"    },
  { word: "foothold",   first: "foot",   second: "hold"    },
  { word: "footnote",   first: "foot",   second: "note"    },
  { word: "footpath",   first: "foot",   second: "path"    },
  { word: "footwear",   first: "foot",   second: "wear"    },
  { word: "stepladder", first: "step",   second: "ladder"  },
  { word: "doorstep",   first: "door",   second: "step"    },
  { word: "footstep",   first: "foot",   second: "step"    },
  { word: "sidestep",   first: "side",   second: "step"    },
  { word: "doorbell",   first: "door",   second: "bell"    },
  { word: "bluebell",   first: "blue",   second: "bell"    },
  { word: "doorway",    first: "door",   second: "way"     },
  { word: "doorknob",   first: "door",   second: "knob"    },
  { word: "doormat",    first: "door",   second: "mat"     },
  { word: "pathway",    first: "path",   second: "way"     },
  { word: "footpath",   first: "foot",   second: "path"    },
  { word: "waypoint",   first: "way",    second: "point"   },
  { word: "wayside",    first: "way",    second: "side"    },
  { word: "gateway",    first: "gate",   second: "way"     },
  { word: "doorway",    first: "door",   second: "way"     },
  { word: "walkway",    first: "walk",   second: "way"     },
  { word: "waterway",   first: "water",  second: "way"     },
  { word: "pathway",    first: "path",   second: "way"     },
  { word: "airway",     first: "air",    second: "way"     },
  { word: "midway",     first: "mid",    second: "way"     },
  { word: "gatekeeper", first: "gate",   second: "keeper"  },
  { word: "gatehouse",  first: "gate",   second: "house"   },
  { word: "tailgate",   first: "tail",   second: "gate"    },
  { word: "sidewalk",   first: "side",   second: "walk"    },
  { word: "sideline",   first: "side",   second: "line"    },
  { word: "sideshow",   first: "side",   second: "show"    },
  { word: "sidebar",    first: "side",   second: "bar"     },
  { word: "sidestep",   first: "side",   second: "step"    },
  { word: "sidetrack",  first: "side",   second: "track"   },
  { word: "downside",   first: "down",   second: "side"    },
  { word: "bedside",    first: "bed",    second: "side"    },
  { word: "hillside",   first: "hill",   second: "side"    },
  { word: "roadside",   first: "road",   second: "side"    },
  { word: "fireside",   first: "fire",   second: "side"    },
  { word: "walkway",    first: "walk",   second: "way"     },
  { word: "boardwalk",  first: "board",  second: "walk"    },
  { word: "sidewalk",   first: "side",   second: "walk"    },
  { word: "catwalk",    first: "cat",    second: "walk"    },
  { word: "spacewalk",  first: "space",  second: "walk"    },
  { word: "notepad",    first: "note",   second: "pad"     },
  { word: "notebook",   first: "note",   second: "book"    },
  { word: "keynote",    first: "key",    second: "note"    },
  { word: "footnote",   first: "foot",   second: "note"    },
  { word: "roadblock",  first: "road",   second: "block"   },
  { word: "roadside",   first: "road",   second: "side"    },
  { word: "roadwork",   first: "road",   second: "work"    },
  { word: "roadmap",    first: "road",   second: "map"     },
  { word: "backroad",   first: "back",   second: "road"    },
  { word: "crossroad",  first: "cross",  second: "road"    },
  { word: "railroad",   first: "rail",   second: "road"    },
  { word: "raincoat",   first: "rain",   second: "coat"    },
  { word: "raindrop",   first: "rain",   second: "drop"    },
  { word: "rainfall",   first: "rain",   second: "fall"    },
  { word: "rainbow",    first: "rain",   second: "bow"     },
  { word: "rainstorm",  first: "rain",   second: "storm"   },
  { word: "rainwater",  first: "rain",   second: "water"   },
  { word: "rainforest", first: "rain",   second: "forest"  },
  { word: "airfield",   first: "air",    second: "field"   },
  { word: "airport",    first: "air",    second: "port"    },
  { word: "airship",    first: "air",    second: "ship"    },
  { word: "airway",     first: "air",    second: "way"     },
  { word: "airlock",    first: "air",    second: "lock"    },
  { word: "airline",    first: "air",    second: "line"    },
  { word: "airmail",    first: "air",    second: "mail"    },
  { word: "airwave",    first: "air",    second: "wave"    },
  { word: "cornfield",  first: "corn",   second: "field"   },
  { word: "airfield",   first: "air",    second: "field"   },
  { word: "minefield",  first: "mine",   second: "field"   },
  { word: "outfield",   first: "out",    second: "field"   },
  { word: "fieldwork",  first: "field",  second: "work"    },
  { word: "eyebrow",    first: "eye",    second: "brow"    },
  { word: "eyelid",     first: "eye",    second: "lid"     },
  { word: "eyeball",    first: "eye",    second: "ball"    },
  { word: "eyelash",    first: "eye",    second: "lash"    },
  { word: "eyesight",   first: "eye",    second: "sight"   },
  { word: "shipwreck",  first: "ship",   second: "wreck"   },
  { word: "shipyard",   first: "ship",   second: "yard"    },
  { word: "shipmate",   first: "ship",   second: "mate"    },
  { word: "airship",    first: "air",    second: "ship"    },
  { word: "warship",    first: "war",    second: "ship"    },
  { word: "spaceship",  first: "space",  second: "ship"    },
  { word: "flagship",   first: "flag",   second: "ship"    },
  { word: "spacewalk",  first: "space",  second: "walk"    },
  { word: "spaceport",  first: "space",  second: "port"    },
  { word: "spaceship",  first: "space",  second: "ship"    },
  { word: "porthole",   first: "port",   second: "hole"    },
  { word: "airport",    first: "air",    second: "port"    },
  { word: "spaceport",  first: "space",  second: "port"    },
  { word: "yardstick",  first: "yard",   second: "stick"   },
  { word: "schoolyard", first: "school", second: "yard"    },
  { word: "backyard",   first: "back",   second: "yard"    },
  { word: "shipyard",   first: "ship",   second: "yard"    },
  { word: "farmyard",   first: "farm",   second: "yard"    },
  { word: "schoolwork", first: "school", second: "work"    },
  { word: "schoolroom", first: "school", second: "room"    },
  { word: "schoolmate", first: "school", second: "mate"    },
  { word: "playground", first: "play",   second: "ground"  },
  { word: "playmate",   first: "play",   second: "mate"    },
  { word: "playtime",   first: "play",   second: "time"    },
  { word: "playbook",   first: "play",   second: "book"    },
  { word: "playoff",    first: "play",   second: "off"     },
  { word: "playroom",   first: "play",   second: "room"    },
  { word: "horseplay",  first: "horse",  second: "play"    },
  { word: "wordplay",   first: "word",   second: "play"    },
  { word: "classroom",  first: "class",  second: "room"    },
  { word: "ballroom",   first: "ball",   second: "room"    },
  { word: "boardroom",  first: "board",  second: "room"    },
  { word: "bedroom",    first: "bed",    second: "room"    },
  { word: "storeroom",  first: "store",  second: "room"    },
  { word: "schoolroom", first: "school", second: "room"    },
  { word: "playroom",   first: "play",   second: "room"    },
  { word: "homeroom",   first: "home",   second: "room"    },
  { word: "birthmark",  first: "birth",  second: "mark"    },
  { word: "birthday",   first: "birth",  second: "day"     },
  { word: "birthplace", first: "birth",  second: "place"   },
  { word: "birthstone", first: "birth",  second: "stone"   },
  { word: "midnight",   first: "mid",    second: "night"   },
  { word: "midday",     first: "mid",    second: "day"     },
  { word: "midtown",    first: "mid",    second: "town"    },
  { word: "midway",     first: "mid",    second: "way"     },
  { word: "nightfall",  first: "night",  second: "fall"    },
  { word: "nightmare",  first: "night",  second: "mare"    },
  { word: "nightlife",  first: "night",  second: "life"    },
  { word: "nighttime",  first: "night",  second: "time"    },
  { word: "nightclub",  first: "night",  second: "club"    },
  { word: "nightstand", first: "night",  second: "stand"   },
  { word: "midnight",   first: "mid",    second: "night"   },
  { word: "lifetime",   first: "life",   second: "time"    },
  { word: "lifestyle",  first: "life",   second: "style"   },
  { word: "lifespan",   first: "life",   second: "span"    },
  { word: "lifeline",   first: "life",   second: "line"    },
  { word: "nightlife",  first: "night",  second: "life"    },
  { word: "hometown",   first: "home",   second: "town"    },
  { word: "homework",   first: "home",   second: "work"    },
  { word: "homeroom",   first: "home",   second: "room"    },
  { word: "homeland",   first: "home",   second: "land"    },
  { word: "downtown",   first: "down",   second: "town"    },
  { word: "midtown",    first: "mid",    second: "town"    },
  { word: "townhouse",  first: "town",   second: "house"   },
  { word: "overtime",   first: "over",   second: "time"    },
  { word: "overboard",  first: "over",   second: "board"   },
  { word: "overpass",   first: "over",   second: "pass"    },
  { word: "overload",   first: "over",   second: "load"    },
  { word: "overflow",   first: "over",   second: "flow"    },
  { word: "overlook",   first: "over",   second: "look"    },
  { word: "flyover",    first: "fly",    second: "over"    },
  { word: "sandstone",  first: "sand",   second: "stone"   },
  { word: "sandstorm",  first: "sand",   second: "storm"   },
  { word: "sandpaper",  first: "sand",   second: "paper"   },
  { word: "sandbox",    first: "sand",   second: "box"     },
  { word: "sandcastle", first: "sand",   second: "castle"  },
  { word: "sandbank",   first: "sand",   second: "bank"    },
  { word: "clockwork",  first: "clock",  second: "work"    },
  { word: "clocktower", first: "clock",  second: "tower"   },
  { word: "handshake",  first: "hand",   second: "shake"   },
  { word: "handmade",   first: "hand",   second: "made"    },
  { word: "handbook",   first: "hand",   second: "book"    },
  { word: "handhold",   first: "hand",   second: "hold"    },
  { word: "handout",    first: "hand",   second: "out"     },
  { word: "handrail",   first: "hand",   second: "rail"    },
  { word: "handwork",   first: "hand",   second: "work"    },
  { word: "backhand",   first: "back",   second: "hand"    },
  { word: "farmhouse",  first: "farm",   second: "house"   },
  { word: "farmland",   first: "farm",   second: "land"    },
  { word: "farmyard",   first: "farm",   second: "yard"    },
  { word: "flywheel",   first: "fly",    second: "wheel"   },
  { word: "flyover",    first: "fly",    second: "over"    },
  { word: "housefly",   first: "house",  second: "fly"     },
  { word: "horsefly",   first: "horse",  second: "fly"     },
  { word: "firefly",    first: "fire",   second: "fly"     },
  { word: "greenhouse", first: "green",  second: "house"   },
  { word: "goalpost",   first: "goal",   second: "post"    },
  { word: "postmark",   first: "post",   second: "mark"    },
  { word: "postbox",    first: "post",   second: "box"     },
  { word: "postcard",   first: "post",   second: "card"    },
  { word: "bedpost",    first: "bed",    second: "post"    },
  { word: "outpost",    first: "out",    second: "post"    },
  { word: "goalpost",   first: "goal",   second: "post"    },
  { word: "cardboard",  first: "card",   second: "board"   },
  { word: "postcard",   first: "post",   second: "card"    },
  { word: "horseplay",  first: "horse",  second: "play"    },
  { word: "horseback",  first: "horse",  second: "back"    },
  { word: "horsefly",   first: "horse",  second: "fly"     },
  { word: "horseshoe",  first: "horse",  second: "shoe"    },
  { word: "horsepower", first: "horse",  second: "power"   },
  { word: "powerhouse", first: "power",  second: "house"   },
  { word: "goldfish",   first: "gold",   second: "fish"    },
  { word: "goldmine",   first: "gold",   second: "mine"    },
  { word: "goldsmith",  first: "gold",   second: "smith"   },
  { word: "goldfinch",  first: "gold",   second: "finch"   },
  { word: "minefield",  first: "mine",   second: "field"   },
  { word: "mineshaft",  first: "mine",   second: "shaft"   },
  { word: "goldmine",   first: "gold",   second: "mine"    },
  { word: "landmine",   first: "land",   second: "mine"    },
  { word: "locksmith",  first: "lock",   second: "smith"   },
  { word: "lockdown",   first: "lock",   second: "down"    },
  { word: "lockout",    first: "lock",   second: "out"     },
  { word: "lockbox",    first: "lock",   second: "box"     },
  { word: "airlock",    first: "air",    second: "lock"    },
  { word: "padlock",    first: "pad",    second: "lock"    },
  { word: "logbook",    first: "log",    second: "book"    },
  { word: "backlog",    first: "back",   second: "log"     },
  { word: "hillside",   first: "hill",   second: "side"    },
  { word: "hilltop",    first: "hill",   second: "top"     },
  { word: "downhill",   first: "down",   second: "hill"    },
  { word: "tabletop",   first: "table",  second: "top"     },
  { word: "treetop",    first: "tree",   second: "top"     },
  { word: "hilltop",    first: "hill",   second: "top"     },
  { word: "housetop",   first: "house",  second: "top"     },
  { word: "rooftop",    first: "roof",   second: "top"     },
  { word: "treehouse",  first: "tree",   second: "house"   },
  { word: "rooftree",   first: "roof",   second: "tree"    },
  { word: "pinball",    first: "pin",    second: "ball"    },
  { word: "pinhole",    first: "pin",    second: "hole"    },
  { word: "pinpoint",   first: "pin",    second: "point"   },
  { word: "crossword",  first: "cross",  second: "word"    },
  { word: "crossroad",  first: "cross",  second: "road"    },
  { word: "crossfire",  first: "cross",  second: "fire"    },
  { word: "crossbow",   first: "cross",  second: "bow"     },
  { word: "crosswind",  first: "cross",  second: "wind"    },
  { word: "crosswalk",  first: "cross",  second: "walk"    },
  { word: "password",   first: "pass",   second: "word"    },
  { word: "passbook",   first: "pass",   second: "book"    },
  { word: "overpass",   first: "over",   second: "pass"    },
  { word: "wordplay",   first: "word",   second: "play"    },
  { word: "wordsmith",  first: "word",   second: "smith"   },
  { word: "crossword",  first: "cross",  second: "word"    },
  { word: "password",   first: "pass",   second: "word"    },
  { word: "watchdog",   first: "watch",  second: "dog"     },
  { word: "watchman",   first: "watch",  second: "man"     },
  { word: "birdwatch",  first: "bird",   second: "watch"   },
  { word: "doghouse",   first: "dog",    second: "house"   },
  { word: "dogwood",    first: "dog",    second: "wood"    },
  { word: "dogfish",    first: "dog",    second: "fish"    },
  { word: "watchdog",   first: "watch",  second: "dog"     },
  { word: "thumbnail",  first: "thumb",  second: "nail"    },
  { word: "thumbprint", first: "thumb",  second: "print"   },
  { word: "thumbtack",  first: "thumb",  second: "tack"    },
  { word: "fingernail", first: "finger", second: "nail"    },
  { word: "fingerprint",first: "finger", second: "print"   },
  { word: "fingertip",  first: "finger", second: "tip"     },
  { word: "blueprint",  first: "blue",   second: "print"   },
  { word: "footprint",  first: "foot",   second: "print"   },
  { word: "thumbprint", first: "thumb",  second: "print"   },
  { word: "fingerprint",first: "finger", second: "print"   },
  { word: "newsprint",  first: "news",   second: "print"   },
  { word: "newsroom",   first: "news",   second: "room"    },
  { word: "newsletter", first: "news",   second: "letter"  },
  { word: "newspaper",  first: "news",   second: "paper"   },
];

// ── State ──────────────────────────────────────────────────────────────────
let words = [];
let state = {
  bridge: 'sun',
  chain: [],
  usedWords: new Set(),
  hintsLeft: 2,
  timerSec: 30,
  timerMax: 30,
  timerInterval: null,
  bestScore: 0,
  running: false,
};

// ── Timer config by chain length ───────────────────────────────────────────
function getTimerForLength(len) {
  if (len < 5)  return 30;
  if (len < 10) return 25;
  if (len < 15) return 20;
  return 15;
}

function getDifficultyLabel(len) {
  if (len < 5)  return { text: 'Easy',   cls: 'diff-easy' };
  if (len < 10) return { text: 'Medium', cls: 'diff-medium' };
  if (len < 15) return { text: 'Hard',   cls: 'diff-hard' };
  return             { text: 'Expert', cls: 'diff-expert' };
}

// ── Badges ─────────────────────────────────────────────────────────────────
function getBadge(score) {
  if (score >= 20) return { icon: '👑', name: 'Weave Legend' };
  if (score >= 15) return { icon: '🌟', name: 'Chain Wizard' };
  if (score >= 10) return { icon: '🎯', name: 'Thread Master' };
  if (score >= 6)  return { icon: '🧵', name: 'Word Weaver' };
  if (score >= 3)  return { icon: '🔗', name: 'Link Maker' };
  return                  { icon: '🪢', name: 'Tangled Beginner' };
}

// ── DOM refs ───────────────────────────────────────────────────────────────
const screens = {
  home: document.getElementById('screen-home'),
  game: document.getElementById('screen-game'),
  end:  document.getElementById('screen-end'),
};
const el = {
  bridgeWord:    document.getElementById('bridge-word'),
  wordInput:     document.getElementById('word-input'),
  submitBtn:     document.getElementById('submit-btn'),
  feedback:      document.getElementById('feedback-msg'),
  chainTrail:    document.getElementById('chain-trail'),
  timerCountdown:document.getElementById('timer-countdown'),
  timerProgress: document.getElementById('timer-progress'),
  chainNum:      document.getElementById('chain-num'),
  hintBtn:       document.getElementById('hint-btn'),
  hintCount:     document.getElementById('hint-count'),
  diffLabel:     document.getElementById('diff-label'),
  bestScore:     document.getElementById('best-score'),
  headerBest:    document.getElementById('header-best'),
  // end screen
  endBadgeIcon:  document.getElementById('end-badge-icon'),
  endBadgeName:  document.getElementById('end-badge-name'),
  endScoreNum:   document.getElementById('end-score-num'),
  endChainWords: document.getElementById('end-chain-words'),
  endFeedback:   document.getElementById('feedback-msg-end'),
  shareBtn:      document.getElementById('share-btn'),
  playAgainBtn:  document.getElementById('play-again-btn'),
  shareToast:    document.getElementById('share-toast'),
};

// ── Screen routing ─────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Timer ──────────────────────────────────────────────────────────────────
const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;

function setTimerVisual(sec, max) {
  const pct = sec / max;
  el.timerProgress.style.strokeDashoffset = RING_C * (1 - pct);
  el.timerCountdown.textContent = sec;

  const urgent = pct <= 0.35;
  el.timerProgress.classList.toggle('urgent', urgent);
}

function startTimer() {
  clearInterval(state.timerInterval);
  const max = getTimerForLength(state.chain.length);
  state.timerMax = max;
  state.timerSec = max;
  setTimerVisual(max, max);

  el.timerProgress.style.transition = 'none';

  state.timerInterval = setInterval(() => {
    state.timerSec--;
    setTimerVisual(state.timerSec, state.timerMax);
    if (state.timerSec <= 0) endGame('timeout');
  }, 1000);
}

// ── Game logic ─────────────────────────────────────────────────────────────
function validOptions(bridge) {
  return words.filter(w => w.first === bridge && !state.usedWords.has(w.word));
}

function startGame() {
  state.bridge = 'sun';
  state.chain = [];
  state.usedWords = new Set();
  state.hintsLeft = 2;
  state.running = true;

  el.hintCount.textContent = '2';
  el.hintBtn.disabled = false;
  el.wordInput.value = '';
  el.wordInput.disabled = false;
  el.submitBtn.disabled = false;
  setFeedback('', '');
  renderChainTrail();
  updateChainCounter();
  updateDiffLabel();
  el.bridgeWord.textContent = state.bridge;
  el.wordInput.focus();
  showScreen('game');
  startTimer();
}

function updateChainCounter() {
  el.chainNum.textContent = state.chain.length;
}

function updateDiffLabel() {
  const d = getDifficultyLabel(state.chain.length);
  el.diffLabel.textContent = d.text;
  el.diffLabel.className = 'difficulty-tag ' + d.cls;
}

function setFeedback(msg, type) {
  el.feedback.textContent = msg;
  el.feedback.className = 'feedback-msg' + (type ? ' ' + type : '');
}

function renderChainTrail() {
  if (state.chain.length === 0) {
    el.chainTrail.innerHTML = '<span class="chain-trail-empty">Your chain will appear here…</span>';
    return;
  }
  el.chainTrail.innerHTML = state.chain.map((entry, i) => {
    const arrow = i < state.chain.length - 1 ? '<span class="link-arrow">→</span>' : '';
    return `<span class="chain-link-word">
      <span class="link-first">${entry.first}</span><span class="link-connector">+</span><span class="link-second">${entry.second}</span>${arrow}
    </span>`;
  }).join('');
  el.chainTrail.scrollLeft = el.chainTrail.scrollWidth;
}

function submitWord() {
  if (!state.running) return;
  const raw = el.wordInput.value.trim().toLowerCase().replace(/\s+/g, '');
  if (!raw) return;

  if (state.usedWords.has(raw)) {
    bounce('Already used that word!', 'error');
    return;
  }

  const match = words.find(w => w.word === raw && w.first === state.bridge);
  if (!match) {
    const anyMatch = words.find(w => w.word === raw);
    if (anyMatch) {
      bounce(`"${raw}" doesn't start with "${state.bridge}"!`, 'error');
    } else {
      bounce(`"${raw}" isn't in the word list!`, 'error');
    }
    return;
  }

  // Correct!
  state.usedWords.add(raw);
  state.chain.push(match);
  state.bridge = match.second;

  el.wordInput.classList.add('correct');
  setTimeout(() => el.wordInput.classList.remove('correct'), 400);
  el.wordInput.value = '';
  setFeedback('', '');

  updateChainCounter();
  updateDiffLabel();
  renderChainTrail();
  el.bridgeWord.textContent = state.bridge;

  // Check if any valid next words exist
  const opts = validOptions(state.bridge);
  if (opts.length === 0) {
    endGame('dead-end');
    return;
  }

  startTimer();
  el.wordInput.focus();
}

function bounce(msg, type) {
  el.wordInput.classList.remove('shake');
  void el.wordInput.offsetWidth;
  el.wordInput.classList.add('shake');
  setTimeout(() => el.wordInput.classList.remove('shake'), 400);
  setFeedback(msg, type);
}

function showHint() {
  if (state.hintsLeft <= 0 || !state.running) return;
  const opts = validOptions(state.bridge);
  if (opts.length === 0) {
    setFeedback('No valid words available — chain stuck!', 'error');
    return;
  }
  const pick = opts[Math.floor(Math.random() * opts.length)];
  state.hintsLeft--;
  el.hintCount.textContent = state.hintsLeft;
  if (state.hintsLeft === 0) el.hintBtn.disabled = true;
  setFeedback(`Hint: try "${pick.word}"`, 'hint');
}

function endGame(reason) {
  clearInterval(state.timerInterval);
  state.running = false;
  el.wordInput.disabled = true;
  el.submitBtn.disabled = true;

  const score = state.chain.length;
  if (score > state.bestScore) {
    state.bestScore = score;
    el.headerBest.textContent = score;
    localStorage.setItem('ww_best', score);
  }

  const badge = getBadge(score);
  el.endBadgeIcon.textContent = badge.icon;
  el.endBadgeName.textContent = badge.name;
  el.endScoreNum.textContent = score;

  // Render end chain
  if (state.chain.length === 0) {
    el.endChainWords.innerHTML = '<span style="color:var(--text-muted);font-style:italic;">No words in chain</span>';
  } else {
    el.endChainWords.innerHTML = state.chain.map((entry, i) => {
      const arrow = i < state.chain.length - 1 ? '<span class="end-arrow">→</span>' : '';
      return `<span class="end-word-pill">${entry.word}</span>${arrow}`;
    }).join('');
  }

  let reasonMsg = '';
  let reasonType = '';
  if (reason === 'timeout') { reasonMsg = '⏱️ Time ran out!'; reasonType = 'error'; }
  else if (reason === 'dead-end') { reasonMsg = '🎉 No valid words left — chain complete!'; reasonType = 'success'; }

  el.endFeedback.textContent = reasonMsg;
  el.endFeedback.className = 'feedback-msg' + (reasonType ? ' ' + reasonType : '');
  showScreen('end');
}

// ── Share ──────────────────────────────────────────────────────────────────
function share() {
  const score = state.chain.length;
  const badge = getBadge(score);
  const chainStr = state.chain.map(w => w.word).join(' → ');
  const text = [
    `🧵 Word Weave`,
    `Chain: ${score} link${score !== 1 ? 's' : ''} | ${badge.icon} ${badge.name}`,
    chainStr ? `${chainStr}` : '',
    `Think you can beat it?`,
  ].filter(Boolean).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 2500);
  }).catch(() => {
    el.shareToast.textContent = 'Copy this: ' + text;
    el.shareToast.classList.add('show');
    setTimeout(() => el.shareToast.classList.remove('show'), 4000);
  });
}

// ── Event wiring ───────────────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', startGame);
el.submitBtn.addEventListener('click', submitWord);
el.wordInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitWord(); });
el.hintBtn.addEventListener('click', showHint);
el.shareBtn.addEventListener('click', share);
el.playAgainBtn.addEventListener('click', startGame);

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  words = WORD_LIST.filter((w, i, arr) =>
    arr.findIndex(x => x.word === w.word) === i
  );

  const saved = parseInt(localStorage.getItem('ww_best') || '0', 10);
  state.bestScore = saved;
  el.headerBest.textContent = saved;

  el.timerProgress.style.strokeDasharray = RING_C;
  el.timerProgress.style.strokeDashoffset = 0;

  showScreen('home');
}

init();
