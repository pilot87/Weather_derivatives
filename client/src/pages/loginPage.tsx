import React, {useContext, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Session, setSession} from '../features/auth/authSlice'

interface State {
    auth: Session
}

export const Auth = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const [msg, setMsg] = useState({
        message: '', color: 'gray'
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const a = useSelector((state: State) => state.auth.request)

    const handleLogin = () => {
        a.post('/auth/login', {email: form.email, password: form.password})
            .then((res: any) => {
                dispatch(setSession({email: res.data.email, name: res.data.username,
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
                            value={form.email}
                            onChange={changeHandler}
                        />
                        <label htmlFor='email' className='active' style={{fontSize: '160%'}}>Email</label>
                    </div>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>more_horiz</i>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={changeHandler}
                        />
                        <label htmlFor='password' className='active' style={{fontSize: '160%'}}>Password</label>
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
