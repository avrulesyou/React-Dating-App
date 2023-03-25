/*** Set Icon for Animation*/

/*ICON TYPE */
const ICON_TYPE={DISLIKE :"Dislike", LIKE :"Like", STAR :"Star" }

/*getIconType fuction for conatin all ICON TYPES*/
function getIconType() {
  return [
      {type :ICON_TYPE.DISLIKE, icon:'Feather/x'}, 
      {type :ICON_TYPE.LIKE, icon:'EvilIcons/heart'}, 
      {type :ICON_TYPE.STAR, icon:'Feather/star'}, 
  ];
}

export  { ICON_TYPE }