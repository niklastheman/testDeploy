import {
  UNFORCED_FOREHAND_USER,
  UNFORCED_BACKHAND_USER,
  UNFORCED_FOREHAND_OPPONENT,
  UNFORCED_BACKHAND_OPPONENT,
  ACES_USER,
  DOUBLE_FAULTS_USER,
  ACES_OPPONENT,
  DOUBLE_FAULTS_OPPONENT,
  WINNERS_FOREHAND_USER,
  WINNERS_BACKHAND_USER,
  WINNERS_FOREHAND_OPPONENT,
  WINNERS_BACKHAND_OPPONENT,
  UNSPECIFIED_POINT_USER,
  UNSPECIFIED_POINT_OPPONENT,
  UNFORCED_FOREHANDS_DISPLAY_NAME,
  UNFORCED_BACKHANDS_DISPLAY_NAME,
  ACES_DISPLAY_NAME,
  DOUBLE_FAULTS_DISPLAY_NAME,
  WINNERS_FOREHAND_DISPLAY_NAME,
  WINNERS_BACKHAND_DISPLAY_NAME,
  UNSPECIFIED_POINTS_DISPLAY_NAME,
} from "./types";

export const addShotTranslation = (shots) => {
  
    for (const shot of shots) {
    switch (shot.key) {
      case UNFORCED_FOREHAND_USER:
        shot["displayName"] = UNFORCED_FOREHANDS_DISPLAY_NAME;
        break;
      case UNFORCED_BACKHAND_USER:
        shot["displayName"] = UNFORCED_BACKHANDS_DISPLAY_NAME;
        break;
      case UNFORCED_FOREHAND_OPPONENT:
        shot["displayName"] = UNFORCED_FOREHANDS_DISPLAY_NAME;
        break;
      case UNFORCED_BACKHAND_OPPONENT:
        shot["displayName"] = UNFORCED_BACKHANDS_DISPLAY_NAME;
        break;
      case ACES_USER:
        shot["displayName"] = ACES_DISPLAY_NAME;
        break;
      case DOUBLE_FAULTS_USER:
        shot["displayName"] = DOUBLE_FAULTS_DISPLAY_NAME;
        break;
      case ACES_OPPONENT:
        shot["displayName"] = ACES_DISPLAY_NAME;
        break;
      case DOUBLE_FAULTS_OPPONENT:
        shot["displayName"] = DOUBLE_FAULTS_DISPLAY_NAME;
        break;
      case WINNERS_FOREHAND_USER:
        shot["displayName"] = WINNERS_FOREHAND_DISPLAY_NAME;
        break;
      case WINNERS_BACKHAND_USER:
        shot["displayName"] = WINNERS_BACKHAND_DISPLAY_NAME;
        break;
      case WINNERS_FOREHAND_OPPONENT:
        shot["displayName"] = WINNERS_FOREHAND_DISPLAY_NAME;
        break;
      case WINNERS_BACKHAND_OPPONENT:
        shot["displayName"] = WINNERS_BACKHAND_DISPLAY_NAME;
        break;
      case UNSPECIFIED_POINT_USER:
        shot["displayName"] = UNSPECIFIED_POINTS_DISPLAY_NAME;
        break;
      case UNSPECIFIED_POINT_OPPONENT:
        shot["displayName"] = UNSPECIFIED_POINTS_DISPLAY_NAME;
        break;
      default:
        break;
    }
  }
};
