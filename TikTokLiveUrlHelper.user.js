// ==UserScript==
// @name        TikTok Live Stream URL Helper
// @version     1.0
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
  return room.data.stream_url.rtmp_pull_url;
}

function hookToolsMenu() {  
  try {
    //get "Copy Link" element
    var shareButton=document.getElementsByClassName('share-item-wrapper')[0]; 
    
    //create a new "Get Stream URL" item before it
    var streamUrlButton=shareButton.cloneNode(true);
    shareButton.parentElement.insertBefore(streamUrlButton,shareButton); 
    streamUrlButton.lastChild.innerText="Get Stream URL";
    
    //show Stream URL in an alert box on clicking the new menu item
    streamUrlButton.onclick= function() {
      try {
        const nextDataJSON = document.getElementById('__NEXT_DATA__').innerHTML;
        const __NEXT_DATA__ = JSON.parse(nextDataJSON);
        // Tiktok leaves the stream URL unpopulated now :(
        var url=__NEXT_DATA__.props.pageProps.liveProps.liveUrl;   
        var roomId = __NEXT_DATA__.props.pageProps.liveProps.roomId;   
 
        // So the alternative is to to fetch the room id by calling the room/info endpoint
        fetchRoomInfo(roomId).then(value => { alert(value);});
      }
      catch (e) {        
        alert("Could not retrieve Stream URL")
 		  }
    }
  }
  catch (e) {
    console.log("x101:"+e);
    setTimeout(hookToolsMenu, 500);
  }
}

setTimeout(hookToolsMenu, 500);



    
