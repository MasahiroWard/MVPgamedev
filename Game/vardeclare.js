// Declare all global variables in this file

// demo is the game variable
var demo = {};

// player is your chameleon
var player;

// cursors allows use of arrow keys
var cursors;

// Dictionaries to keep track of what is in your stomach
var stomach, stomach_fruits = {}, stomach_icons = {}, stomach_tracker = {};

// fruit objects on the map
var map_fruits = {};
var fruit_colors = {"redfruit": "red", "bluefruit": "blue", "yellowfruit": "yellow", "orangefruit": "orange", "purplefruit": "purple", "greenfruit": "green"};

// Moving platforms
var moving_platform_group, MovingPlatform;

// Stores colors as hex code.  When calling colors in this game, use the syntax clrs["red"]
var hex_colors = {"red": 0xff0000, "blue": 0x0000ff, "yellow": 0xffff00, "orange": 0xff8000, "purple": 0x6600cc, "green": 0x00b33c};

// This is a list used to pick random colors or cycle through all colors
var color_list = ["red", "blue", "yellow", "orange", "purple", "green"];

// Groups for enemies
var birds_group = {}, snakes_group = {};

// Variable associated with the cat boss
// catMoveTimeStamp is used to track how often the catboss changes direction
// catHitTimeStamp is used to give both the catboss and player 2 seconds of immunity after contact
var cat_boss, cat_boss_health, catMoveTimeStamp = 0, catHitTimeStamp = 0;

// Stores platforms and ladders for a stage.  Hope to make these obsolete by creating tilemaps instead.
var platforms, ladders;

// Moves the camera vertically at a set pace.
var yCam = 980, camSpeed = 1;
// count of frames until camera position can increment
var camCount = 0;
var camIncr = 2;