'use client'
import { useEffect, useState } from "react";
import fetchGetPost from "@/lib/postAction.js";

import dayjs from 'dayjs';
import 'dayjs/locale/id';

import { MdOutlineKeyboardArrowRight as RightArrow } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight as  DoubleRightArrow} from "react-icons/md";
import { MdOutlineKeyboardArrowLeft as LeftArrow } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft as DoubleLeftArrow } from "react-icons/md";

import Image from "next/image";

export default function postIdeas() {
    dayjs.locale('id');

    const [metaPage, setMetaPage] = useState([])
    const [post, setPost] = useState([]);
    const [sortSelectedValue, setSortSelectedValue] = useState('newest');
    const [pageSizeSelectedValue, setPageSizeSelectedValue] = useState('10');

    useEffect(() => {
        async function loadPost() {
            const res = await fetchGetPost(1, pageSizeSelectedValue, sortSelectedValue);
            // console.log('API response = ', res.data);
            setPost(res.data);
            setMetaPage(res.meta);
        }

        loadPost();
    }, [pageSizeSelectedValue, sortSelectedValue]);

    const dataDummy = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        image: `https://picsum.photos/300/200?random=${i}`,
        date: "July 12, 2025",
        title: `Sudah tahu atau tahu belum, tunggu kehadirannya. Film Terbaru XXI`,
    }));

    // Card Component
    const Card = ({ image, date, title }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <Image src={image} width={300} height={300} alt={title} className="w-full h-48 object-cover"/>
        <div className="p-4">
        <p className="text-sm text-gray-400 font-semibold">{date}</p>
        <h3 className="text-lg line-clamp-3 font-semibold text-gray-800 capitalize">{title}</h3>
        </div>
    </div>
    );
    
    console.log(pageSizeSelectedValue);
    console.log(sortSelectedValue);
    

    return(
        <section className="my-15 px-10 md:px-40 sm:px-15">
          {/* sort and page number */}
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex place-content-between items-center">
                <div>{`showing ${metaPage.from} - ${metaPage.to} of ${metaPage.total}`}</div>
                <div className="flex place-content-between w-90">
                <div>
                    <span className='mr-2'>show page :</span>
                    <select onChange={(event)=>{setPageSizeSelectedValue(event.target.value)}} value={pageSizeSelectedValue} className='border-1 rounded-full px-3 py-2 border-gray-400 text-sm'>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    <span className='mr-2'>sort by :</span>
                    <select onChange={(event)=>{setSortSelectedValue(event.target.value)}} value={sortSelectedValue} className='border-1 rounded-full px-3 py-2 border-gray-400'>
                        <option value={'newest'}>Newest</option>
                        <option value={'oldest'}>Oldest</option>
                    </select>
                </div>
                </div>
            </div>
          </div>

          {/* post card */}
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-4 sm:grid-cols-2">
                {post.map((item) => (
                    <Card
                    key={item.id}
                    image={`https://picsum.photos/300/200?random=${item.id}`}
                    date={dayjs(item.published_at).format('D MMMM YYYY')}
                    title={item.title}
                    />
                ))}
            </div>
          </div>

          {/* button navigation page */}
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="py-10">
                   <div className="flex items-center justify-center gap-1 text-sm">
                {/* First Page */}
                <button className="text-gray-400 cursor-not-allowed" disabled>
                    <DoubleLeftArrow/>
                </button>
                {/* Previous */}
                <button className="text-gray-400 cursor-not-allowed" disabled>
                    <LeftArrow/>
                </button>

                {/* Page Numbers */}
                {[1, 2, 3, 4].map((num) => (
                    <button
                    key={num}
                    className={`w-8 h-8 rounded flex items-center justify-center  cursor-pointer
                        ${num === 1 ? 'bg-[#f7611c] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                    {num}
                    </button>
                ))}

                {/* Next */}
                <button className="text-gray-700 hover:text-black cursor-pointer">
                    <RightArrow/>
                </button>
                {/* Last Page */}
                <button className="text-gray-700 hover:text-black cursor-pointer">
                    <DoubleRightArrow/>
                </button>
                </div>
            </div>
          </div>
        </section>
    )
}