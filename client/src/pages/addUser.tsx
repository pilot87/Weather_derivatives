import React, {useState} from 'react'

const axios = require('axios').default

export const AddUser = ({auth, baseUrl}: any): any => {

    const [form, setForm] = useState({
        email: {msg: '', state: 'adduser_label'}, password: {msg: '', state: 'adduser_label'},
        username: {msg: '', state: 'adduser_label'}
    })

    const [msg, setMsg] = useState({
        message: '', color: 'gray', errors: {'email': '', 'password': '', 'username': ''}
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: 'adduser_label active'}})
    }

    const focusHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: {msg: event.target.value, state: 'adduser_label active'}})
    }

    const blurHandler = (event: any) => {
        if (event.target.value === '') {
            setForm({ ...form, [event.target.name]: {msg: event.target.value, state: 'adduser_label'}})
        }
    }

    const a = axios.create(auth.request_params)

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
        a.post('/auth/register', {email: form.email.msg, username: form.username.msg,
            password: form.password.msg})
            .then((res: any) => {
                setMsg(
                    {message: res.data.message, color: 'green',
                        errors: {'email': '', 'password': '', 'username': ''}}
                )
                window.location.replace('login')
            })
            .catch((err: any) => setMsg(
                {message: (err.response.data != null) ? err.response.data.message : err.data.message, color: 'red',
                    errors: (!!err.response && !!err.response.data.errors) ? parseErrors(err.response.data.errors) :
                        {'email': '', 'password': '', 'username': ''}}
            ))
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="" className="breadcrumb">Home</a>
                        <a href="register" className="breadcrumb">Register</a>
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
                            value={form.email.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='email' className={form.email.state}>Email</label>
                    </div>
                    <div className='row adduser_error'>
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
                            value={form.username.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='username' className={form.username.state}>User name</label>
                    </div>
                    <div className='row adduser_error'>
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
                            value={form.password.msg}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                        />
                        <label htmlFor='password' className={form.password.state}>Password</label>
                    </div>
                    <div className='row adduser_error'>
                        {msg.errors.password}
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn adduser_btn green lighten-2 black-text'
                    onClick={handleRegister}
                >
                    Register new User
                </button>
            </div>
            <br/>
            <div className={'alert adduser_alert ' + msg.color + '-text text-lighten-1'}>
                {msg.message}
            </div>
        </>
    )
}
