import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory, getCategories, removeCategory} from '../../../functions/category'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import LocalSearch from "../../../components/forms/LocalSearch"

const CategoryCreate = () => {

    const {user} = useSelector((state) => ({...state}))

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [hexCodeLight, setHexCodeLight] = useState('');
    const [hexCodeDark, setHexCodeDark] = useState('');
    const [tagline, setTagline] = useState('');
    const [loading, setLoading] = useState(false) 
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('')

    const loadCategories = () => getCategories().then(c => setCategories(c.data))

    useEffect(() => {
        loadCategories();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        createCategory({name, image, hexCodeLight, hexCodeDark, tagline,}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setImage('')
            setHexCodeLight('')
            setHexCodeDark('')
            setTagline('')
            toast.success(`${res.data.name} successfully created`)
            loadCategories()
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Delete?");
        // console.log(answer, slug);
        if (window.confirm("Delete?")) {
          setLoading(true);
          removeCategory(slug, user.token)
            .then((res) => {
              setLoading(false);
              toast.error(`${res.data.name} deleted`);
              loadCategories();
            })
            .catch((err) => {
                console.log(err)
              if (err.response.status === 400) {
                setLoading(false);
                toast.error(err.response.data);
              }
            });
        }
    };

    

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
    
    const categoryForm = () => (
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

        </>
    )


    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col-md-8">
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Category</h4>}
                {categoryForm()}
                <hr />  

                <LocalSearch keyword={keyword} setKeyword = {setKeyword}/>

                <h4>Categories</h4>
                <hr />
                {categories.filter(searched(keyword)).map((c) => (
                    <div className="alert alert-secondary" style={{color: c.hexCodeDark}}>
                        {c.name}
                        <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right">
                            <DeleteOutlined className="text-danger"/>
                        </span>
                        <Link to={`/admin/category/${c.slug}`}>
                            <span className="btn btn-sm float-right">
                                <EditOutlined className="text-success"/>
                            </span>
                        </Link>
                    </div>
                ))}
                <hr />
            </div>
        </div>
    </div>
    )
}

export default CategoryCreate;