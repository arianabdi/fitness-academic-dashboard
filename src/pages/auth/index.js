import axios from "axios";

export async function validateToken(token) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: { "authorization": `bearer ${token}` }
    });
    if (res.status === 200 || res.status === 201) {
      console.log("you already loggedIn");
      return  true;
    }
    return  false
  }catch (e){
    return  false;
  }

  // console.log('auth', res);
}
