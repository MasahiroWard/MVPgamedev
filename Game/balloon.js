// Balloon functions

function make_balloon_group() {
    balloon_group = game.add.group();
    balloon_group.enableBody = true;
}

function placeBalloon(x, y){
    var balloon = game.add.sprite(x, y, "balloon");
    balloon.scale.setTo(0.1, 0.1);
    balloon_group.add(balloon);
}

function get_balloon(player, balloon){
    balloon.kill();
    player.has_balloon = true;
    player.addChild(game.make.sprite(-150, -600, 'balloon'));
}