import axios from "axios";


export const registerUserApi = async (data) => {
    try {
        const res = await axios.post(`http://localhost/js_Learning/my-blog/Backend/Controllers/Users.php`, data,{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const loginUserApi = async (data) => {
    try {
        const res = await axios.post(`http://localhost/js_Learning/my-blog/Backend/Controllers/Users.php`, data,{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
