import React, {useContext, useEffect, useState} from 'react'
import {Session} from '../features/auth/authSlice'
import {useSelector} from 'react-redux';

interface State {
    auth: Session
}

export const AddUser = () => {

    const [form, setForm] = useState({
        email: '', password: '', username: ''
    })

    const [msg, setMsg] = useState({
        message: '', color: 'gray', errors: {'email': '', 'password': '', 'username': ''}
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const a = useSelector((state: State) => state.auth.request)

    const handleRegister = async() => {
        const parseErrors = (err: any) => {
            const record = {'email': '', 'password': '', 'username': ''}
            const email = err.find((e: any) => e.param === 'email')
            if (email) record.email = email.msg
            const username = err.find((e: any) => e.param === 'username')
            if (username) record.username = username.msg
            const password = err.find((e: any) => e.param === 'password')
            if (password) record.password = password.msg
            return record
        }
        a.post('/auth/register', {email: form.email, username: form.username, password: form.password})
            .then((res: any) => {
                setMsg(
                    {message: res.data.message, color: '#66bb6a',
                        errors: {'email': '', 'password': '', 'username': ''}}
                )
                window.location.replace('login')
            })
            .catch((err: any) => setMsg(
                {message: (err.response.data != null) ? err.response.data.message : err.data.message, color: '#ef5350',
                    errors: (!!err.response && !!err.response.data.errors) ? parseErrors(err.response.data.errors) : {'email': '', 'password': '', 'username': ''}}
            ))
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="breadcrumb">Home</a>
                        <a className="breadcrumb">Register</a>
                    </div>
                </div>
            </nav>
            <form action='../.html' className='col autocomplete-content s12'>
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
                    <div className='row' style={{color: '#ef5350', fontSize: '115%'}}>
                        {msg.errors.email}
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>border_color</i>
                        <input
                            id='username'
                            name='username'
                            type='text'
                            value={form.username}
                            onChange={changeHandler}
                        />
                        <label htmlFor='username' className='active' style={{fontSize: '160%'}}>User name</label>
                    </div>
                    <div className='row' style={{color: '#ef5350', fontSize: '115%'}}>
                        {msg.errors.username}
                    </div>
                </div>
                <div className='row'>
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
                    <div className='row' style={{color: '#ef5350', fontSize: '115%'}}>
                        {msg.errors.password}
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn green lighten-2 black-text'
                    style={{float: 'left', marginLeft: 10}}
                    onClick={handleRegister}
                >
                    Register new User
                </button>
            </div>
            <br/>
            <div className='alert' style={{marginTop: 30, marginLeft: 10, color: msg.color, fontSize: '120%'}}>
                {msg.message}
            </div>
        </>
    )
}
