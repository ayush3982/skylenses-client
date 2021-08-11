import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createSub, removeSub, getSub, updateSub} from '../../../functions/sub'
import {getCategories} from '../../../functions/category'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import LocalSearch from "../../../components/forms/LocalSearch"

const SubUpdate = ({match, history}) => {

    const {user} = useSelector((state) => ({...state}))

    const [name, setName] = useState('');
    const [hexCodeLight, setHexCodeLight] = useState('');
    const [hexCodeDark, setHexCodeDark] = useState('');
    const [tagline, setTagline] = useState('');
    const [parent, setParent] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);


    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    const loadSub = () => getSub(match.params.slug).then(s => {
        setName(s.data.sub.name)
        setHexCodeLight(s.data.sub.hexCodeLight)
        setHexCodeDark(s.data.sub.hexCodeDark)
        setTagline(s.data.sub.tagline)
        setParent(s.data.sub.parent)
    })

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slug, {name, hexCodeLight, hexCodeDark, tagline, parent}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setHexCodeLight('')
            setHexCodeDark('')
            setTagline('')
            toast.success(`${res.data.name} successfully updated`)
            history.push('/admin/sub')
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    
    const subForm = () => (
        <>
        
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => setName(e.target.value)} 
                value={name}
                autoFocus
                required>
            </input>
            <br />
            <label>Color Code Light(Hex Code)</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => setHexCodeLight(e.target.value)} 
                value={hexCodeLight}
                autoFocus
                required>
            </input>
            <label>Color Code Dark(Hex Code)</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => setHexCodeDark(e.target.value)} 
                value={hexCodeDark}
                autoFocus
                required>
            </input>
            <label>Tagline</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => setTagline(e.target.value)} 
                value={tagline}
                autoFocus
                required>
            </input>
            <br />
            <button className="btn btn-outline-primary">Save</button>
        </form>

        </>
    )


    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col-md-8">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update Sub Category</h4>}

                <div className="form-group mt-5 mb-3">
                    <label>Parent Category</label>
                    <select name="category" className="form-control" onChange={e => setParent(e.target.value)}>
                        <option>Select a Parent Category</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option value={c._id} key={c._id} selected = {c._id === parent}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {subForm()}
                <hr />  

            </div>
        </div>
    </div>
    )
}

export default SubUpdate;