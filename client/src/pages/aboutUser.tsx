import React, {useState} from 'react'
import {Session, rename, setSession} from '../features/auth/authSlice'
import {useSelector} from 'react-redux'
import {store} from '../app/store'

const axios = require('axios').default


interface State {
    auth: Session
}

export const About = () => {

    const [form, setForm] = useState(
        {username: {msg: '', state: ''}, password: {msg: '', state: ''}
        })

    const [msg, setMsg] = useState({
        message: '', color: 'gray'
    })

    const [msg2, setMsg2] = useState({
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

    const handleRename = () => {
        a.post('/profile/rename', { username: form.username.msg })
            .then((res: any) => {
                store.dispatch(rename(res.data.username))
                setMsg({message: 'Welcome, ' + res.data.username + '!', color: '#66bb6a'})
            })
            .catch((err: any) => setMsg(
                {message: err.response.data.message, color: '#ef5350'}
            ))
    }

    const handlePassword = () => {
        a.post('/profile/chpasswd', { password: form.password.msg })
            .then((res: any) => {
                setMsg2({message: 'Password has changed', color: '#66bb6a'})
            })
            .catch((err: any) => setMsg2(
                {message: err.response.data.message, color: '#ef5350'}
            ))
    }

    const handleLogout = () => {
        store.dispatch(setSession({ email: '', name: '', token: '' }))
        window.location.replace('login')
    }

    return(
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="breadcrumb">Home</a>
                        <a className="breadcrumb">About</a>
                    </div>
                </div>
            </nav>
        <div className='row' style={{marginTop: 25}}>
            <div className='row'>
                <div className='collection' style={{fontSize: '120%'}}>
                    <p className='collection-item black-text'>
                        {'Email:    ' + useSelector((state: State) => state.auth.email)}</p>
                    <p className='collection-item black-text'>
                        {'Username: ' + useSelector((state: State) => state.auth.name)}</p>
                </div>
            </div>
            <form className='col s12'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>border_color</i>
                        <input
                            id='username'
                            name='username'
                            type='text'
                            value={form.username.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='username' className={form.username.state} style={{fontSize: '160%'}}>New username</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn green lighten-2 black-text'
                    style={{float: 'left', marginLeft: 10}}
                    onClick={handleRename}
                >
                    Change username
                </button>
            </div>
            <div className='alert' style={{paddingTop: 155, marginLeft: 10, color: msg.color, fontSize: '120%'}}>
                {msg.message}
            </div>
            <form className='col s12'>
                <div className='row'>
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
                        <label htmlFor='password' className={form.password.state} style={{fontSize: '160%'}}>New password</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn green lighten-2 black-text'
                    style={{float: 'left', marginLeft: 10}}
                    onClick={handlePassword}
                >
                    Change password
                </button>
            </div>
            <div className='alert' style={{paddingTop: 155, marginLeft: 10, color: msg2.color, fontSize: '120%'}}>
                {msg2.message}
            </div>
            <div className='card-action' style={{marginTop: 10}}>
                <button
                    className='btn green lighten-2 black-text'
                    style={{float: 'left', marginLeft: 10}}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
            </>
    )
}
