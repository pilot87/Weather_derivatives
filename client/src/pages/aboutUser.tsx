import React, {useState} from 'react'
import {Session, rename, setSession} from '../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'


interface State {
    auth: Session
}

export const About = () => {
    const dispatch = useDispatch()

    const [form, setForm] = useState(
        {username: '', password: ''
        })

    const [msg, setMsg] = useState({
        message: '', color: 'gray'
    })

    const [msg2, setMsg2] = useState({
        message: '', color: 'gray'
    })

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const a = useSelector((state: State) => state.auth.request)

    const handleRename = () => {
        a.post('/profile/rename', { username: form.username })
            .then((res: any) => {
                dispatch(rename(res.data.username))
                setMsg({message: 'Welcome, ' + res.data.username + '!', color: '#66bb6a'})
            })
            .catch((err: any) => setMsg(
                {message: err.response.data.message, color: '#ef5350'}
            ))
    }

    const handlePassword = () => {
        a.post('/profile/chpasswd', { password: form.password })
            .then((res: any) => {
                setMsg2({message: 'Password has changed', color: '#66bb6a'})
            })
            .catch((err: any) => setMsg2(
                {message: err.response.data.message, color: '#ef5350'}
            ))
    }

    const handleLogout = () => {
        dispatch(setSession({ email: '', name: '', token: '' }))
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
                    <a className='collection-item black-text'>
                        {'Email:    ' + useSelector((state: State) => state.auth.email)}</a>
                    <a className='collection-item black-text'>
                        {'Username: ' + useSelector((state: State) => state.auth.name)}</a>
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
                            value={form.username}
                            onChange={changeHandler}
                        />
                        <label htmlFor='email' className='active' style={{fontSize: '160%'}}>New username</label>
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
                            value={form.password}
                            onChange={changeHandler}
                        />
                        <label htmlFor='email' className='active' style={{fontSize: '160%'}}>New password</label>
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
