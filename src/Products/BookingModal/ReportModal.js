import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const ReportModal = ({ reportItem }) => {
    const { user } = useContext(AuthContext)
    const { model, sell, _id, image, name ,seller,email,time} = reportItem;
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const problem = e.target.problem.value;
        const report = {
            model,
            reportUser: user?.displayName,
            reportEmail: user?.email,
            userPhoto: user?.photoURL,
            problem,
            productId:_id,
            sell,
            name,
            seller,
            email,
            time,
            image,
        }
        fetch('http://localhost:5000/reportItem', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization:`bearer ${localStorage.getItem('accessToken')}`
                
            },
            body: JSON.stringify(report)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged === true) {
                    toast.success('Reported item Success full')
                    navigate('/')
                }
                else {
                    toast.error(`Already Reported `)
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="reported-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box relative my-20">
                    <div className='card-banner'>
                        <img src={image} alt="" />
                    </div>
                    <h3 className="text-lg text-center font-bold my-5">Report For{model}</h3>
                    <label htmlFor="reported-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit} >
                        <input name='problem' type="text" placeholder='Describe Your Problem' className="input mb-5 input-bordered input-secondary w-full " required />
                        <input required type="submit" value="Submit" className='w-full btn btn-primary' />
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ReportModal;