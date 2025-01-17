
// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables


  const setConfig = Component.setConfig ?? undefined


  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
      <Head>
        <title>Market</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta charSet="utf-8" />
      </Head>

          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({settings})=>{
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                          <Component {...pageProps} />
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{className:'react-hot-toast'}} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
