import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const ReportedItems = () => {
    const { data: items = [], refetch, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reportItem')
            const data = res.json();
            return data;
        }
    })
    const handleDeleteProduct = (item) => {

        const proceed = window.confirm('This Product Will Permanently Delete')
        if (proceed) {
            fetch(`http://localhost:5000/reportItem?id=${item._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        fetch(`http://localhost:5000/adsProducts?id=${item.productId}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }

                        }).then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {

                                }
                        fetch(`http://localhost:5000/products/${item.productId}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                            .then(res => res.json())
                            .then(() => {
                                toast.success("Delete successfully")
                                refetch()
                            })
                            })
                    }
                })
        }

    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto w-full">
            <h2 className='text-3xl text-center my-10 fon text-error'>Reported Product</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Product</th>
                        <th>Problem</th>
                        <th>Seller</th>
                        <th>Reporter</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0 &&
                        items.map((item, i) =>
                            <tr key={item._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{item.model}</div>
                                            <p className='text-xm opacity-60'>Publish Date:{item.time}</p>
                                            <p className='text-xm '>Selling Price:$ {item.sell}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-xm font-bold">{item.problem}</div>
                                </td>

                                <th>
                                    <div className="flex items-center ">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-10">
                                                <img src={item.seller} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Seller Name{item.name}</p>
                                            <div className=" text-sm">{item.email}</div>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-8 h-8">
                                                <img src={item.userPhoto} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Retorted user {item.reportUser}</p>
                                            <div className="text-sm">{item.reportEmail}</div>
                                        </div>
                                    </div>
                                </th>
                                <td><button onClick={() => handleDeleteProduct(item)} className='btn btn-xs btn-secondary '>Delete Product</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ReportedItems;