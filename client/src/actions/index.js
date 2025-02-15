import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_LINK_GOOGLE,
  // AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  // AUTH_UNLINK_FACEBOOK, 
  AUTH_ERROR,
  DASHBOARD_GET_DATA
} from './types';

export const oauthGoogle = data => {
  return async dispatch => {
    await axios.post('users/oauth/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP
    });
  };
}

export const linkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('users/oauth/link/google', {
      access_token: data
    });

    dispatch({
      type: AUTH_LINK_GOOGLE,
      payload: res.data
    });
  };
}

export const unlinkGoogle = data => {
  return async dispatch => {
    const res = await axios.post('users/oauth/unlink/google');

    dispatch({
      type: AUTH_UNLINK_GOOGLE,
      payload: res.data
    });
  };
}

// export const linkFacebook = data => {
//   return async dispatch => {
//     const res = await axios.post('users/oauth/link/facebook', {
//       access_token: data
//     });

//     dispatch({
//       type: AUTH_LINK_FACEBOOK,
//       payload: res.data
//     });
//   };
// }

// export const unlinkFacebook = data => {
//   return async dispatch => {
//     const res = await axios.post('users/oauth/unlink/facebook');

//     dispatch({
//       type: AUTH_UNLINK_FACEBOOK,
//       payload: res.data
//     });
//   };
// }

// export const oauthFacebook = data => {
//   return async dispatch => {
//     await axios.post('users/oauth/facebook', {
//       access_token: data
//     });

//     dispatch({
//       type: AUTH_SIGN_UP
//     });
//   };
// }

export const signUp = data => {
  return async dispatch => {
    try {
      await axios.post('users/signup', data);

      dispatch({
        type: AUTH_SIGN_UP,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use'
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
      let userID;
      await axios.post('users/signin', data).
        then(res => {
          userID = res.data.userID;
        });

      dispatch({
        type: AUTH_SIGN_IN,
        payload: userID
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password combination isn\'t valid'
      })
    }
  };
}

export const checkAuth = () => {
  return async dispatch => {
    try {
      let userID;
      await axios.get('users/status').
        then(res => {
          userID = res.data.userID;
        });

      dispatch({
        type: AUTH_SIGN_IN,
        payload: userID
      });

      console.log('user is auth-ed')
    } catch (err) {
      console.log('error', err)
    }
  };
}

export const getDashboard = () => {
  return async dispatch => {
    try {
      const res = await axios.get('users/dashboard')

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data
      })

    } catch (err) {
      console.error('err', err)
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    await axios.get('users/signout');

    dispatch({
      type: AUTH_SIGN_OUT
    })
  };
}
