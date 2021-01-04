import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DialogConfig } from "../../store/types";

import {
  toggleChat,
  addUserMessage,
  setDialogConfig,
  setDialogActiveMessage,
  addResponseMessage,
} from "../../store/actions";
import { AnyFunction } from "../../utils/types";

import WidgetLayout from "./layout";

/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
* */

const mockDialogScriptJSON = {
  firstStepId: "stepId199",
  script: {
    stepId199: {
      message: "Hi! How can I help you today?",
      quickResponses: [
        {
          label: "What is your phone number?",
          value: "stepId200",
        },
      ],
    },
    stepId202: {
      message: "Our address is #56, 56th Ave. Please come visit us!",
      quickResponses: [
        {
          label: "What is hello?",
          value: "stepId199",
        },
        {
          label: "And what is your phone number?",
          value: "stepId200",
        },
        {
          label: "And what is your email?",
          value: "stepId201",
        },
      ],
    },
    stepId200: {
      message: "Our phone number is (024) 234-4562\nCall us 24/7",
      quickResponses: [
        {
          label: "What is your address?",
          value: "stepId202",
        },
      ],
    },
    stepId201: {
      message: "Our email address is email.address@example.com",
      quickResponses: [
        {
          label: "What is your phone number?",
          value: "stepId200",
        },
      ],
    },
    stepId203: {
      message: "adsfadsfads",
      quickResponses: [
        {
          label: "sdfasdf",
          value: "stepId199",
        },
      ],
    },
  },
  phoneNumberParameters: {},
  testimonials: [],
  credibilityBuilders: [],
};

const mockUIJSON = {};

function fetchMockDialogScript() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockDialogScriptJSON);
    }, 500);
  });
}

function fetchMockWidgetUI() {}

/* - - - - - - - - - - - - - - - - - - - */

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
};

function Widget(props: Props) {
  const { handleQuickButtonClicked, handleSubmit, handleNewUserMessage, handleTextInputChange } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    function fetchScript() {
      fetchMockDialogScript().then(res => {
        const responseData = res as DialogConfig;

        if (!responseData.firstStepId) return;

        const firstStep = responseData.script[responseData.firstStepId];

        dispatch(setDialogConfig(responseData));
        dispatch(setDialogActiveMessage(firstStep));
        dispatch(addResponseMessage(firstStep.message));
      });
    }

    fetchScript();
  }, []);

  /* - - - - - - - - - - - - - - - - - - - */

  const handleMessageSubmit = event => {
    event.preventDefault();
    const userInput = event.target.message.value;

    if (!userInput.trim()) {
      return;
    }

    handleSubmit?.(userInput);
    dispatch(addUserMessage(userInput));
    handleNewUserMessage(userInput);
    event.target.message.value = "";
  };

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value);
  };

  return (
    <WidgetLayout
      onToggleConversation={() => dispatch(toggleChat())}
      onSendMessage={handleMessageSubmit}
      onQuickButtonClicked={onQuickButtonClicked}
      onTextInputChange={handleTextInputChange}
      {...props}
    />
  );
}

export default Widget;
