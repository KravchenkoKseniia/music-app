import React from 'react';
// import styles from './styles.module.css';
// import {AppContext} from '../../context';
// import {LoginForm} from '../../Components/LoginForm/LoginForm';
import {Header} from '../components/Header/Header';
//import {NotificationElement} from '../components/NotificationElement/NotificationElement';
//import {useNavigate} from "react-router";

export const MainPage: React.FC = () => {
//     const navigate = useNavigate();
//     const login = useRef<HTMLInputElement>(null!);
//     const password = useRef<HTMLInputElement>(null!);
//     const context = useContext(AppContext);
//     const [error, setError] = useState<string>();
//     const [isProcessing, setIsProcessing] = useState<boolean>(false);

    // useEffect(() => {
    //     if (context.user?.[0]._id) {
    //         navigate('/settings');
    //     }
    // }, [context.user, navigate]);

    // const onLoginSubmit : React.FormEventHandler<HTMLFormElement> = async (e) => {
    //     setError('');
    //     setIsProcessing(true);
    //     e.preventDefault();
    //
    //     try {
    //         const user = await context.userAPI.GetUserToken(login.current!.value, password.current!.value);
    //         context.setUser(user, []);
    //         navigate('/settings');
    //     } catch (e) {
    //         console.error(e);
    //         setError('Invalid credentials');
    //     }
    //     setIsProcessing(false);
    // };

    return (
        <>
            <Header/>
            {/*<LoginForm onSub={onLoginSubmit} isDis={isProcessing} loginRef={login} passwordRef={password} />*/}
            {/*{error && <NotificationElement message={error} level='error' />}*/}
        </>
    );
};