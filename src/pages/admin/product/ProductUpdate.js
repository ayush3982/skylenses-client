import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getCategories, getCategorySubs} from '../../../functions/category'
import {getSubs} from '../../../functions/sub'
import {getProduct, updateProduct} from '../../../functions/product'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import {powerData} from '../../../helpers/powers'
import {Select} from 'antd'

const {Option} = Select


const initialState = {
    title: '',
    tagline: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    sub: '',
    shipping: '', 
    quantity: '',
    images: [],
    hexCodeLight: '',
    hexCodeDark: '',
    choosePowers: ["Choose Power","0"],
    choosePower6s: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    choosePowerLefts: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    choosePowerRights: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    packFormats: ["Vial", "Blister"],
    material: '',
    diameter: '',
    choosePower: '',
    choosePower6: '',
    choosePowerLeft: '',
    choosePowerRight: '',
    packFormat: '',
}


const ProductUpdate = ({match, history}) => {

    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories] = useState([])
    const [defaultSub, setDefaultSub] = useState('')
    const [loading, setLoading] = useState(false)

    const {title, tagline, price,  category, subs, sub, shipping, quantity, images, hexCodeDark, hexCodeLight, material, diameter, choosePower, choosePower6, choosePowerLeft, choosePowerRight, packFormat, outOfStock} = values

    const {user} = useSelector((state) => ({...state}))

    const {slug} = match.params;

    const loadProduct = () => {
        getProduct(slug)
        .then(p => {
            setValues({...values, ...p.data})
            getCategorySubs(p.data.category._id)
            .then(res => {
                setSubOptions(res.data)
            })
            const defaultSelected = p.data.sub
            console.log(defaultSelected)
            setDefaultSub(prev => defaultSelected)
            let arr = []
            p.data.outOfStock.map((s) => {
                arr.push(s.Index);
            })
        })
    }


    const loadCategories = () => {
        getCategories().then((c) => {
            console.log("Get categories", c.data)
            setCategories(c.data)
        })
    }

    useEffect(() => {
        loadProduct();
        loadCategories()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateProduct(slug, values, user.token)
        .then(res => {
            setLoading(false)
            toast.success(`${res.data.title} is updated`)
            history.push("/admin/products")
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            // if (err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.err)
        })

    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubChange = (e) => {
        setDefaultSub(e.target.value)
        setValues({...values, sub: e.target.value})
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('Clicked Category', e.target.value)
        setValues({...values, category: e.target.value})
        getCategorySubs(e.target.value)
        .then(res => {
            console.log('sub options', res)
            setSubOptions(res.data)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                        {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h4>Create Product</h4>)}
                        <hr />
                        
                        <div className="p-3">
                            <FileUpload 
                                values={values}
                                setValues={setValues}
                                setLoading={setLoading}
                            />
                        </div> 
                        <form onSubmit={handleSubmit}>
                    
                            <div className="form-group">
                                <label>Category (Months)</label>
                                <select name="category" className="form-control" onChange={handleCategoryChange} value={category._id}>
                                    {categories.length > 0 && categories.map((c) => (
                                        <option value={c._id} key={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                           
                            <div className="form-group">
                                <label>Sub Category</label>
                                <select name="sub" className="form-control" onChange={handleSubChange} value={defaultSub}>
                                    <option>Select Sub Category</option>
                                    {subOptions.length > 0 && subOptions.map((c) => (
                                        <option value={c._id} key={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
            
                
                            <hr />
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    className = "form-control" 
                                    value = {title}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tagline</label>
                                <input 
                                    type="text" 
                                    name="tagline" 
                                    className = "form-control" 
                                    value = {tagline}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    className = "form-control" 
                                    value = {price}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    className = "form-control" 
                                    value = {quantity}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Hex Code Dark</label>
                                <input 
                                    type="text" 
                                    name="hexCodeDark" 
                                    className = "form-control" 
                                    value = {hexCodeDark}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Hex Code Light</label>
                                <input 
                                    type="text" 
                                    name="hexCodeLight" 
                                    className = "form-control" 
                                    value = {hexCodeLight}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Material</label>
                                <input 
                                    type="text" 
                                    name="material" 
                                    className = "form-control" 
                                    value = {material}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Diameter</label>
                                <input 
                                    type="text" 
                                    name="diameter" 
                                    className = "form-control" 
                                    value = {diameter}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Pack Format</label>
                                <select
                                    value = {packFormat === 'Vial' ? 'Vial' : 'Blister'}
                                    name = "packFormat"
                                    className = "form-control"
                                    onChange = {handleChange}
                                >
                                    {values.packFormats.map(c => 
                                        <option key = {c} value = {c}>
                                            {c}
                                        </option>)}
                                </select>

                            </div>
                            {/* <hr className="mt-5"></hr>
                            <h4 className = "text-danger">Make sure the following are set to "Default"</h4>
                            <hr />
                            <div className="form-group">
                                <label>Choose Power</label>
                                <select
                                    value = {choosePower}
                                    name = "choosePower"
                                    className = "form-control"
                                    onChange = {handleChange}
                                >
                                    {values.choosePowers.map(c => 
                                        <option key = {c} value = {c}>
                                            {c}
                                        </option>)}
                                </select>

                            </div>
                            <div className="form-group">
                                <label>Choose Power 6 Months</label>
                                <select
                                    value = {choosePower6}
                                    name = "choosePower6"
                                    className = "form-control"
                                    onChange = {handleChange}
                                >
                                    {values.choosePower6s.map(c => 
                                        <option key = {c} value = {c}>
                                            {c}
                                        </option>)}
                                </select>

                            </div>
                            <div className="form-group">
                                <label>Choose Power 6 Month Left</label>
                                <select
                                    value = {choosePowerLeft}
                                    name = "choosePowerLeft"
                                    className = "form-control"
                                    onChange = {handleChange}
                                >
                                    {values.choosePowerLefts.map(c => 
                                        <option key = {c} value = {c}>
                                            {c}
                                        </option>)}
                                </select>

                            </div>
                            <div className="form-group">
                                <label>Choose Power 6 Month Right</label>
                                <select
                                    value = {choosePowerRight}
                                    name = "choosePowerRight"
                                    className = "form-control"
                                    onChange = {handleChange}
                                >
                                    {values.choosePowerRights.map(c => 
                                        <option key = {c} value = {c}>
                                            {c}
                                        </option>)}
                                </select>

                            </div> */}
                            <div>
                                <label>Choose Out Of Stock</label>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    value={outOfStock}
                                    onChange={(value) => setValues({ ...values, outOfStock: value })}
                                >
                                    {powerData.length &&
                                    powerData.map((s) => (
                                        <Option value={s.Power} key={s.Index}>
                                        {s.Power}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <button className="btn btn-outline-info mt-3">Save</button>
                        </form> 
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate