// ==UserScript==
// @name        TikTok Live Stream URL Helper
// @version     1.0
// @grant       none
// @match       https://www.tiktok.com/@*/live*
// @run-at      document-end
// @author      Maxam 
// @homepageURL https://github.com/Maxam0001/TikTokLiveStreamURLHelper
// ==/UserScript==


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
        var url=__NEXT_DATA__.props.pageProps.liveProps.liveUrl;   
        alert(url);
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




    
