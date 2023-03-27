// ==UserScript==
// @name        TikTok Live Stream URL Helper
// @version     1.3
// @grant       none
// @match				https://www.tiktok.com/@*/live*
// @run-at      document-end
// @author      Maxam 
// @homepageURL https://github.com/Maxam0001/TikTokLiveStreamURLHelper
// ==/UserScript==


async function fetchRoomInfo(roomId) {  
  var fetchUrl1 = "https://webcast.tiktok.com/webcast/room/info/?channel=web&aid=1988&app_language=en&webcast_language=en&app_name=tiktok_web&device_platform=web&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20%28Windows%29&browser_online=true&tz_name=Asia%2FShanghai&room_id="
  var fetchUrl2 ="&is_anchor=false&msToken=&X-Bogus=DFSzsIVOAg2ANaAwSYROKzyxgzR4&_signature=_02B4Z6wo000012DfGXQAAIDDYnjw3eCHAWtg3h3AALkQa9"
  var fetchUrl = fetchUrl1 + roomId + fetchUrl2    
  var result;
  try {
    const response = await fetch(fetchUrl, 
         {         
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site"
            },
            "referrer": "https://www.tiktok.com/",
            "method": "GET",
            "mode": "cors"
				});
    const room = await response.json();        
    result = room.data.stream_url.hls_pull_url    
  }
  catch (e) {
    console.log("x101:"+e);
  }  
  return result;
}


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
 				var roomId=document.head.querySelector("meta[property='al:android:url'][content]").content.split("=")[1];
        // fetch the stream url by calling the room/info endpoint
        fetchRoomInfo(roomId).then(value => { alert(value);});
      }
      catch (e) {        
        alert("Could not retrieve Stream URL")
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
