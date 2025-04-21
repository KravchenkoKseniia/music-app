import React from 'react';
import styles from './main.module.css';
import {Route, Routes} from 'react-router';
import {MainPage} from './pages/MainPage';
// import {AppContext, Quote} from './context';
// import {initUserAPI, User} from './modules/clients/user';
// import {QuotePage} from './Pages/QuotePage/QuotePage';
// import {SharePage} from './Pages/SharePage/SharePage';
// import {LoginPage} from './Pages/LoginPage/LoginPage';
// import {SettingsPage} from './Pages/SettingsPage/SettingsPage';
// import {initQuoteAPI} from './modules/clients/quote';
// import {SavedQuotesPage} from './Pages/SavedQuotesPage/SavedQuotesPage';
// import {DeleteSavedQuotePage} from './Pages/DeleteSavedQuotePage/DeleteSavedQuotePage';
// import {Loader} from './Components/Loader/Loader';
// import {initCategoriesAPI} from './modules/clients/categories';
// import {IconType} from './Components/IconButton/IconButton';


export const App: React.FC = () => {

    return (
        <>

            <div className={styles.app}>
                <div className={styles.content}>
                    <Routes>
                        <Route index element={<MainPage/>}/>
                        {/*<Route path="login" element={<LoginPage/>}/>*/}
                        {/*<Route path="settings" element={<SettingsPage/>}/>*/}
                        {/*<Route path="share" element={<SharePage/>}/>*/}
                        {/*<Route path="save" element={<SavedQuotesPage/>}/>*/}
                        {/*<Route path="share-or-delete/:quoteId" element={<DeleteSavedQuotePage/>}/>*/}
                    </Routes>
                </div>
            </div>
        </>
    );

};