import { useContext, useState } from 'react'

import styles from './App.module.scss';

import { MessageList } from './components/MessageList';
import { LoginBox }    from './components/LoginBox';
import { authContext } from './contexts/auth';
import { SendMessageForm } from './components/SendMessageForm';

export function App() {
  const { user } = useContext(authContext);

  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
