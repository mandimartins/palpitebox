import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { BeatLoader } from 'react-spinners';

const Pesquisa = () => {

    const {  register, handleSubmit,watch, errors} = useForm()

    const Nome = watch('Nome')
    const Whatsapp = watch('Whatsapp')
    const Email = watch('Email')
    const Nota = watch('Nota')
    
    const [sucess, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const notas = [0, 1, 2, 3, 4, 5]

    const save = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/save',{
                method:'post',
                body: JSON.stringify({Nome, Whatsapp, Email, Nota})
            })
            const data = await response.json();
            setIsLoading(false)
            setSuccess(true)
            setRetorno(data)
        } catch (error) {
        }
    }

    return (
        <>

        {
            isLoading && <div className="spinnerContainer">
                <BeatLoader  size={80} loading={isLoading} color={"#ffbe55"} />
                <p>Aguarde...</p>
            </div>
        }
        {
            sucess === false && isLoading === false && <div className="formContainer">
            <form className="form" onSubmit={handleSubmit(save)}>
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome" name="Nome" ref={register({required:true, maxLength:40})}></input>
                {errors.Nome && <span className="fieldError">Por favor, preencha o campo de Nome.</span>}

                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="text" id="whatsapp" name='Whatsapp' placeholder="(00) 00000-0000" ref={register({required:true, minLength:10, maxLength:11})} ></input>
                {errors.Whatsapp && <span className="fieldError">Por favor, informe seu Whatsapp. Verifique se os valores estão corretos e não use símbolos.</span>}

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Email" name="Email" ref={register({required:true, maxLength:30})}></input>
                {errors.Email && <span className="fieldError">Por favor, preencha o campo de Email.</span>}

               <div className="reviewBox">
               {
                    notas.map( nota => (<label key={nota} htmlFor={nota}>{nota}<br/><input id={nota} type="radio" name="Nota" value={nota} ref={register({required:true})}></input></label>))
                }
               </div>

                {errors.Nota && <span className="fieldError">Por favor, escolha uma nota antes de enviar os dados!</span>}

              <input type="submit" value="Enviar"/>
              <br/>
              <small>Não enviamos spam.</small>
            </form>
        </div>
        }
        { sucess && 
            <div className="success">
            <p>Obridado por contribuir com sua sugestão ou crítica!</p>
            {
                retorno.showCoupon && <div className="cupom"> <span>Seu Cupom :</span><strong>{retorno.Cupom}</strong> <br/> <span>Promoção Ativa :</span> <strong>{retorno.Promo}</strong> <br/> <span id="printMessage">Tire print ou foto desse cupom e apresente em nosso estabelecimento. </span> </div>
            }
            </div>
      }
        </>
    )
}

export default Pesquisa;