import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Loading/Loading';

const Advertisement = () => {
    const { data: adds = [],isLoading } = useQuery({
        queryKey: ['adds'],
        queryFn: async () => {
            const res = await fetch('https://mobile-bazar-server-mahedihasandu1.vercel.app/adsProducts')
            const data = res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-10'> 
            <h2 className='text-center text-3xl font-semibold my-5 text-lime-700'>Advertisement </h2>
            {
               adds.length===0 && <>
               <h2 className='text-2xl text-center text-sky-800 font-semibold'>No Advertisement Running </h2>
               </>
            }
            
             <div  className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> 
             { adds.length >0 &&
                adds.map(ads=><div key={ads._id} className="card w-96 bg-base-100 shadow-xl">
                <figure className='card-banner'><img className=' rounded' src={ads.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                       {ads.model}
                        <div className="badge badge-secondary"> ${ads.sell}</div>
                    </h2>
                    <p className='text-sm  opacity-40'>if you want this call Now {ads.phone}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Publish Date {ads.time}</div>
                        <div className="badge badge-outline">Condition: {ads.condition}</div>
                    </div>
                </div>
            </div>)
            }
             </div>
            
        </div>
    );
};

export default Advertisement;