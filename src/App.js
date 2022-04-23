import { useCallback } from 'react';

import 'survey-react/modern.min.css';
// import 'survey-react/survey.min.css';
import { Survey, StylesManager, Model, FunctionFactory } from 'survey-react';

StylesManager.applyTheme("modern");

function grc(params) {
  if (params[3]==='item4') {
    return 10
  }
  if (params[0]==='item1') {
    return 1
  }
  if (params[0]==='item2') {
    return 2
  }
  if (params[0]==='item3') {
    return 3
  }
  if (params[0]==='item4') {
    return 4
  }
  return 7;
};

function fgrc(params) {
  let grc = params[0];
  if (params[1]==='item2') {
    grc += -1;
  };
  if (params[1]==='item3') {
    grc += -2;
  };
  if (params[1]==='item4') {
    grc += -4;
  };
  if (params[2]==='item2') {
    grc += -1;
  };
  if (params[2]==='item3') {
    grc += -2;
  };
  if (params[2]==='item4') {
    grc += -4;
  };
  if (params[3]==='item3') {
    grc += -1;
  };
  if (params[3]==='item4') {
    grc += -2;
  };
  if (params[4]==='item1'||params[4]==='item2') {
    grc += 1;
  };
  if (params[4]==='item4') {
    grc += -1;
  };
  return grc;
};

FunctionFactory.Instance.register("grc",grc);
FunctionFactory.Instance.register("fgrc",fgrc);

const surveyJson = {
 "title": "SORA questionnaire",
 "description": "This is a questionnaire thet would help to prepare SORA analysis. Please make sure that your mission requires SORA assessment.",
 "logoPosition": "right",
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "text",
     "name": "question1",
     "title": "Title of the assessment",
     "isRequired": true
    }
   ],
   "title": "Assessment setup",
   "description": "Provide the name for your questionnaire"
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "comment",
     "name": "question2",
     "title": "ConOps",
     "description": "Copy below ConOps content",
     "isRequired": true
    }
   ],
   "title": "Step #1",
   "description": "ConOps description"
  },
  {
   "name": "page3",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question3",
     "title": "What is the maximum characteristics dimension of the UAS?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "1 meter/3 feet"
      },
      {
       "value": "item2",
       "text": "3 meters/10 feet"
      },
      {
       "value": "item3",
       "text": "8 meters/25 feet"
      },
      {
       "value": "item4",
       "text": "> 8 meters/25 feet"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question4",
     "title": "What is the expected typical kinetic energy",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "< 700 Joules for UAS with a max. dimension of 1 meter/3 feet"
      },
      {
       "value": "item2",
       "text": "< 34000 Joules for UAS with a max. dimension of 3 meter/10 feet"
      },
      {
       "value": "item3",
       "text": "< 1084000 Joules for UAS with a max. dimension of 8 meter/25 feet"
      },
      {
       "value": "item4",
       "text": "> 1084000 Joules for UAS with a max. dimension of > 8 meter/25 feet"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question5",
     "title": "Will the UAS be flown within visual line of sight (VLOS), extended visual line of sight (EVLOS) or beyond visual line of sight (BVLOSS)?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "VLOS"
      },
      {
       "value": "item2",
       "text": "EVLOS"
      },
      {
       "value": "item3",
       "text": "BVLOS"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question6",
     "title": "Over what kind of ground area is the aircraft flying?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "A controlled ground area"
      },
      {
       "value": "item2",
       "text": "A sparsely populated environment"
      },
      {
       "value": "item3",
       "text": "A populated environment"
      },
      {
       "value": "item4",
       "text": "An assembly of people"
      }
     ]
    }
   ],
   "title": "Step #2",
   "description": "Determination of initial Ground Risk Class (GRC)"
  },
  {
   "name": "page4",
   "elements": [
    {
     "type": "expression",
     "name": "igrc",
     "title": "Initial GRC",
     "expression": "grc({question3},{question4},{question5},{question6})"
    }
   ]
  },
  {
   "name": "page5",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question7",
     "title": "Do you use a tethered UAS?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "No (0)"
      },
      {
       "value": "item2",
       "text": "Yes, with a low level of robustness (-1)"
      },
      {
       "value": "item3",
       "text": "Yes, with a medium level of robustness (-2)"
      },
      {
       "value": "item4",
       "text": "Yes, with a high level of robustness (-4)"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question8",
     "visibleIf": "{question7} = 'item1'",
     "title": "Can you take strategic mitigations to reduce the ground risk?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "No (0)"
      },
      {
       "value": "item2",
       "text": "Yes, with a low level of robustness (-1)"
      },
      {
       "value": "item3",
       "text": "Yes, with a medium level of robustness (-2)"
      },
      {
       "value": "item4",
       "text": "Yes, with a high level of robustness (-4)"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question9",
     "title": "Can the effects of ground impact of the UAS be reduced?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "No (0)"
      },
      {
       "value": "item2",
       "text": "Yes, with a low level of robustness (0)"
      },
      {
       "value": "item3",
       "text": "Yes, with a medium level of robustness (-1)"
      },
      {
       "value": "item4",
       "text": "Yes, with a high level of robustness (-2)"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question10",
     "title": "Is an Emergency Response Plan (ERP) in place, is UAS operator validated and effective?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "No (+1)"
      },
      {
       "value": "item2",
       "text": "Yes, with a low level of robustness (+1)"
      },
      {
       "value": "item3",
       "text": "Yes, with a medium level of robustness (0)"
      },
      {
       "value": "item4",
       "text": "Yes, with a high level of robustness (-1)"
      }
     ]
    }
   ],
   "title": "Step #3",
   "description": "Determination of final ground risk class"
  },
  {
   "name": "page6",
   "elements": [
    {
     "type": "expression",
     "name": "fgrc",
     "title": "Determination of final ground risk class",
     "expression": "fgrc({igrc},{question7},{question8},{question9},{question10})"
    }
   ]
  },
  {
   "name": "page7",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question11",
     "title": "Does the operation take place in atypical airspace?",
     "isRequired": true,
     "choices": [
      {
       "value": "item1",
       "text": "No"
      },
      {
       "value": "item2",
       "text": "Yes (ARC A, AEC 12)"
      }
     ]
    }
   ],
   "title": "Step #4",
   "description": "Determination of initial Air Risk Class (ARC)"
  },
  {
   "name": "page8",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question12",
     "title": "Does the operation take place above Flight Level 600?",
     "choices": [
      "item1",
      "item2",
      "item3"
     ]
    }
   ]
  },
  {
   "name": "page10",
   "elements": [
    {
     "type": "text",
     "name": "question14",
     "title": "czy to jest krok 7?"
    }
   ],
   "title": "Step #7"
  }
 ],
 "triggers": [
  {
   "type": "complete",
   "expression": "{igrc} > 7"
  },
  {
   "type": "skip",
   "expression": "{question11} = 'item2'",
   "gotoName": "question14"
  }
 ],
 "clearInvisibleValues": "onHidden"
}

function App() {
  const survey = new Model(surveyJson);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
