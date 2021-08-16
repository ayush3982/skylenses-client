import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory, getCategory, updateCategory} from '../../../functions/category'

const CategoryUpdate = ({history, match}) => {

    const {user} = useSelector((state) => ({...state}))

    const [name, setName] = useState('');
    const [image, setImage] = useState('')
    const [hexCodeLight, setHexCodeLight] = useState('');
    const [hexCodeDark, setHexCodeDark] = useState('');
    const [tagline, setTagline] = useState('');
    const [loading, setLoading] = useState(false)  

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => {
            setName(c.data.category.name)
            setImage(c.data.category.image)
            setHexCodeLight(c.data.category.hexCodeLight)
            setHexCodeDark(c.data.category.hexCodeDark)
            setTagline(c.data.category.tagline)
        })
    }

    useEffect(() => {
        loadCategory();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        updateCategory(match.params.slug, {name, image, hexCodeLight, hexCodeDark, tagline}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setImage('')
            setHexCodeLight('')
            setHexCodeDark('')
            setTagline('')
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
            <label>Image</label>
            <input type="text" 
                className="form-control" 
                onChange = {e => setImage(e.target.value)} 
                value={image}
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