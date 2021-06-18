import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createSub, getSubs, removeSub, getSub} from '../../../functions/sub'
import {getCategories} from '../../../functions/category'
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import LocalSearch from "../../../components/forms/LocalSearch"

const SubCreate = () => {

    const {user} = useSelector((state) => ({...state}))

    const [name, setName] = useState('');
    const [hexCode, sethexCode] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('')

    const loadCategories = () => getCategories().then(c => setCategories(c.data))
    const loadSubs = () => getSubs().then(s => setSubs(s.data))

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true)
        createSub({name, hexCode, parent: category}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            sethexCode('')
            toast.success(`${res.data.name} successfully created`)
            loadSubs();
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
          removeSub(slug, user.token)
            .then((res) => {
              setLoading(false);
              toast.error(`${res.data.name} deleted`);
              loadSubs();
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
                {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create Sub Category</h4>}

                <div className="form-group mt-5 mb-3">
                    <label>Parent Category</label>
                    <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                        <option>Select a Parent Category</option>
                        {categories.length > 0 && categories.map((c) => (
                            <option value={c._id} key={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {subForm()}
                <hr />  

                <LocalSearch keyword={keyword} setKeyword = {setKeyword}/>

                <h4>Sub Categories</h4>
                <hr />
                {subs.filter(searched(keyword)).map((s) => (
                    <div className="alert alert-secondary" key={s._id} style={{color: s.hexCode}}>
                        {s.name}
                        <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                            <DeleteOutlined className="text-danger"/>
                        </span>
                        <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;