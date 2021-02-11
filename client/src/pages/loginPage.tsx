import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'


const axios = require('axios').default

export const Login = ({auth, setSession, baseUrl}: any): any => {

    console.log(auth)

    const [form, setForm] = useState({
        email: {msg: '', state: ''}, password: {msg: '', state: ''}
    })

    const [msg, setMsg] = useState({
        message: '', color: 'gray'
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: ' active'}})
    }

    const focusHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: ' active'}})
    }

    const blurHandler = (event: any) => {
        if (event.target.value === '') {
            setForm({ ...form, [event.target.name]: {msg: event.target.value, state: ''}})
        }
    }

    const a = axios.create(auth.request_params)

    const handleLogin = () => {
        a.post('/auth/login', {email: form.email.msg, password: form.password.msg})
            .then((res: any) => {
                setSession({email: res.data.email, name: res.data.username,
                    token: res.data.token})
                setMsg({message: 'Welcome, ' + res.data.username + '!', color: 'green'})
                window.location.assign('about')
            })
            .catch((err: any) => setMsg(
                {message: (err.response.data) ? err.response.data.message : err.data.message, color: 'red'}
            ))
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <NavLink to="/" className="breadcrumb">Home</NavLink>
                        <NavLink to="/login" className="breadcrumb">Login</NavLink>
                    </div>
                </div>
            </nav>
        <div className='row login_cont'>
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
                        <label htmlFor='email' className={'email' + form.email.state}>Email</label>
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
                        <label htmlFor='password' className={'password' + form.password.state}>Password</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn login_btn green lighten-2 black-text'
                    onClick={handleLogin}
                >
                    Login
                </button>
                <NavLink
                    className='btn register_btn grey lighten-1 black-text'
                    to='/register'
                >
                    Register new User
                </NavLink>
            </div>
            <div className={'alert login_alert ' + msg.color + '-text text-lighten-1'}>
                {msg.message}
            </div>
        </div>
            </>
    )
}
