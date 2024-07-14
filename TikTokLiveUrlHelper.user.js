// ==UserScript==
// @name        TikTok Live Stream URL Helper
// @version     1.4
// @grant       none
// @match				https://www.tiktok.com/@*/live*
// @run-at      document-end
// @author      Maxam 
// @homepageURL https://github.com/Maxam0001/TikTokLiveStreamURLHelper
// ==/UserScript==


function hookToolsMenu() { 
  try {
  
    //if the Share flyout doesn't exist, exit and try again after half a second
    var shareButton=document.getElementsByClassName('e1xuf8h00')[0].firstChild; 
    if (!shareButton) {
      setTimeout(hookToolsMenu, 500);
      return;
    }
   
    //if the flyout exists but we've already added our new entry, just exit and rehook  
    if (shareButton.innerText=="Get Stream URL") {
      setTimeout(hookToolsMenu, 500);  
      return;
    }
    
    //We don't have our entry in the flyout, so clone the first link and make our "Get Stream URL" item before it
    var streamUrlButton=shareButton.cloneNode(true);
    copyButton=streamUrlButton;
    shareButton.parentElement.insertBefore(streamUrlButton,shareButton); 
    streamUrlButton.lastChild.innerText="Get Stream URL";
    
    //show Stream URL in an alert box on clicking the new menu item
    streamUrlButton.onclick= function() {      
      try {
        var allInfo = eval('('+document.getElementById("SIGI_STATE").innerHTML+')');
        var hevcStreamData = allInfo.LiveRoom.liveRoomUserInfo.liveRoom.hevcStreamData.pull_data.stream_data;
        var hlsStreams = eval('(' + hevcStreamData + ')');
        
        alert(hlsStreams.data.origin.main.hls);
      }
      catch (e) {        
        alert("Could not retrieve Stream URL" + e)
      }
    }
    
    setTimeout(hookToolsMenu, 500);
  }
  catch (e) {
    console.log("x101:"+e);
    setTimeout(hookToolsMenu, 500);
  }
}

//entry point
setTimeout(hookToolsMenu, 500);
