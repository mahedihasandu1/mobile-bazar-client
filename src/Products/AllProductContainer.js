import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Pages/Loading/Loading';
import AllProducts from './AllProducts';
import BookingModal from './BookingModal/BookingModal';
import ReportModal from './BookingModal/ReportModal';

const AllProductContainer = () => {
    const [productData, setProductData] = useState(null)
    const [reportItem, setReportItem] = useState(null)
    const singleData = useLoaderData();
    const { _id } = singleData;
    // console.log(_id);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://mobile-bazar-server.vercel.app/products/?id=${_id}`)
            const data = res.json()
            return data
        }

    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <div>
                <div className='mb-10 md:w-[80%] mx-auto'>
                    <h2 className='text-center text-2xl font-bold my-10 '>Available Device </h2>
                    <div className='grid grid-cols-1  gap-10' >
                        {
                            products.map(product => <AllProducts key={product._id}
                                product={product}
                                setProductData={setProductData}
                                setReportItem={setReportItem}
                            ></AllProducts>)
                        }
                    </div>
                </div>
            </div>
            {
                productData &&
                <BookingModal
                    productData={productData}
                    setProductData={setProductData}
                    refetch={refetch}
                >
                </BookingModal>
            },
            {
                reportItem &&
                <ReportModal
                reportItem={reportItem}
                setReportItem={ setReportItem}
                >
                </ReportModal>
            }

        </section>

    );
};

export default AllProductContainer;