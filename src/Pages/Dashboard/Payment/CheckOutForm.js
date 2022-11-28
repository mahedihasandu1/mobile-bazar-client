import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ data }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [transaction, setTransaction] = useState('')
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { sell, userEmail, user, _id, productId } = data;
    const navigate = useNavigate()
    // console.log(data);
    useEffect(() => {
        fetch("https://mobile-bazar-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ sell }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [sell]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        // console.log(card);
        if (card == null) {
            return;
        };
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmedError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user,
                        email: userEmail,
                    },
                },
            },
        );
        if (confirmedError) {
            setCardError(confirmedError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess('Congratulation ! your Payment Successful')
            setTransaction(paymentIntent.id)
            // console.log('card info', card);
            const payment = {
                sell,
                transactionId: paymentIntent.id,
                userEmail,
                productId,
                paymentId: _id

            }
            fetch(`https://mobile-bazar-server.vercel.app/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congratulation ! your Payment Successful')
                        toast.success('Congratulation ! your Payment Successful',paymentIntent.id)
                        setTransaction(paymentIntent.id)
                        fetch(`https://mobile-bazar-server.vercel.app/products/${productId}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                   
                                    fetch(`https://mobile-bazar-server.vercel.app/adsProducts?id=${productId}`, {
                                        method: 'DELETE',
                                        headers: {
                                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                                        }
                                    }).then(res => res.json())
                                        .then(() => {
                                          toast.success("Delete successfully")
                                        })
                                }

                            })
                        navigate('/dashboard/orders')

                    }
                    console.log(data)
                })
        }
        setProcessing(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#05081c',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn-sm btn btn-secondary mt-16' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-xl italic text-red-800 mt-2'>{cardError}</p>
            {
                success && <div>
                    <p className='text-2xl text-secondary'>{success}</p>
                    <p className='text-2xl font-bold'>Your Transaction id:{transaction}</p>
                </div>
            }
        </>
    );
};

export default CheckOutForm;