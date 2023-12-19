import axios from "axios";




export class FormUtils {
  static async loadOptionsFromApi(auth, path, key, chooseOptionsLabelFrom, chooseOptionsValueFrom){
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      } );

      if(res.data.statusCode === 200){
        //it should be an array object
        const options = res.data.data[key].map(item => {
          return {label: item[chooseOptionsLabelFrom], value: item[chooseOptionsValueFrom]}
        })

        return options;
      }
    }catch (e) {
      console.log('Error: ', e)
    }
  }

}
