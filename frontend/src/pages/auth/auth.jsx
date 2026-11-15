import './auth.css'

import Header            from '../../components/Header/Header'
import axios             from 'axios'

import { useLanguage }   from '../../context/LanguageContext'
import { useState }      from 'react'
import { motion }        from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Auth(){
     const navigate = useNavigate('')
     const { t } = useLanguage()
     const [ senha, setSenha ] = useState('');

     const efetuarLogin = async (e) => {
          e.preventDefault();

          try{
               const resposta = await axios.post('http://127.0.0.1:3001/auth/login', {
                    senha: senha
               });

               const { access_token, refresh_token } = resposta.data;
               localStorage.setItem('token', access_token)
               localStorage.setItem('refresh_token', refresh_token)
               
               navigate('/admin')
          }catch(erro){
               if(erro.response){
                    alert(`Erro: ${erro.response.data.detail}`);
               } else {
                    alert("Erro ao conectar com o servidor!");
               }
          }
     };

     return(
          <>
               <Header titulo={t.auth.titulo} />
               <form className='form-style' onSubmit={efetuarLogin}>
                    <input type='password'
                           placeholder='Digite a senha'
                           value={senha}
                           onChange={(e) => setSenha(e.target.value)}/>
                    <motion.button className='btn-login'
                                   type='submit'
                                   whileHover={{
                                        backgroundColor: "#6a0dad",
                                        color: "#ffc300"
                                   }}>
                         Entrar</motion.button>
               </form>
          </>
     )
}