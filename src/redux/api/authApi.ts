import * as ApiConstants from '../../../shared/constants/apiConstants.json';
import { ApiRef } from '../../../shared/services/axiosService';

const loginUserAPI = (payload) => ApiRef.current?.post(ApiConstants.LOGIN_ENDPOINT, payload);

const logoutUserAPI = () => ApiRef.current?.patch(ApiConstants.LOGOUT_ENDPOINT);

export { loginUserAPI, logoutUserAPI };
