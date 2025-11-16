import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import { setUser } from '../redux/userSlice';
import axios from 'axios';

function AuthSuccess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const handleAuth = async()=>{
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            if(token){
                localStorage.setItem('token', token)
                try {
                    const res = await axios.get('http://localhost:8000/api/V1/auth/me', {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if(res.data.success){
                        dispatch(setUser({ token: token, user: res.data.user }));
                        navigate('/dashboard');
                    }
                } catch (error) {
                    console.log('Error fetching user: ', error);
                }
            }
        }
        handleAuth();
    }, []);

  return (
    <h2>
        logging in
    </h2>
  )
}

export default AuthSuccess