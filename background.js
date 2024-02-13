// 1. find all the chrome browsers open
const regex = /https?:\/\/meet\.google\.com\/.*/; // regex for matching the https//meet.google.com/* pattern

const getGoogleMeetTabs = async () => {
  const allTabs = await chrome.tabs.query({});
  const googleMeetTabs = allTabs.filter((tab) => {
    const url = tab.url;
    return regex.test(url);
  });

  return googleMeetTabs;
};


async function start(command, tab) {
  console.log(`Command: ${command}`);

  /**
   * 1. find all the chrome browsers open
   * 2. find all the tabs that have google meet open and in a meeting
   * 3. loop through each one
   * 4. select each meet call and send content script message to mute
   */

  // 2. find all the tabs that have google meet open and in a meeting
  const google_meet_tabs = await getGoogleMeetTabs();

  const findAndToggleMuteButton = async (tabId) => {
    try {
      await chrome.tabs.sendMessage(tabId, { command });

    } catch (error) {
      console.log("🚀 ~ findAndToggleMuteButton ~ error:", error);
    }
  };

  // 3. loop through each one
  google_meet_tabs.forEach((tab) => {
    // 4. select each meet call and send content script message to mute
    findAndToggleMuteButton(tab.id);
  });
}

async function injectScript() {
  for (const cs of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: cs.matches})) {
      chrome.scripting.executeScript({
        files: cs.js,
        target: {tabId: tab.id, allFrames: cs.all_frames},
        injectImmediately: cs.run_at === 'document_start',
        // world: cs.world, // uncomment if you use it in manifest.json in Chrome 111+
      });
    }
  }
}

chrome.runtime.onInstalled.addListener(injectScript);
chrome.commands.onCommand.addListener(start);
