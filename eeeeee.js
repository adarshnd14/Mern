import axios from "axios";

//call handleLogin() in useEffect with empty []

const handleLogin = async () => {

    //paste email password they have given
    const loginData = {
        email: 'eve......',
        password: '.....'
    }

    try {
        //copy paste proper url
        const res = await axios.post('http://register_in/api/login', loginData)
        console.log(res);

        //see once in console what the response is, and where the token has been mentioned 
        //if you are not getting the token
        const token = res.data.data.token;
        //console log Token and see are you getting the token

        if (res.status === 200) {
            handleToken()
            localStorage.setItem('token', token)
            alert('Successfully logged in')
        }

    } catch (err) {
        console.log(err);
        alert('Invalid username / password')
    }
};

const handleToken = async () => {
    const token = localStorage.getItem('token')
    try {
        //give 2nd url just which is just above headers obj in document
        const res = await axios.get('.....', {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json'
            }
        })
        console.log(res.data.users);
    } catch (err) {
        console.log(err);
    }
}