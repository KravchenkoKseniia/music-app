import React from 'react';
import styles from './main.module.css';
import {Route, Routes} from 'react-router';
import {MainPage} from './pages/MainPage';
// import {Loader} from './Components/Loader/Loader';



export const App: React.FC = () => {

    return (
        <>

            <div className={styles.app}>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<MainPage/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );

};