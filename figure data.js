"use strict";

//declare variables
var spriteTable;
var urlParams;
var songtitle;
var sound;
var spriteTable;
var spriteKeys;
//get values from url

(window.onpopstate = function () {
	var match,
  pl     = /\+/g,  // Regex for replacing addition symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
  query  = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
	urlParams[decode(match[1])] = decode(match[2]);
  console.log(urlParams);
  songtitle = urlParams["song"];
})();


//get sprite data from json
function getSprite(){
 let myRequest = new Request(songtitle + ".json");
 fetch(songtitle + ".json").then(function(resp){
  return resp.json();
 }).then(function(data){
  spriteTable = data.sprite;
  spriteKeys = Object.keys(spriteTable);
  console.log(spriteKeys);
  console.log(spriteTable);
  document.getElementById("songname").innerHTML = songtitle; //show song title in text
  musicPlayer(songtitle+".webm");
 });
};
//music

function musicPlayer(filename){
 sound = new Howl({
    src: [(filename)],
	  preload: true,
		sprite: {
			intro: [spriteTable[spriteKeys[0]][0],spriteTable[spriteKeys[0]][1]],
			loop: [spriteTable[spriteKeys[1]][0],spriteTable[spriteKeys[1]][1]]
		}
  });
  playSongs();
  console.log(sound);
};
function playSongs(){
  sound.play('intro');
  sound.on('end', function(){
	 sound.play('loop');
	});
};
getSprite();
