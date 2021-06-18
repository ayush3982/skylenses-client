import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory, getCategory, updateCategory} from '../../../functions/category'

const CategoryUpdate = ({history, match}) => {

    const {user} = useSelector((state) => ({...state}))

    const [name, setName] = useState('');
    const [hexCode, sethexCode] = useState('');
    const [loading, setLoading] = useState(false)

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => {
            setName(c.data.name)
            sethexCode(c.data.hexCode)
        })
    }

    useEffect(() => {
        loadCategory();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateCategory(match.params.slug, {name, hexCode}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            sethexCode('')
            toast.success(`${res.data.name} is successfully updated`)
            history.push('/admin/category')
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    

    const categoryForm = () => (
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
    )

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col-md-8">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update Category</h4>}
                {categoryForm()}
                <hr />
            </div>
        </div>
    </div>
    )
}

export default CategoryUpdate;