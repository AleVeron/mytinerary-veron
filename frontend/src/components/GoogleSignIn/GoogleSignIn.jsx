import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function GoogleSignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        let res = await dispatch(usersActions.loginUsers({
            fullName: userObject.given_name,
            photoUser: userObject.picture,
            email: userObject.email,
            password: userObject.sub,
            from: 'google'
        }))
      
        if (res.data.success) {
            toast.success(res.data.message)
            navigate('/')
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