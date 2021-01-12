import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Session, setSession} from '../features/auth/authSlice'
import {store} from '../app/store'

const axios = require('axios').default

interface State {
    auth: Session
}

export const Auth = () => {

    const [form, setForm] = useState({
        email: {msg: '', state: ''}, password: {msg: '', state: ''}
    })

    const [msg, setMsg] = useState({
        message: '', color: 'gray'
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: 'active'}})
    }

    const focusHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: 'active'}})
    }

    const blurHandler = (event: any) => {
        if (event.target.value === '') {
            setForm({ ...form, [event.target.name]: {msg: event.target.value, state: ''}})
        }
    }

    const a = useSelector((state: State) => axios.create(state.auth.request_params))

    const handleLogin = () => {
        a.post('/auth/login', {email: form.email.msg, password: form.password.msg})
            .then((res: any) => {
                store.dispatch(setSession({email: res.data.email, name: res.data.username,
                    token: res.data.token}))
                setMsg({message: 'Welcome, ' + res.data.username + '!', color: '#66bb6a'})
                window.location.replace('about')
            })
            .catch((err: any) => setMsg(
                {message: (err.response.data) ? err.response.data.message : err.data.message, color: '#ef5350'}
            ))
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="breadcrumb">Home</a>
                        <a className="breadcrumb">Login</a>
                    </div>
                </div>
            </nav>
        <div className='row' style={{marginTop: 25}}>
            <form className='col s12'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>email</i>
                        <input
                            id='email'
                            name='email'
                            type='text'
                            value={form.email.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='email' className={form.email.state} style={{fontSize: '160%'}}>Email</label>
                    </div>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>more_horiz</i>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={form.password.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='password' className={form.password.state} style={{fontSize: '160%'}}>Password</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn green lighten-2 black-text'
                    style={{float: 'left', marginLeft: 10}}
                    onClick={handleLogin}
                >
                    Login
                </button>
                <a
                    className='btn grey lighten-1 black-text'
                    style={{float: 'right', marginRight: 10}}
                    href='/register'
                >
                    Register new User
                </a>
            </div>
            <div className='alert' style={{paddingTop: 155, marginLeft: 10, color: msg.color, fontSize: '120%'}}>
                {msg.message}
            </div>
        </div>
            </>
    )
}
