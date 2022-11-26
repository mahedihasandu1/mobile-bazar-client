import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    const { data: categories = [],refetch,isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category`)
            const data = res.json()
            return data
        }
    });

    const handleAddProduct = (data) => {

        console.log(data);
        const time=new Date().toLocaleDateString()
        const image = data.productImg[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${'ee28b692a1eb777531ab826a6ef8cd93'}`
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
            .then(imgData => {
                // console.log(imgData)
                if (imgData.success) {
                    const product = {
                        name:user.displayName,
                        email: user?.email,
                        seller:user?.photoURL,
                        image: imgData.data.url,
                        model: data.productModel,
                        categoryId: data.category,
                        phone:data.phone,
                        location:data.address,
                        buy:parseFloat(data.buyPrice),
                        sell:parseFloat(data.sellPrice),
                        useYear:data.useYear,
                        time
                    }
                    fetch(`http://localhost:5000/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization:`bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    }).then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success('Product Add Successfully' )
                                navigate('/dashboard/user/products')
                                
                            }
                        })
                }
            })

    }
   
    return (
        <div className=' shadow-lg p-2  md:mx-auto mt-20'>
            <div className=' p-5 shadow-lg rounded-lg' >
                <h1 className='text-xl text-center'>Add A Product </h1>
                <form className='grid sm:grid-cols-1 md:grid-cols-2 mx-auto' onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input value={user?.displayName} readOnly type="text" {...register("name")} className="input input-bordered w-full max-w-xs" />
                        {errors.name &&
                            <p className='text-red-600' >{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input value={user?.email} readOnly type="text" {...register("email")} className="input input-bordered w-full max-w-xs" />
                        {errors.email &&
                            <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Product Name/Model</span>
                        </label>
                        <input type="text" {...register("productModel", { required: "Please enter Phone model" })} className="input input-bordered w-full max-w-xs" />
                        {errors.productModel &&
                            <p className='text-red-600' >{errors.productModel?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Product Photo</span>
                        </label>
                        <input type="file" {...register("productImg", { required: "Please Select Photo" })} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                        {errors.productImg &&
                            <p className='text-red-600' >{errors.productImg?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select defaultValue={'Apple'} {...register("category", { required: "Please Select Category" })} className="select select-accent w-full max-w-xs">

                            {
                                categories.map(category => <option defaultValue={category._id}  key={category._id}  value={category._id}>{category.category}</option>)
                            }
                            
                        </select>
                        {errors.category &&
                            <p className='text-red-600' >{errors.category?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="text" {...register("phone", { required:"Your Phone Number" })} className="input input-bordered w-full max-w-xs" />
                        {errors.phone &&
                            <p className='text-red-600' >{errors.phone?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text" {...register("address", { required: "Enter Your City" })} className="input input-bordered w-full max-w-xs" />
                        {errors.address &&
                            <p className='text-red-600' >{errors.address?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Buying Price</span>
                        </label>
                        <input type="text" {...register("buyPrice", { required: "tell Buying Price" })} className="input input-bordered w-full max-w-xs" />
                        {errors.buyPrice &&
                            <p className='text-red-600' >{errors.buyPrice?.message}</p>}
                    </div>
                   
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Selling Price</span>
                        </label>
                        <input type="text" {...register("sellPrice", { required: "Please Provide selling price" })} className="input input-bordered w-full max-w-xs" />
                        {errors.sellPrice &&
                            <p className='text-red-600' >{errors.sellPrice?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Year Of Use</span>
                        </label>
                        <input type="text" {...register("useYear", { required: "Please tell How Much used" })} className="input input-bordered w-full max-w-xs" />
                        {errors.useYear &&
                            <p className='text-red-600' >{errors.useYear?.message}</p>}
                    </div>
                     <div className='flex justify-center items-center'>
                     <input  className='btn btn-accent w-full my-2' value={"Add Product"} type="submit" />
                     </div>
                </form>
               
            </div>
        </div>
    );
};

export default AddProduct;