import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';



export default function GoogleSignUp() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(usersActions.signUpUsers({
            fullName: userObject.given_name, 
            photoUser: userObject.picture, 
            email: userObject.email, 
            password: userObject.sub,
            country: "argelia",
            from: 'google'
        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "996401953184-9vvhl0ma5mpqdhl69squ1l2t2enlg56j.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "large" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}
