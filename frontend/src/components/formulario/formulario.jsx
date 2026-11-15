import { useState } from 'react';
import './formulario.css'

// --- Axios -------------------------
import axios from "axios";

export default function Form({texto}){
     const [enviando, setEnviando] = useState(false)
     const [status, setStatus] = useState(null)
     const [dados, setDados] = useState({
          nome:     '',
          email:    '',
          mensagem: ''
     })
     
     const handleSubmit = async (e) => {
          e.preventDefault()
          setEnviando(true)
          setStatus(null)
          
          try{
               await axios.post('http://localhost:3001/email', dados, {
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               setStatus("Sucesso")
               setDados({ nome: '', email: '', mensagem: '' })           
          } catch (erro) {
               setStatus('erro')
               console.log(status)
               console.error(erro)
          } finally {
               setEnviando(false)
          }
     }

     const handleChange = (e) => {
          const { name, value } = e.target
          setDados({ ...dados, [name]: value })
     }

     return(
          <form className="container-forms" onSubmit={handleSubmit}>
               <input type="text" name='nome' value={dados.nome} onChange={handleChange}
                      placeholder='Nome'/>
               <input type="email" name='email' value={dados.email} onChange={handleChange}
                      placeholder='email@empresa.com' required/>
               <textarea className='mensagem'
                         name='mensagem' 
                         value={dados.mensagem} 
                         onChange={handleChange}
                         placeholder='Descreva com o máximo de detalhes possível o seu projeto para melhor análise' 
                         required
               />
               
               <button type='submit' disabled={enviando} >
                    {enviando ? "Enviando..." : texto}</button>  
                    
               {status === 'sucesso' && <p className="msg-sucesso">Mensagem enviada com sucesso!</p>}
               {status === 'erro' && <p className="msg-erro">Erro ao enviar. Tenta de novo.</p>}
          </form>
     )
}