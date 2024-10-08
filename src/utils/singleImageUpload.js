import axios from 'axios';

const storageResponse = await axios.put(
    'https://storage.michofat.com/addsingleimage',
    formData,
    {
      headers: { 
        'Content-Type': 'multipart/form-data',
      }
    }
  );


  export default storageResponse;