import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import App from './components/App';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
            <AppProvider i18n={enTranslations}>
			    <App />
            </AppProvider>
		</AppContainer>,
		document.getElementById('app')
	);
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App', () => render(App));
