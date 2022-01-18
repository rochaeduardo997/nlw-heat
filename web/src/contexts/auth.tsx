import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

type AuthResponse = {
  result:{
    token: string;
    user:{
      id:         string;
      avatar_url: string;
      name:       string;
      login:      string;
    }
  }
}

type User = {
  id:         string;
  name:       string;
  login:      string;
  avatar_url: string;
}

type AuthContextData = {
  user:      User | null;
  signInUrl: string;
  signOut: () => void;
}

export const authContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
}

export function AuthProvider(props: AuthProvider){
  const [user, setUser] = useState<User | null>(null);
  
  async function signIn(githubCode: string){
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode
    });
    
    const { token, user } = response.data.result;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    
    setUser(user);
  }

  const githubId  = 'bfd866a12031e0595737';
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${githubId}`;

  function signOut(){
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }
  
  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if(token){
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data)
      });
    }
  }, []);
  
  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');
    
    if(hasGithubCode){
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);
  
  return(
    <authContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </authContext.Provider>
  )
}