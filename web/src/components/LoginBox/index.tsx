import { useContext } from 'react';
import { VscGithubInverted }     from 'react-icons/vsc';

import styles          from './styles.module.scss'
import { authContext } from '../../contexts/auth';

export function LoginBox(){
  const { signInUrl, user } = useContext(authContext);
  console.log(user);
  
  return(
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}><VscGithubInverted size={24}/>Entrar com GitHub</a>
    </div>
  )
}
