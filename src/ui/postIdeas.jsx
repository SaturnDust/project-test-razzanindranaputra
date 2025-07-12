'use client'
import { useEffect, useState } from "react";
import fetchGetPost from "@/lib/postAction.js";
import { useRouter, useSearchParams } from "next/navigation";

import dayjs from 'dayjs';
import 'dayjs/locale/id';

import { MdOutlineKeyboardArrowRight as RightArrow } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight as DoubleRightArrow } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft as LeftArrow } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft as DoubleLeftArrow } from "react-icons/md";

import CardPost from "@/ui/CardPost.jsx";

export default function postIdeas() {
    dayjs.locale('id');

    const [metaPage, setMetaPage] = useState([]);
    const [post, setPost] = useState([]);
    // const [sortSelectedValue, setSortSelectedValue] = useState('newest');
    // const [pageSizeSelectedValue, setPageSizeSelectedValue] = useState('10');

    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const sort = searchParams.get('sort') || 'newest';

    useEffect(() => {
        if (!searchParams.get('page') || !searchParams.get('pageSize') || !searchParams.get('sort')) {
            const defaultParams = new URLSearchParams();
            defaultParams.set('page', '1');
            defaultParams.set('pageSize', '10');
            defaultParams.set('sort', 'newest');
            router.replace(`/?${defaultParams.toString()}`);
        }
    }, []);

    //fetch Post
    useEffect(() => {
        async function loadPost() {
            const res = await fetchGetPost(page, pageSize, sort);
            // console.log('API response = ', res.data);
            if (res.meta === null || res.data === undefined) {
                notFound();
            }

            setPost(res.data);
            setMetaPage(res.meta);
        }

        loadPost();
    }, [page, pageSize, sort]);

    // const dataDummy = Array.from({ length: 10 }).map((_, i) => ({
    //     id: i,
    //     image: `https://picsum.photos/300/200?random=${i}`,
    //     date: "July 12, 2025",
    //     title: `Sudah tahu atau tahu belum, tunggu kehadirannya. Film Terbaru XXI`,
    // }));

    // Update URL param

    function updateQueryParam(key, value) {
        const newParam = new URLSearchParams(searchParams.toString());
        newParam.set(key, value);

        if (key !== 'page') {
            newParam.set('page', '1');
        }

        router.replace(`/?${newParam.toString()}`);
    }

    //Page logic
    const currentPage = Number(page);
    const totalPages = Math.ceil(metaPage.total / pageSize);

    const pageNumberList = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pageNumberList.push(i);
    }

    console.log(pageNumberList);
    
    function goToPage(number){
        updateQueryParam('page', number);
    }
    
    return (
        <section className="my-15 px-10 md:px-40 sm:px-15">
            {/* sort and page number */}
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex place-content-between items-center">
                    <div>
                    {metaPage?.total
                        ? `showing ${metaPage.from} - ${metaPage.to} of ${metaPage.total}`
                        : ""}
                    </div>

                    <div className="flex place-content-between w-90">
                        <div>
                            <span className='mr-2'>show page :</span>
                            <select onChange={(event) => { updateQueryParam('pageSize', event.target.value) }} value={pageSize} className='border-1 rounded-full px-3 py-2 border-gray-400 text-sm'>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <div>
                            <span className='mr-2'>sort by :</span>
                            <select onChange={(event) => { updateQueryParam('sort', event.target.value) }} value={sort} className='border-1 rounded-full px-3 py-2 border-gray-400'>
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
                        <CardPost
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
                        <button
                            onClick={() => goToPage(1)}
                            disabled={Number(page) === 1}
                            className={`${Number(page) === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                            >
                            <DoubleLeftArrow />
                        </button>

                        {/* Previous */}
                        <button
                            onClick={() => goToPage(Number(page) - 1)}
                            disabled={Number(page) === 1}
                            className={`${Number(page) === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                            >
                            <LeftArrow />
                        </button>


                        {/* Page Numbers */}
                       {pageNumberList.map((num) => (
                        <button
                            key={num}
                            onClick={() => goToPage(num)}
                            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer
                            ${num === Number(page) ? 'bg-[#f7611c] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            {num}
                        </button>
                        ))}

                        {/* Next */}
                       <button
                            onClick={() => goToPage(Number(page) + 1)}
                            disabled={Number(page) === totalPages}
                            className={`${Number(page) === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                            >
                            <RightArrow />
                        </button>

                        {/* Last Page */}
                       <button
                            onClick={() => goToPage(totalPages)}
                            disabled={Number(page) === totalPages}
                            className={`${Number(page) === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-black cursor-pointer'}`}
                            >
                            <DoubleRightArrow />
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}