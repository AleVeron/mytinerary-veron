import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import axios from "axios";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



export default function GoogleSignUp() {

    const dispatch = useDispatch();

    const [country, setCountry] = useState({})


    useEffect(() => {
        axios.get("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
            .then(response => {
                const apiResponse = response;
                setCountry(apiResponse)
            })
    }, []);


    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        let res = await dispatch(usersActions.signUpUsers({
            fullName: userObject.given_name,
            photoUser: userObject.picture,
            email: userObject.email,
            password: userObject.sub,
            country: country.data.country_name,
            from: 'google',
        }))
        if (res.data.success) {
            toast.success(res.data.message)
        
        } else {
            toast.error(res.data.message);
        }
    }


    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '996401953184-9vvhl0ma5mpqdhl69squ1l2t2enlg56j.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}
