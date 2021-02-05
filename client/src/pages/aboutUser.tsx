import React, {useState} from 'react'

const axios = require('axios').default

export const About = ({auth, rename, setSession}: any): any => {

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

    const handleRename = () => {
        a.post('./profile/rename', { username: form.username.msg })
            .then((res: any) => {
                rename(res.data.username)
                setMsg({message: 'Welcome, ' + res.data.username + '!', color: 'green'})
            })
            .catch((err: any) => setMsg(
                {message: err.response.data.message, color: 'red'}
            ))
    }

    const handlePassword = () => {
        a.post('./profile/chpasswd', { password: form.password.msg })
            .then((res: any) => {
                setMsg2({message: 'Password has changed', color: 'green'})
            })
            .catch((err: any) => setMsg2(
                {message: err.response.data.message, color: 'red'}
            ))
    }

    const handleLogout = () => {
        setSession({ email: '', name: '', token: '' })
        window.location.replace('./login')
    }

    return(
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="./" className="breadcrumb">Home</a>
                        <a href="./about" className="breadcrumb">About</a>
                    </div>
                </div>
            </nav>
        <div className='row about_container'>
            <div className='row'>
                <div className='collection about_internal_container'>
                    <p className='collection-item black-text'>
                        {'Email:    ' + auth.email}</p>
                    <p className='collection-item black-text'>
                        {'Username: ' + auth.name}</p>
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
                        <label htmlFor='username' className={'username' + form.username.state} >New username</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn about_btn green lighten-2 black-text'
                    onClick={handleRename}
                >
                    Change username
                </button>
            </div>
            <div className={'alert ' + msg.color + '-text text-lighten-1'}>
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
                        <label htmlFor='password' className={'password' + form.password.state}>New password</label>
                    </div>
                </div>
            </form>
            <div className='card-action'>
                <button
                    className='btn about_btn green lighten-2 black-text'
                    onClick={handlePassword}
                >
                    Change password
                </button>
            </div>
            <div className={'alert ' + msg2.color + '-text text-lighten-1'}>
                {msg2.message}
            </div>
            <div className='card-action about_card_btn'>
                <button
                    className='btn about_btn green lighten-2 black-text'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
            </>
    )
}
