import { FormEvent, useContext, useState } from 'react';
import { VscSignOut, VscGithubInverted }   from 'react-icons/vsc';

import { authContext } from '../../contexts/auth';
import { api }         from '../../services/api';
import styles          from './styles.module.scss';

export function SendMessageForm(){
  const { user, signOut }     = useContext(authContext);
  const [message, setMessage] = useState('');

  async function handleSendMessage(event: FormEvent){
    event.preventDefault();

    if(!message.trim()){
      return;
    }

    await api.post('messages', { message });
    setMessage('');
  }
  
  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <VscGithubInverted size={16} />
        <span className={styles.userGithub}>{user?.login}</span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea 
          name='message' 
          id='message' 
          placeholder='Qual sua expectativa para o evento?'
          onChange={event => setMessage(event.target.value)}
          value={message}
        />
          <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  )
}
