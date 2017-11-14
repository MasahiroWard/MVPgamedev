// Declare all global variables in this file

// demo is the game variable
var demo = {};

// camCount allows camera to scroll
var camCount = 0;

// player is your chameleon
var player;

// cursors allows use of arrow keys
var cursors;

// A method to darken the background when paused
var pause_darkener, pause_restart, pause_mainmenu, pause_resume;

// Dictionaries to keep track of what is in your stomach
var stomach, stomach_fruits = {}, stomach_icons = {}, stomach_tracker = {};
var clr_keys = {"red":"Q", "yellow":"W", "orange":"E", "blue":"A", "green":"S", "purple":"D"};

// fruit objects on the map
var map_fruits = {};
var fruit_colors = {"redfruit": "red", "yellowfruit": "yellow", "orangefruit": "orange", "bluefruit": "blue", "greenfruit": "green", "purplefruit": "purple",};

// Item objects
// balloon_start_time is used to release balloon after x seconds
var balloon_group, balloon_end_time = 0, balloon_end_time_left = 0;

// Moving platforms group holds all the MovingPlatform objects
// MovingPlatform class is an extended sprite object
var moving_platform_group, MovingPlatform;

/////////////////////////////////////////////////////////////
// Stores colors as hex code.  Specifically used for changing tints, should become obsolete
var hex_colors = {"red": 0xff0000, "blue": 0x0000ff, "yellow": 0xffff00, "orange": 0xff8000, "purple": 0x6600cc, "green": 0x00b33c};
/////////////////////////////////////////////////////////////

// This is a list used to pick random colors or cycle through all colors
var color_list = ["red", "blue", "yellow", "orange", "purple", "green"];

// Groups for enemies
var birds_group = {}, snakes_group = {};


// These should be declared for each stage individually
// Stores platforms and ladders for a stage.  Hope to make these obsolete by creating tilemaps instead.
// Hopefully obsolete.  Uncomment if game is broken
//var platforms, ladders;

// Moves the camera vertically at a set pace.
// increasing camSpeed increases each camera increment amount 
//var camSpeed = 2;
// count of frames until camera position can increment
// keep camCount as 0; camIncr determines the count needed before increment 
//var camCount = 0;
//var camIncr = 1;

// sound variables
var jump1, guitar1, eatNoise, climb1, eatNoise2, balloonNoise;

var balloon_start_time = 0;

// state 3 vars for tilemap and sounds
//var layer1;
//var layer2; 
//var map;
//var eat; 

// ice state tile map variables 
var icelayer1;
var icelayer2; 
var iceMap;


// time of last chameleon hit 
var chameleonWasHit = 0;

var heart1, heart2, heart3, heart4, heart5;


// trial state tile map 
var triallayer1, triallayer2, trialMap;

// last state to allow restart
var restart_state;


// difficulty level 
var difficulty = "easy";
