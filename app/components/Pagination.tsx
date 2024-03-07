import {IconArrowLeft , IconArrowRight} from '@supabase/ui'
import Link from "next/link";

interface Props {
    currentPage: number;
    totalPages: number;
    prevUrl: string;
    nextUrl: string;
}

function Pagination({
                        currentPage,
                        totalPages,
                        prevUrl,
                        nextUrl,
                    }: Props) {


    return (
        <>
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Link href={prevUrl} passHref>
                        <a className="p" style={currentPage<=1?{ pointerEvents: 'none', cursor: 'default' ,color: '#cccccc'}:{}}>
                            <div className="flex justify">
                                <IconArrowLeft className="p text-scale-900" strokeWidth={2}/>
                                <p className="ml-2">Prev</p>
                            </div>
                        </a>
                    </Link>

                    <p className="p ml-4 mr-4">{currentPage} / {totalPages}</p>

                    <Link href={nextUrl} passHref>
                        <a className="p" style={currentPage >= totalPages?{ pointerEvents: 'none', cursor: 'default',color: '#cccccc' }:{}}>
                            <div className="flex justify">
                                <p className="mr-2">Next</p>
                                <IconArrowRight className="p text-scale-900" strokeWidth={2}/>
                            </div>
                        </a>
                    </Link>
                </div>
            )}
        </>
    )
}

export default Pagination
