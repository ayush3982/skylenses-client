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
    const [hexCode, sethexCode] = useState('');
    const [parent, setParent] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);


    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    const loadSub = () => getSub(match.params.slug).then(s => {
        setName(s.data.name)
        sethexCode(s.data.hexCode)
        setParent(s.data.parent)
    })

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slug, {name, hexCode, parent}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            sethexCode('')
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
            <label>Color Code (Hex Code)</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => sethexCode(e.target.value)} 
                value={hexCode}
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