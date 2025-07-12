import Image from "next/image";

export default function CardPost({ image, date, title }){
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <Image src={image} width={300} height={300} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <p className="text-sm text-gray-400 font-semibold">{date}</p>
                <h3 className="text-lg line-clamp-3 font-semibold text-gray-800 capitalize">{title}</h3>
            </div>
        </div>
    );
}