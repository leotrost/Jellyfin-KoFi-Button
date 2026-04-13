# Jellyfin-KoFi-Button

Heart button to donate, powered by JavaScript Injector plugin. Works in mobile apps, too!

## Screenshots

<img width="190" height="77" alt="Screenshot 2026-04-13 134615" src="https://github.com/user-attachments/assets/f84bfdb6-7e81-4da0-86a4-2f0b0afb29a1" />
<br></br>
Heart icon
<br></br>
<img width="989" height="807" alt="Screenshot 2026-04-13 135140" src="https://github.com/user-attachments/assets/2bde4a32-ced5-4488-ad4b-fd2fe7d6795c" />
<br></br>
In-browser widget popup
<br></br>

## Install Instructions

1. Install the JS Injector plugin - https://github.com/n00bcodr/Jellyfin-JavaScript-Injector <br></br>
2. Within Plugins > JS Injector, add a script, name it "KoFi Button" or similar for reference, then paste the raw code of the jellyfin-ko-fi.js file in this project, editing the username to reflect your Ko-Fi username, then save. Make sure to tick the "Authentication" setting to make sure the button doesn't render on the login screen (shouldn't as the code looks for certain ui elements, but tick this setting just in case) <br></br>
3. Hard refresh your browser (ctrl + f5, shift + refresh, or clear site data) and test! <br></br>

## Customization

If you would like to change the heart icon, simply paste a url in between the '' at "const customIconUrl = '' "
