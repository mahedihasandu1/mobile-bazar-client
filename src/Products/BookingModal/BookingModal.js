import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const BookingModal = ({ productData }) => {
    const { user } = useContext(AuthContext)
    const { model, sell, _id, name,image} = productData;
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const userLocation = form.location.value;
        const phone = form.phone.value;
        console.log(user.displayName, user.email, userLocation, phone, sell);
        const bookingData = {
            model,
            productId:_id,
            seller:name,
            image,
            userLocation,
            phone,
            user:user.displayName,
            userEmail:user.email,
            sell
        }
        fetch('https://mobile-bazar-server.vercel.app/bookedProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookingData)
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged === true) {
                    toast.success('Booking Successful')
                    navigate('/dashboard')
                    
                }
                else {
                    toast.error(`This Product Already Booked`)
                }
            })
    }
    return (
        <>
         <input type="checkbox" id="product-booking" className="modal-toggle w-96" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-booking" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg text-center font-bold">Booking For{model}</h3>
                    <form onSubmit={handleSubmit} className='grid gap-3 mt-10'>
                        <input disabled name='name' type="text" readOnly placeholder="Your Name" defaultValue={user.displayName} className="input input-bordered input-secondary  w-full" />
                        <input disabled name='email' type="email" readOnly placeholder="Type Email" defaultValue={user.email} className="input input-bordered input-secondary w-full" />
                        <input disabled name='price' type="text" readOnly placeholder="Product Price" defaultValue={sell} className="input input-bordered input-secondary w-full" />
                        <input name='location' type="text" placeholder="Meting Location" required className="input input-bordered input-secondary w-full" />
                        <input name='phone' type="text" placeholder='Your Phone Number' className="input input-bordered input-secondary w-full " required />
                        <input required type="submit" value="Submit" className='w-full btn btn-primary' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;