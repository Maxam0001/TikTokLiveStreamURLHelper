# TikTokLiveStreamURLHelper
Greasemonkey script for retrieving the streaming URL from a TikTok Live

After installing this script, navigating to a TikTok live stream will add a new command to the 
tools area (the "Share" arrow beside the report button above the video).

The new command, "Get Stream URL", will pop an alert box containing the live stream URL, which you can then
copy and use however you want.

Since TikTok changes their code frequently, this functionality will probably break often. In the meantime, 
enjoy it while it works.

9/4 Update - TikTok isn't leaking the HLS stream URL anymore, so we're stuck with using the FLV stream instead.
12/10 Update - Fix for some huge changes TikTok made that broke the script. Luckily, the HLS stream is accessible again. 

- Maxam
