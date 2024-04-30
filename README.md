# Overview

Removes recommended videos while watching Youtube Videos.
Allows users to also take notes while watching a youtube video. This tool provides a more focused and a productive environment while alllowing note-taking without leaving the video page.

# Functionality

- Uses a script to automatically hides recommended videos on YouTube to help users focus on the video content they're currently viewing. 

- A note-taking area is dynamically added to the right side of the YouTube video page when a user is viewing a video. This feature is designed to only appear on video pages, ensuring it does not interfere with the user experience on the YouTube start page or other non-video pages.

- An additional feature allows users to save their notes to a text file. This is facilitated by a "Save Notes" button within the note-taking area that saves the note as a txt file which the user can then download to their local machine.

# Breakdown of Classes

## manifest.json

This file tells Chrome about your extension, its version, and what it needs to run.

## background.json

This will run in the background and can listen for events, like the extension being clicked. This file may not have code but exists because it is referenced in manifest.json

## content.js

This script will run in the context of the web page and can be used to hide the recommended videos, create the note taking area in replacement, and create widgets as necessary. The script lives in this script which uses a combination of URL path checking and DOM observation to display the note-taking area only when a video is being viewed. This involves detecting changes in the page's URL and the presence of video player elements to determine the appropriate times to show or hide the note-taking interface. A MutationObserver is employed to monitor for changes in the page, accommodating YouTube's dynamic content loading, and ensuring the note-taking area's visibility is updated appropriately during site navigation.

## script.js

This file allows the user to interact with the extension's popup UI to trigger functionality within the extension. Specifically, clicking the hideBtn button in the popup sends a command to the extension's background script to hide recommended videos on YouTube.

## popup.html

This is the HTML document that forms the structure of your extension's popup window. The popup is what users interact with when they click on the extension icon in the Chrome toolbar. 

## popup.css

This CSS file is used to style the popup window defined in popup.html. It controls the appearance of the popup, including layout, colors, fonts, and other visual elements. 
