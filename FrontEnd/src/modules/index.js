import { combineReducers } from 'redux';
import accompanyCondition from './accompanyCondition';
import accompanyFilter from './accompanyFilter';
import auth from './auth';
import loading from './loading';
import planDate from './planDate';
import morePlanTravel from './morePlanTravel';
import Dm from './Dm';
import morePlanCompanion from './morePlanCompanion';
import morePlanMemo from './morePlanMemo';
import community from './community';
import communityComment from './communityComment';
import postmap from './postmap';
import baseNavigation from './baseNavigation';
import progressModal from './progressModal';
import snackBar from './snackBar';

const rootReducer = combineReducers({
  auth,
  loading,
  accompanyCondition,
  accompanyFilter,
  planDate,
  morePlanTravel,
  Dm,
  morePlanCompanion,
  morePlanMemo,
  community,
  communityComment,
  postmap,
  baseNavigation,
  progressModal,
  snackBar,
});

export default rootReducer;
