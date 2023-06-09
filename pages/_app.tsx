import '@/styles/globals.css'
import '@/styles/datePicker.module.css'
import '@/styles/calendar.module.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
