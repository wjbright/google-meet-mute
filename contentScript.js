(() => {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { command } = obj;

    if (command === "toggle-audio") {
      toggleAudio();
    }

    if (command === "toggle-video") {
      toggleVideo();
    }
  });

  const IN_MEETING_AUDIO_BUTTON_XPATH =
    '//*[@id="yDmH0d"]/c-wiz/div/div/div[24]/div[3]/div[11]/div/div/div[2]/div/div[1]/div/div[2]/span/button';
  const IN_MEETING_VIDEO_BUTTON_XPATH =
    '//*[@id="yDmH0d"]/c-wiz/div/div/div[24]/div[3]/div[11]/div/div/div[2]/div/div[2]/div/span/button';
  const MEETING_PREP_ROOM_AUDIO_BUTTON_XPATH =
    '//*[@id="yDmH0d"]/c-wiz/div/div/div[24]/div[3]/div/div[2]/div[4]/div/div/div[1]/div[1]/div/div[7]/div[1]/div/div/div[1]';
  const MEETING_PREP_ROOM_VIDEO_BUTTON_XPATH =
    '//*[@id="yDmH0d"]/c-wiz/div/div/div[24]/div[3]/div/div[2]/div[4]/div/div/div[1]/div[1]/div/div[7]/div[2]/div/div[1]';

  function getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  const toggleVideo = () => {
    const inMeetingVideoButton = getElementByXpath(
      IN_MEETING_VIDEO_BUTTON_XPATH
    );
    const meetingPrepRoomVideoButton = getElementByXpath(
      MEETING_PREP_ROOM_VIDEO_BUTTON_XPATH
    );
    const button = meetingPrepRoomVideoButton ?? inMeetingVideoButton;

    if (!button) {
      console.error("Cannot find video button");
    }

    if (button) {
      button.click();
    }
  };

  const toggleAudio = () => {
    const inMeetingAudioButton = getElementByXpath(
      IN_MEETING_AUDIO_BUTTON_XPATH
    );
    const meetingPrepRoomAudioButton = getElementByXpath(
      MEETING_PREP_ROOM_AUDIO_BUTTON_XPATH
    );
    const button = meetingPrepRoomAudioButton ?? inMeetingAudioButton;

    if (!button) {
      console.error("Cannot find audio button");
    }

    if (button) {
      button.click();
    }
  };
})();
