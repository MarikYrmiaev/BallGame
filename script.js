var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var counter = 0;
var currentBlocks = [];
/*הוספת משתנה כדי שהכדור שהכדור לא ישתגע ברגע שלוחצים על כפתור ימינה וישר שמאלה*/ var twokeys = 0;
/*תזוזה שמאלה*/ function moveLeft(){
    var left = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    /*מניעה מהכדור לצאת מגבולות המשחק*/ if(left>0){
    character.style.left = left - 2 + "px";
    
}
}

/*תזוזה שמאלה*/ function moveRight(){
    var left = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    /*מניעה מהכדור לצאת מגבולות המשחק*/ if(left<380){
    character.style.left = left + 2 + "px";
    
}
}

/* תחילת תזוזה ברגע שנלחץ הכפתור הנכון */ document.addEventListener("keydown", event => {
    if(twokeys==0){
        twokeys++;
  if(event.key==="ArrowLeft"){
interval = setInterval(moveLeft, 1);
  }  
  if(event.key==="ArrowRight"){
    interval = setInterval(moveRight, 1);
  }
}  
});

/* הפסקת תזוזה שעזבת את הכפתור */ document.addEventListener("keyup", event =>{
    clearInterval(interval);
    twokeys=0;
});

/* פונקציה שתיצור בלוקים ללא הפסקה*/ var bloks = setInterval(function(){
   /*אלמנטים כדי ליצור בלוק חדש אחד אחרי השני בהבדל של 100 פיקסלים*/  var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0) {
    var blockLastTop =
    parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    var holeLastTop =
    parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    /*תנאי שיציג בלוקים חדשים רק בגבולות המשחק*/ if(blockLastTop<400||counter==0){
    /*אלמנט ליצירת בלוקים למשחק*/ var block = document.createElement("div");
/*אלמנט ליצירת חורים בבלוקים למשחק*/ var hole = document.createElement("div");
block.setAttribute("class", "block");
hole.setAttribute("class", "hole");
/*הוספת קאונטר ל איידי יתן לכל בלוק וחור מספר שונה*/ block.setAttribute("id", "block"+counter);
hole.setAttribute("id", "hole"+counter);
block.style.top = blockLastTop + 100 + "px";
hole.style.top = holeLastTop + 100 + "px";
/*אלמנט שהחורים יהיו במיקום רנדומלי*/ var random = Math.floor(Math.random() * 360);
hole.style.left = random + "px";
game.appendChild(block);
game.appendChild(hole);
currentBlocks.push(counter);
/*קאונטר שסופר כמה בלוקים נוצרו וככה נדע כמה חו חורים עבר*/ counter++;
    }
   /*בניית אלמנטים שיבדקו איפה הכדור נמצא על הבלוק כל הזמן*/  var characterTop = 
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = 
    parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    /* הודעה שהשחקן נפסל */ if(characterTop <= 0){
        alert("Game Over. Score is "+(counter-9)+" You are still better than Marik :)");
        clearInterval(blocks);
        location.reload();
    }
   /*איפשור לבלוקים לזוז מלמעטה למעלה*/  for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = 
        parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft =
        parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        /*מחיקת הבלוקים מהזיכרון אחרי שעברו את גבולות המשחק*/ if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
   /* יגרום לכדור ליפול רק שהוא מעל חור */  if(drop==0) {
       if(characterTop < 480){
        character.style.top = characterTop + 2 + "px";
       }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
    
},1);

