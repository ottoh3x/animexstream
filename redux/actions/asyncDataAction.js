import { MyAction } from "./actions";
const axios = require('axios'); 


const fetchData = () => {
  return { type: MyAction.FETCH };
};
const recieveData = (payload) => {
  return { type: MyAction.RECEIVE, payload: payload };
};

export const asyncDataAction = (URL) => {
  return async function getServerSideProps(dispatch) {
    dispatch(fetchData());
    const result = await axios.get(URL);
    dispatch(recieveData(result.data));
    return {
      props: {
        data: result.data.json_data || result,
      },
    };
  };
};
